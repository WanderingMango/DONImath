DONImath.org — Project README
Department of Nominal Independence | E Pluribus Burocratum
===========================================================

WHAT THIS IS
------------
A single-file political satire web calculator that shows the real cost of
complying with the SAVE Act's name-matching requirement for voter registration.
The SAVE Act requires women (and others) whose IDs don't match their citizenship
documents to gather a chain of certified documents to register to vote.

The calculator walks users through their specific situation and shows three
paths (A/B/C) with real cost estimates by state.


FILES IN THIS PROJECT
---------------------
index.html          — The entire site. One file. Deploy this.
seal.png            — Department of Nominal Independence official seal
eagle1.png          — "I did that!" eagle (formerly ididthat.png)
eagle2.png          — "Tired of winning yet?" eagle (formerly tiredofwinning.png)
eagle3.png          — "Unofficial poll tax. You're welcome." eagle (formerly polltax.png)
eagle4.png          — "gyna" eagle (incoming)
eagle5-50.png       — Add future eagles here, numbered sequentially

README.txt          — This file


EAGLE IMAGE SYSTEM
------------------
Eagles are randomized on every card generated. The system auto-discovers
eagle1.png through eagle50.png at page load. To add a new eagle:

  1. Create your image (square-ish, transparent background works best)
  2. Name it eagle5.png (or next available number)
  3. Drop it in the same folder as index.html
  4. Done. No code changes needed.

To remove an eagle: just delete the file.
Gaps in numbering are fine — eagle1, eagle2, eagle5 works perfectly.


WIZARD PATHS
------------
The calculator handles every citizenship path:

DEAD ENDS (show Official Notice card, no cost estimate):
  - Not a U.S. citizen
  - Born in American Samoa, not naturalized
  - Naturalized, lost nat cert, no passport (must file N-565, $555)

CLEARANCE GRANTED (Voting Clearance Certificate):
  - Current matching passport (any citizenship type)
  - Names match exactly on BC/nat cert + DL, has certified BC

FULL CALCULATOR (3-path cost estimate):
  - Born US/territory/abroad/adopted — no matching passport
  - Puerto Rico — no passport, then asks about BC date (pre/post 2010)
  - Naturalized — no passport, has nat cert
  - Any path where names don't match

PASSPORT-FIRST LOGIC:
  All paths now ask about passport before any other questions.
  If passport matches → immediate clearance, no further questions.
  If not → continues to state selection and document questions.


THREE PATHS EXPLAINED
---------------------
PATH A: Gather Documents
  Collect your full document chain (birth cert, marriage certs, divorce
  decrees, court orders) and present them every time you register to vote.
  Recurring cost. Every time you move.

PATH B: Get a Passport
  Apply for a new or renewed U.S. passport. One-time cost, but requires
  the same document chain as Path A to obtain.

PATH C: Change Name Back / Correct Your ID / Get Your Document
  Court petition to legally revert to birth name (or for special cases,
  just a DMV correction or document order). Higher upfront cost but
  requires only 2 documents forever after.


STATE FEES
----------
Filing fees, BC costs, DMV fees, and decree copy costs are stored in the
STATE_FEES object in index.html. All 50 states are included plus DEFAULT.
Fees are estimates and vary by county within states.


SHARING SYSTEM
--------------
Three share options on results:

1. CREATE CERTIFICATE
   Generates a canvas image card with seal, share text, random eagle.
   Opens in new tab with save/share instructions + copies to clipboard.

2. SHARABLE TABLE
   Captures the full 3-path cost table as an image via html2canvas.
   Opens in new tab with seal above table + save instructions.

3. SOCIAL BUTTONS
   X, Bluesky, Facebook, Instagram, Threads.
   Each copies share text to clipboard and opens the platform.

DEAD END / POSITIVE STOP CARDS also generate shareable certificates
with appropriate copy and the random eagle treatment.


COPY / VOICE NOTES
------------------
The site has a consistent satirical voice:
- Deadpan bureaucratic authority
- Never mean, always dry
- Points at Congress, not at the user
- "E Pluribus Burocratum" is the throughline

Section headers:
  Congratulations. You Have Homework.
  Their Math. Your Problem.
  Verified Reviews
  The Unintended Consequence
  Find Your Local Bureaucracy

Wizard comedy lines to preserve:
  "How many times have you been married? (Each one is a document.)"
  "The hospital keepsake copy with your footprints on it does not count."
  "No rush. I have time to be angry about this."
  "There is no shortcut. The eagle is aware."
  "When in doubt, select No. The government will."
  "Apparently that's a federal problem now."
  "Congress accidentally made the cheapest option even cheaper for you."


LEGAL / DISCLAIMER NOTES
-------------------------
- All costs are estimates. Fees vary by county.
- "DONImath.org does not constitute legal advice. Neither does Congress, apparently."
- This is political satire. The "Department of Nominal Independence" is not real.
- "E Pluribus Burocratum" is a joke. In case that needed saying.
- The Samoa dead end card is intentionally empathetic, not snarky.
  ("This is a Congress problem, not a you problem.")


TECHNICAL NOTES
---------------
- Single HTML file. No frameworks, no build step, no dependencies except:
    html2canvas (CDN) — for table screenshot capture
    Google Fonts (CDN) — typography
- All wizard state lives in wizardState object
- calculateAll() is the main cost calculation function
  CRITICAL: Variable declaration order matters. hasBC must be declared
  before isDocOnlyFix. isNat must be declared before sublabel updates.
  const does not hoist — declare before use.
- Canvas drawing for cards: generateImageCard() and generateDeadEndCard()
- Eagle pool loads at page start via loadEaglePool(), probes eagle1-50.png
- wizardReset() must clear ALL state vars when adding new ones
- No em dashes anywhere in the file (breaks nothing, just house style)


DEPLOYMENT
----------
Upload to your web host:
  index.html
  seal.png
  eagle1.png through eagleN.png

That's it. No server config needed. No database. No backend.
The whole thing is one HTML file plus images.


TESTING CHECKLIST (run after any significant changes)
------------------------------------------------------
Key paths to verify:
  [ ] Born-US, passport matches -> Clearance card (no state question)
  [ ] Born-US, no passport, married -> full calculator
  [ ] PR, passport matches -> Clearance card (no BC question)
  [ ] PR, no passport, BC before 2010 -> $40 added to all paths
  [ ] Naturalized, passport matches -> Clearance card
  [ ] Naturalized, no passport, has cert -> full calculator
  [ ] Naturalized, no passport, no cert -> N-565 dead end
  [ ] Not a citizen -> dead end card
  [ ] American Samoa, no nat cert -> dead end card (empathetic)
  [ ] Names match, has BC -> Clearance card
  [ ] Names match, no BC -> Path C = "Get Your Document" (no court petition)
  [ ] Nickname only -> Path C = "Correct Your ID" (no court petition)
  [ ] Benefits = Yes -> court filing fee waived in Path C
  [ ] Back button hidden on Step 1
  [ ] Start over resets all state

Known good persona count: 24 personas tested, 0 bugs (as of last QA pass)


CREATED WITH
------------
Built in collaboration with Claude (Anthropic) over an extended session.
Political satire. All math approximate. Congress did not check ours either.

===========================================================
