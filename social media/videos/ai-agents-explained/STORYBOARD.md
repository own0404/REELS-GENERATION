---
format: 1920x1080
message: "AI agents are autonomous programs that sense, decide, and act — your digital workforce."
arc: concept-explainer
audience: general audience curious about AI
music: calm electronic underscore
---

## Video direction

**Palette system:** frame.md blue-professional — cream (`#fdfae7`) ground, cobalt (`#1e2bfa`) sole accent, near-black (`#111`) headlines, muted (`#6b6b6b`) body. Tinted cards at 4% cobalt fill / 20% border / 14px radius, no shadows. Space Grotesk display + Inter body.

**Motion grammar:** smooth long-tail (`power3` default). Sequential reveal timed to VO — at t=0 only what the VO says, each piece reveals on its spoken cue, never front-loaded. Holds: frames 2 and 7 are still breathers (held read > bad motion). No lazy breathing, no slow pan/push. Subtle jitter (`sine-wave-loop` low amplitude) as only aliveness during holds.

**Negative:** no bouncy/overshoot, no cobalt headlines, no pure white/black, no shadows on cards, no bokeh or "AI" purple-blue gradients, no slideshow front-load, no screensaver floating elements.

## Frame 1 — Hook

- scene: Bold question appears on cream ground; single cobalt accent line draws in
- voiceover: "What if your software could do things — not just answer, but act?"
- duration: 4.416s
- transition_in: cut
- status: built
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Rhetorical question
- beat: curiosity
- blueprint: kinetic-type-beats (Adapt)
- focal: the rhetorical question as kinetic type
- roles: question text = foreground subject · accent line = supporting · cream ground = background

narrativeRole: Opens a cognitive gap — software that acts vs just answers.
keyMessage: Software can be proactive, not just reactive.

Adapt: keep the single-line kinetic beat; replace product-intro spring-pop with a cobalt accent line drawing across as the question settles.
Scene 1 (0.0–2.2s): cream field; "What if your software" types in as per-word reveal (Inter body, muted), centered upper-third, slow push-in on root (`multi-phase-camera`).
Scene 2 (2.2–4.4s): "could DO things —" slams in bold, cobalt accent highlight on "DO" (`kinetic-beat-slam`), then "not just answer, but act?" appears beneath in muted Inter. Cobalt accent line (60x4px, `accent-line`) draws left-to-right under the question. Hold still — subtle jitter only.

## Frame 2 — What is an AI Agent

- scene: Three-word definition builds up word by word on a tinted card: "Sense. Decide. Act."
- voiceover: "AI agents are autonomous programs that sense their world, make decisions, and take action."
- duration: 5.688s
- transition_in: crossfade
- status: built
- src: compositions/frames/02-what-is-ai-agent.html
- type: product_intro
- persuasion: Progressive disclosure
- beat: clarity
- blueprint: kinetic-type-beats (Adapt)
- focal: the three-word definition
- roles: "Sense. Decide. Act." = foreground subject · definition line = supporting · tinted card = midground

narrativeRole: Names and defines the core concept in three digestible pieces.
keyMessage: AI agents operate on a simple three-part cycle: sense, decide, act.

Adapt: keep single-line kinetic beat structure; replace the multi-beat build with a three-word staggered reveal on the card, then a definition line beneath.
Scene 1 (0.0–2.0s): tinted card (`card-tinted`) seats center-left, ~50% width. "AI agents are autonomous programs" appears as lead text (Inter, muted, 1.5cqw) on the card.
Scene 2 (2.0–4.5s): three words — "Sense." "Decide." "Act." — reveal one per beat via per-word staggered reveal (Space Grotesk, cobalt, 3.0cqw), each landing as the VO says it. Cobalt `accent-line` draws between each.
Scene 3 (4.5–5.7s): "that sense their world, make decisions, and take action" appears as body (Inter, muted) beneath the trio. Hold still — subtle jitter.

## Frame 3 — The Loop

- scene: A circular diagram of the perceive → think → act loop animates step by step
- voiceover: "They follow a simple loop: perceive the situation, think through options, then act. Then they repeat."
- duration: 7.32s
- transition_in: crossfade
- status: built
- src: compositions/frames/03-the-loop.html
- type: feature_showcase
- persuasion: Progressive disclosure + causal chain
- beat: comprehension
- blueprint: compose
- focal: the three-node circular diagram
- roles: Perceive node = focal entrance · Think node = second reveal · Act node = third reveal · arrow connectors = supporting · loop ring = background layer

narrativeRole: Reveals the mechanism layer by layer — the loop that powers all AI agents.
keyMessage: The perceive → think → act loop runs continuously.

Compose: the three nodes of the cycle reveal in sequence, each with a curved arrow connecting to the next; a faint outer ring completes at the end to show the cycle.
Scene 1 (0.0–1.5s): cream ground, a faint hairline ring (10% cobalt) sits behind the center as scaffold.
Scene 2 (1.5–3.5s): "Perceive" node appears upper-left on a small `card-tinted` — a cobalt icon (eye/radar) + label. Curved arrow (1px cobalt hairline) draws from it clockwise.
Scene 3 (3.5–5.5s): "Think" node appears top-right — brain/gear icon + label. Arrow draws from Perceive to Think.
Scene 4 (5.5–7.3s): "Act" node appears bottom-center — action/play icon + label. Arrow draws from Think to Act. Final arrow from Act back to Perceive completes the ring. Hold still — subtle jitter on the arrows.

## Frame 4 — Key Capabilities

