# Formula Framework — 10 channel-agnostic levers

Generalized from the Ecomonos teardown. These are the levers ANY explainer channel
can be measured on or built around. A channel does not need all 10, but the strongest
explainer channels score high on most. Each lever has: what it is, why it works, and
how to detect it in a script/page.

---

### L1 — Private lexicon (world coherence)
A fixed dictionary mapping real concepts to branded terms, reused across every video.
**Why:** it is the moat; it converts viewers into insiders who "speak the language."
**Detect:** are there ≥10 recurring branded terms, used identically across videos?

### L2 — Signature voice
A grammatical/tonal tic recognizable in the first sentence (Ecomonos = article-dropping
pidgin). **Why:** instant brand recognition, breaks the category's default register.
**Detect:** could you identify the channel from one paragraph with the name stripped?

### L3 — Cold-open hook
Opens in-scene with a character/event + a counterintuitive claim. No "hi, today…".
**Why:** the first 5s decide retention; curiosity gap beats throat-clearing.
**Detect:** does sentence 1 contain a concrete actor/event AND a tension/claim?

### L4 — Counterintuitive thesis
Title + open promise a claim that contradicts the viewer's prior ("price will NOT
fall", "the system condemns you"). **Why:** drives CTR and forward-watching.
**Detect:** is the title a contrarian assertion, not a neutral topic label?

### L5 — Simile density
Concepts explained via rapid, absurd, relatable comparisons. **Why:** comprehension +
humor + shareability; abstraction becomes felt. **Detect:** count similes/100 words;
Ecomonos runs high (roughly one every 2–4 beats).

### L6 — The "this affects YOU" pivot
Abstract content is pulled back to the viewer's personal stakes (wallet, future).
**Why:** relevance = retention; converts spectators into stakeholders.
**Detect:** is there at least one explicit "even if you don't X, you'll pay Y" move?

### L7 — Chaptered escalation (long-form)
Long videos use named chapters building to a twist / hidden actor. **Why:** re-promises
value mid-video, flattens the retention drop-off. **Detect:** explicit chapter markers
or clear act breaks with rising stakes.

### L8 — Loop engineering
Chained CTA to a specific next video + in-universe like-bait. **Why:** manufactures
multi-video sessions, the single biggest growth lever YouTube rewards.
**Detect:** does the outro name a specific next video (not "subscribe")?

### L9 — Integrated monetization
Sponsor woven into the narrative/universe, not a hard cut. **Why:** survives ad-blockers
and demonetization; preserves immersion. **Detect:** is the sponsor a character/scene?

### L10 — Credibility landing
Ends with nuance/balance to pre-empt "this is misinformation." **Why:** widens the
shareable audience, blunts critics, signals rigor. **Detect:** does the close
acknowledge the other side or limits of the claim?

---

## Production constraint (cross-cutting)

**One idea per sentence.** This is both a style rule (pacing) and a hard requirement of
the Remotion pipeline in this repo: 1 sentence = 1 image = 1 visual beat. Any script
produced for this channel family must keep sentences short and atomic so Whisper
segmentation and the `FRAMES` lookup stay in sync. See `../../VIDEO_EXPLAINER_WORKFLOW.md`.

## Scoring

Each lever scores 0–3 (0 absent, 1 weak, 2 solid, 3 reference-grade). Max 30.
The `channel-audit` skill uses these scores + the rubric in `audit-rubric.md` to
produce P0/P1/P2 findings. Ecomonos is the 3-anchor on every lever.
