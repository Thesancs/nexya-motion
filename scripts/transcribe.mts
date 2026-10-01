// Transcreve a narração com tempos por palavra, para alinhar as cenas.
// Uso: node scripts/transcribe.mts  →  out/voice-captions.json
import { registerMediabunnyServer } from "@mediabunny/server";
import {
  WHISPER_WEBGPU_SAMPLE_RATE,
  canUseWhisperWebGpu,
  downloadWhisperModel,
  loadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";
import { ALL_FORMATS, Conversion, FilePathSource, Input, NullTarget, Output, WavOutputFormat } from "mediabunny";
import { mkdir, writeFile } from "node:fs/promises";

registerMediabunnyServer();

const support = await canUseWhisperWebGpu();
if (!support.supported) throw new Error(support.detailedReason);

const chunks: { startFrame: number; waveform: Float32Array }[] = [];
const input = new Input({ formats: ALL_FORMATS, source: new FilePathSource("public/audio/voice.wav") });
const audioTrack = await input.getPrimaryAudioTrack();
if (audioTrack === null) throw new Error("Sem faixa de áudio.");

const conversion = await Conversion.init({
  input,
  output: new Output({ format: new WavOutputFormat(), target: new NullTarget() }),
  video: { discard: true },
  audio: (track) =>
    track.id !== audioTrack.id
      ? { discard: true }
      : {
          codec: "pcm-f32",
          forceTranscode: true,
          numberOfChannels: 1,
          sampleFormat: "f32",
          sampleRate: WHISPER_WEBGPU_SAMPLE_RATE,
          process: (sample) => {
            const waveform = new Float32Array(
              sample.allocationSize({ format: "f32", planeIndex: 0 }) / Float32Array.BYTES_PER_ELEMENT,
            );
            sample.copyTo(waveform, { format: "f32", planeIndex: 0 });
            chunks.push({ startFrame: Math.round(sample.timestamp * WHISPER_WEBGPU_SAMPLE_RATE), waveform });
            return sample;
          },
        },
});
if (!conversion.isValid) throw new Error("Não foi possível decodificar o áudio.");
await conversion.execute();

const length = chunks.reduce((max, c) => Math.max(max, c.startFrame + c.waveform.length), 0);
const channelWaveform = new Float32Array(length);
for (const c of chunks) channelWaveform.set(c.waveform.subarray(0, length - c.startFrame), Math.max(0, c.startFrame));

const model = "small";
await downloadWhisperModel({ model });
await loadWhisperModel({ model });
const transcription = await transcribe({ channelWaveform, model, language: (process.argv[2] ?? "pt") as "pt" });
const { captions } = toCaptions({ whisperWebGpuOutput: transcription });

await mkdir("out", { recursive: true });
await writeFile("out/voice-captions.json", JSON.stringify(captions, null, 2));
for (const c of captions) console.log(`${(c.startMs / 1000).toFixed(2)}\t${c.text}`);