- scene: Three tinted cards in a row — Autonomy, Goal-driven, Adaptive — each with a short label
- voiceover: "Key traits: autonomy — they work without constant supervision. Goal-driven — they pursue specific objectives. Adaptive — they learn from experience."
- duration: 10.704s
- transition_in: crossfade
- status: built
- src: compositions/frames/04-capabilities.html
- type: feature_showcase
- persuasion: Rule of three + enumeration
- beat: confidence
- blueprint: grid-card-assemble (Adapt)
- focal: three capability cards in row
- roles: three cards = sequential reveals · eyebrow = chrome · progress bar = persistent support

narrativeRole: Builds understanding of what makes agents powerful beyond simple scripts.
keyMessage: Autonomy + goal-orientation + adaptability define AI agents.

Adapt: keep the staggered card cascade; reduce from N items grid to 3-card row; each card reveals as the VO names it.
Scene 1 (0.0–2.5s): slide-header eyebrow "KEY TRAITS" (Space Grotesk, cobalt, uppercase 0.08em) top-left; tag-pill "3 capabilities" top-right.
Scene 2 (2.5–5.5s): Card 1 "Autonomy" — `metric-card` seats left with cobalt stat-num "①" + label "Work without supervision" in Inter muted. Spring-pop entrance (`power3`), smooth.
Scene 3 (5.5–8.0s): Card 2 "Goal-driven" — second card seats center with "②" + "Pursue specific objectives". Same entrance.
Scene 4 (8.0–10.7s): Card 3 "Adaptive" — third card seats right with "③" + "Learn from experience". All three cards now visible, forming a balanced triptych. Hold still.

## Frame 5 — Real Examples

- scene: Three example cards with icons: support bot, code assistant, smart home controller
- voiceover: "Customer support bots that resolve tickets. Coding assistants that write and test software. Smart home controllers that manage your environment."
- duration: 10.296s
- transition_in: crossfade
- status: built
- src: compositions/frames/05-examples.html
- type: social_proof
- persuasion: Concretization + rule of three
- beat: recognition
- blueprint: grid-card-assemble (Adapt)
- focal: three example cards
- roles: three cards = sequential reveals · eyebrow = chrome

narrativeRole: Grounds the abstract concept in familiar, concrete applications.
keyMessage: AI agents already work in customer support, coding, and smart homes.

Adapt: same three-card cascade as frame 4 but with icon + description layout instead of trait + number.
Scene 1 (0.0–2.5s): eyebrow "IN ACTION" top-left; tag-pill "real examples" top-right.
Scene 2 (2.5–5.5s): Card 1 — "Support Bots" title (Space Grotesk, near-black, h3) + icon (chat bubble, cobalt outline) + "Resolve tickets end-to-end" body (Inter muted). Spring-pop.
Scene 3 (5.5–8.0s): Card 2 — "Code Assistants" title + icon (brackets, cobalt) + "Write and test software". Spring-pop.
Scene 4 (8.0–10.3s): Card 3 — "Smart Home" title + icon (house, cobalt) + "Manage your environment". All three cards in triptych. Hold still.

## Frame 6 — Why Now

- scene: Large models (visualized as nodes) connect to tool icons (API, web, code) showing the supercharged effect
- voiceover: "Large language models supercharged agents. Now they understand context, reason through problems, and use tools."
- duration: 8.232s
- transition_in: crossfade
- status: built
- src: compositions/frames/06-why-now.html
- type: benefit_highlight
- persuasion: Causal chain
- beat: foresight
- blueprint: constellation-hub (Adapt)
- focal: the LLM hub with tool satellites
- roles: LLM node = center hub · tool icons (API/web/code) = orbiting satellites · connection lines = supporting

narrativeRole: Explains the recent inflection point that made agents suddenly useful.
keyMessage: LLMs gave agents understanding, reasoning, and tool use.

Adapt: keep the hub + satellite ring structure; replace product logo with "LLM" node and partner logos with tool icons (API/web/code).
Scene 1 (0.0–1.5s): cream ground, "LLM" hub node seats center (pill-shaped cobalt `cta-button` or tinted circle).
Scene 2 (1.5–4.0s): "Understand context" — first satellite (API icon) swings in on an orbital arc from right, connects to hub with hairline. Label appears beneath.
Scene 3 (4.0–6.0s): "Reason through problems" — second satellite (brain/gear icon) enters from left, connects.
Scene 4 (6.0–8.2s): "Use tools" — third satellite (wrench/code icon) enters from top, connects. All three satellites now visible around the hub. Final hold — subtle cobalt ring pulse via `ambient-glow-bloom` on the hub.

## Frame 7 — Takeaway

- scene: Bold closing statement centered on cream ground with solid cobalt CTA pill
- voiceover: "AI agents are your digital workforce. They don't just process information — they act on it."
- duration: 6.792s
- transition_in: crossfade
- status: built
- src: compositions/frames/07-takeaway.html
- type: branding
- persuasion: Distillation
- beat: satisfaction
- blueprint: titlecard-reveal (Reproduce)
- focal: the closing statement
- roles: closing text = foreground subject · CTA pill = supporting action

narrativeRole: Lands the thesis — agents are defined by action, not just processing.
keyMessage: AI agents act on information, they don't just process it.

Reproduce: calm single-line title card with one restrained move, then held read.
Scene 1 (0.0–2.5s): cream ground. "AI agents are your" appears (Space Grotesk h2, near-black, centered) via slide-up crossfade.
Scene 2 (2.5–5.0s): "digital workforce." drops in bold (Space Grotesk h1, cobalt, 4.2cqw) with a single emphasis beat — spring-pop entrance, smooth `power3` settle.
Scene 3 (5.0–6.8s): subtitle "They don't just process information — they act on it." fades in beneath (Inter lead, muted). The cobalt `cta-button` pill "Learn more" appears below. Hold still — read and landed.
