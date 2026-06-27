# Automation Runbook — @ecobananas (bilingual ES/EN)

How a `script-forge` output becomes a published bilingual MP4 using this repo's existing
pipeline. This is the **bridge doc** between the analytics vertical and the generation
pipeline. For the deep per-step detail see [`../VIDEO_EXPLAINER_WORKFLOW.md`](../VIDEO_EXPLAINER_WORKFLOW.md).

```
script-forge → ElevenLabs V3 (ES voice) → [HITL 1] → Whisper (ES timestamps)
            → Higgsfield (1 img/sentence) → [HITL 2] → Remotion (ES comp) → [HITL 3] → MP4 (ES)
            → ElevenLabs dub → EN voice → Whisper (EN timestamps, REUSE images) → Remotion (EN comp) → MP4 (EN)
            → YouTube: 1 video + 2 audio tracks + localized metadata
```

Working example: video slug **`longevidad-platano-pintado`** (the "painted banana" script).

---

## ⚠️ STEP 0 — Reconcile Root.tsx FIRST (blocking gotcha)

`remotion/src/Root.tsx` imports 7 components that **do not exist on disk**
(`TikTokEditor`, `VoldemortVideo`, `UntangleVideo`, `AuthoritativeBrandVideo`,
`PilotoUGCVideo`, `CreavsBlueprintRender`, `SubtitleMatiRender`) plus `./index.css`.
**The studio/render will not compile until you comment out those imports + their
`<Composition>` blocks.** Only `InteresCompuesto` actually exists. Do this once before
anything else, or every later step fails with a compile error.

---

## STEP 1 — Script (done)

`script-forge` already produced the ES script (atomic sentences, emotion tags). Keep it
as `scripts-out/longevidad-platano-pintado.es.txt`. Rule that matters downstream:
**one short sentence per line = one image**. Don't merge lines.

## STEP 2 — Voice (ElevenLabs V3, ES)
1. elevenlabs.io → model **V3** (honors `[tono cercano]` tags).
2. Paste the ES script. Generate, download MP3.
3. Save as `remotion/public/longevidad-platano-pintado.mp3`.
   → **[HITL 1]** listen end-to-end; fix any line that sounds wrong and regenerate.

## STEP 3 — Timestamps (Whisper, ES)
From repo root:
```bash
python scripts/whisper_timestamps.py remotion/public/longevidad-platano-pintado.mp3 --format remotion
```
This prints a ready-to-paste `FRAMES = [...]` block. **Use SEGMENT timestamps** (the
script already does — word-level gives false positives like "no" inside "años").

## STEP 4 — Images (Higgsfield, 1 per sentence)
Stickman + banana/simian style. Base prompt:
```
Simple stickman drawing on white paper, hand-drawn style, a cartoon monkey, <scene>, a banana
```
Name each file by timestamp `m_ss.jpg` (`0_00.jpg`, `0_04.jpg`, …). Put them in
`remotion/public/longevidad-platano-pintado/`.
- **~70 images × 2 credits = ~140 credits (~€5.60)** — the cost driver.
- → **[HITL 2]** verify EVERY image exists. **A single missing image desyncs every
  later frame by +1.** Count them before continuing.

## STEP 5 — Assemble (Remotion, ES composition)
1. Create `remotion/src/LongevidadPlatanoPintado.tsx` modeled on
   [`InteresCompuesto.tsx`](../remotion/src/InteresCompuesto.tsx): the `FRAMES` array
   (paste from Step 3) + the active-index lookup loop.
2. **Playback rate:** start at `PLAYBACK_RATE = 1.0` for the first video (simplest).
   If you later speed it up, the rate must be in **THREE places** or audio desyncs:
   `playbackRate` on `<Audio>`, `currentSec = (frame/fps) * RATE`, and
   `durationInFrames = Math.round(seconds * 30 / RATE)`.
3. Point `<Audio>` at `staticFile('longevidad-platano-pintado.mp3')` and `<Img>` at
   `staticFile('longevidad-platano-pintado/' + activeFrame.file)`.
4. Register in `Root.tsx`:
   ```tsx
   <Composition id="LongevidadPlatanoPintado" component={LongevidadPlatanoPintado}
     durationInFrames={Math.round(SECONDS * 30 / RATE)} fps={30} width={1920} height={1080} />
   ```
5. `cd remotion && npm install && npm run dev` → http://localhost:3000
   → **[HITL 3]** scrub the whole video; adjust `startSec` values if any frame drifts.

## STEP 6 — Render (ES)
```bash
cd remotion
npx remotion render LongevidadPlatanoPintado output/longevidad-platano-pintado.es.mp4
```
(`npm run render` is hardcoded to `InteresCompuesto` — render by id instead, or update
the script in `remotion/package.json`.) ~7–10 min for 2.5 min @ 1920×1080.

---

## STEP 7 — Bilingual EN track (the multi-language path)

**Key efficiency: the stickman images are language-agnostic — REUSE the exact same
image set for EN. You only redo audio + timestamps + one composition.** No extra
Higgsfield cost.

1. **EN voiceover:** either (a) translate/localize the script to EN keeping the lexicon
   (`painted banana`, `the browning banana`, `blue jungles` — see `channels/ecobananas.md`,
   never machine-translate the puns), generate a fresh EN MP3 in ElevenLabs; or (b) use
   ElevenLabs **Dubbing** / Higgsfield `dubbing` on the ES MP3. (a) gives better lexicon
   control. Save as `remotion/public/longevidad-platano-pintado.en.mp3`.
2. **EN timestamps:** EN audio has DIFFERENT segment times — you must re-run Whisper.
   ⚠️ `scripts/whisper_timestamps.py` hardcodes `language="es"`. For EN, either pass a
   language (add a `--language` arg — small one-line change) or temporarily edit the
   `language="es"` call to `"en"`.
3. **EN composition:** duplicate the ES `.tsx` as `...En.tsx` with the EN `FRAMES` array
   and EN audio file; register a second `<Composition id="LongevidadPlatanoPintadoEn">`.
4. **Render EN:** `npx remotion render LongevidadPlatanoPintadoEn output/longevidad-platano-pintado.en.mp4`.

## STEP 8 — Publish (1 channel, multi-audio)
- Upload ONE video to @ecobananas.
- Add the **EN audio as a second audio track** (YouTube Studio → Subtitles/Audio →
  multi-language audio), with ES as the original. (If you rendered two MP4s, the simplest
  v1 is to upload the ES MP4 and attach the EN audio track; the visuals are identical.)
- **Localize metadata** per language: ES + EN title, description, thumbnail text. Use the
  SEO templates and title pattern in `channels/ecobananas.md`. Never reuse a
  machine-translated title.

---

## Per-video checklist
- [ ] STEP 0: Root.tsx reconciled (dead imports commented out)
- [ ] Script saved, one sentence per line
- [ ] ES MP3 generated · **HITL 1** voice OK
- [ ] ES timestamps (segments) extracted
- [ ] ~70 images generated, named by timestamp · **HITL 2** all present
- [ ] ES composition built (playback rate in all needed places)
- [ ] **HITL 3** sync validated in studio
- [ ] ES MP4 rendered
- [ ] EN voice (lexicon-localized) + EN timestamps + EN composition
- [ ] EN MP4 / audio track rendered
- [ ] Uploaded: 1 video + 2 audio tracks + localized ES/EN metadata ✅

## Cost per bilingual video
~€6 (ES) + ~€0.40 EN voice (images reused) ≈ **~€6.40 for both languages**.
Monthly ceiling unchanged (~21 videos, Higgsfield-bound) since EN reuses images.

## Toward full automation (next iterations)
The HITL gates (voice, images, sync) are the only manual steps. Candidates to script
later: auto-generate Higgsfield prompts per sentence from the script; a generator that
writes the `.tsx` + `Root.tsx` entry from the Whisper JSON; a `--language` flag on the
Whisper script. Out of scope for v1 — get one bilingual video shipped first.
