# tester-role-track-spec.md

# Tester Role-Track Spec

## Purpose

This document defines the **Tester track**.

Its purpose is to answer:

- what this course should teach;
- what lessons it should contain;
- what practical tasks are needed;
- which task types are already supported by the current builder;
- what should be reviewed after the course is created and tested.

This document should be used **before** creating the Tester course in the practicum builder.

---

## Course Identity

### Recommended course title

**AI for Testers: Practical QA Workflows**

Alternative titles:
- AI for Testers: First Practical Workflows
- Practical AI for Junior Testers
- AI Assistance in QA Work

---

## Course Goal

After finishing this course, the learner should be able to:

- use AI to clarify feature behavior before writing tests;
- use AI to generate and refine test ideas, negative scenarios, and edge cases;
- use AI to structure bug reports and test documentation;
- critically evaluate AI-generated QA suggestions instead of trusting them blindly;
- use AI to challenge incomplete coverage and surface missing checks;
- use AI safely without replacing real product understanding or verification.

This course is **not** meant to teach QA from zero.
It is meant to teach **how a tester can apply AI in realistic work-like scenarios**.

---

## Course Position In Product Logic

This course belongs to:

- `course_category = role_track`

It should become available **after** the common base is completed.

It is intended for:

- junior testers;
- interns with basic QA knowledge;
- learners who already passed the common base and understand:
  - what AI is,
  - how to write prompts,
  - how to iterate,
  - why verification matters.

---

## Core Course Principle

This role track should not become:
- a full QA curriculum;
- a testing-theory-from-zero course;
- a bug-report-only course;
- a prompt-writing-only course.

Instead, it should teach:
- realistic AI-assisted QA workflows;
- stronger test-thinking;
- useful framing of QA requests;
- critical thinking about generated suggestions.

---

# Recommended Course Structure

## Suggested lesson count

**6–7 lessons** is the strongest first version.

Recommended MVP:
- **6 lessons** if you want a tighter course
- **7 lessons** if you want explicit safe-use / false-confidence coverage as a dedicated ending lesson

Recommended version below:
- **7 lessons**

---

# Lesson 1 — Turn vague feature understanding into a clear testing task

## Goal

Teach the learner to use AI to clarify what exactly needs to be tested before jumping into cases.

## What the learner should understand

- unclear feature understanding leads to weak tests;
- AI can help turn feature descriptions into clearer testable questions;
- testers still need product understanding and verification.

## Practical task type

**Improve a vague request**

## Suggested task

You are given a vague QA request:

> “Test this feature.”

Rewrite it into a stronger request for AI so that it becomes clear:
- what feature or behavior is being tested,
- what user action matters,
- what expected behavior is,
- what should be clarified before writing cases.

## Success criteria

- clarifies feature scope;
- clarifies expected behavior;
- clarifies what still needs explanation;
- avoids generic “test everything”.

## Common mistakes

- stays vague;
- no expected behavior;
- no scope;
- no clarification questions.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 2 — Generate positive, negative, and edge-case scenarios

## Goal

Teach the learner to use AI to broaden test coverage thinking.

## What the learner should understand

- useful testing includes positive, negative, and edge cases;
- AI can help surface scenarios quickly;
- generated cases still need checking against product requirements.

## Practical task type

**Write a structured request**

## Suggested task

Write a request to AI that will help generate:
- 5 positive test scenarios,
- 5 negative test scenarios,
- 3 edge cases
for a specific feature.

The request should include:
1. what feature is being tested;
2. what expected behavior matters;
3. what format the scenarios should be returned in.

## Success criteria

- clear feature context;
- asks for multiple scenario classes;
- expected behavior is included;
- useful answer format is requested.

## Common mistakes

- no feature context;
- no separation by scenario type;
- too generic;
- no expected behavior.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 3 — Critically evaluate AI-generated test suggestions

## Goal

Teach the learner to judge whether AI-generated test ideas are actually useful or incomplete.

## What the learner should understand

- AI-generated scenarios may miss important product rules;
- some suggestions can be repetitive, unrealistic, or shallow;
- testers should filter and validate, not just accept lists blindly.

## Practical task type

**Analyze and critique AI output**

## Suggested task

You are given a list of AI-generated test suggestions.

Describe:
1. which suggestions look useful;
2. which ones look weak, repetitive, or incomplete;
3. what important checks may still be missing;
4. why you should not accept the list blindly.

## Success criteria

- identifies useful vs weak cases;
- names missing coverage areas;
- explains why blind trust is risky;
- stays tied to real testing needs.

## Common mistakes

- only says “good” or “bad” without specifics;
- no missing-coverage logic;
- no QA reasoning;
- too abstract.

## Builder fit

**Supported by current builder.**

---

# Lesson 4 — Use AI to structure a stronger bug report

## Goal

Teach the learner to use AI to improve bug report structure without inventing details.

## What the learner should understand

- bug reports need reproducible structure;
- AI can help rewrite and clarify;
- missing evidence or invented details make reports worse.

## Practical task type

**Improve a weak request or structure a report**

## Suggested task

You are given a weak bug report:

> “The page is broken and nothing works.”

Rewrite it so that AI would understand:
- what the issue is,
- what steps to reproduce exist,
- what expected behavior was,
- what actual behavior happened,
- what useful report structure should be used.

## Success criteria

- includes reproducible context;
- includes expected vs actual behavior;
- improves clarity;
- does not invent unsupported facts.

## Common mistakes

- still vague;
- no reproduction logic;
- no expected vs actual split;
- adds invented details.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 5 — Use AI to check missing coverage and hidden assumptions

## Goal

Teach the learner to use AI to challenge whether the current test thinking is too narrow.

## What the learner should understand

- testers can miss assumptions;
- AI can help surface missing areas, conditions, and user states;
- this is a support tool, not a substitute for real product understanding.

## Practical task type

**Describe a structured workflow**

## Suggested task

Describe how you would use AI to review an existing set of test ideas and check whether something important is missing.

Your answer should include:
1. what context you would give AI;
2. how you would ask it to challenge your current coverage;
3. how you would decide which suggestions are actually worth keeping;
4. how you would verify them against real requirements.

## Success criteria

- includes structured review stages;
- includes missing-coverage logic;
- includes selection/filtering;
- includes requirement validation.

## Common mistakes

- too abstract;
- no filtering logic;
- no requirement validation;
- uses AI only as idea generator, not as challenge tool.

## Builder fit

**Supported by current builder.**

---

# Lesson 6 — Use AI to draft test documentation and checklists

## Goal

Teach the learner to use AI to support checklists, test documentation, and structured QA notes.

## What the learner should understand

- AI can help turn raw ideas into clearer QA documentation;
- structure and audience matter;
- checklists still need to reflect real product behavior.

## Practical task type

**Write a structured request**

## Suggested task

Write a request to AI that will help draft a test checklist or QA note for a feature.

The request should specify:
1. what feature is involved;
2. who the checklist is for;
3. what sections or structure are needed;
4. that the AI should avoid inventing behavior not grounded in the feature description.

## Success criteria

- feature context is clear;
- audience is clear;
- structure is requested;
- instruction against invented behavior is included.

## Common mistakes

- no audience;
- generic checklist request;
- no structure;
- no protection against made-up details.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 7 — Safe and responsible AI use in testing

## Goal

Teach the learner to think about false confidence, shallow coverage, and safe use of AI in QA work.

## What the learner should understand

- AI can create the illusion of full coverage;
- generated tests still need product validation;
- AI should not replace actual understanding of feature behavior.

## Practical task type

**Analyze a scenario**

## Suggested task

Describe:
1. one case where it is useful for a tester to use AI;
2. one case where using AI directly could create a risk for coverage quality, misunderstanding of behavior, or false confidence.

For the risky case, explain:
- what the risk is;
- what should be checked manually;
- what should not be done directly.

## Success criteria

- gives realistic tester situations;
- names a concrete risk;
- explains safe follow-up behavior;
- avoids blind trust language.

## Common mistakes

- too abstract;
- no concrete risk;
- no safe action;
- ignores feature validation.

## Builder fit

**Supported by current builder.**

---

# Summary of Task Types in This Course

Recommended distribution:

## Type 1 — Improve a vague or weak request
- Lesson 1
- Lesson 4

## Type 2 — Write a structured request
- Lesson 2
- Lesson 6

## Type 3 — Analyze / critique AI output
- Lesson 3

## Type 4 — Describe a structured workflow
- Lesson 5

## Type 5 — Analyze safety / risk
- Lesson 7

---

# Builder Compatibility Review

## What the current builder already supports well

- structured lesson flow with theory / info / quiz / task;
- open-text AI-checked tasks;
- success criteria entry;
- hints and examples;
- ordered lesson creation;
- enough structure for the first Tester track.

## What may become a future builder improvement area

Not required before writing the course, but useful to observe:

- easier insertion of multiple example test cases;
- stronger support for critique tasks tied to example outputs;
- lightweight role-specific lesson templates.

These should be decided **after** the Tester course is drafted, not before.

---

# Recommended Production Order

## Step 1
Create the course shell with 6–7 lesson stubs.

## Step 2
Write Lessons 1 and 2 fully.
These define feature framing and scenario generation.

## Step 3
Write Lessons 3 and 4.
These expand into critique and bug-report structuring.

## Step 4
Write Lessons 5 and 6.
These add coverage review and documentation support.

## Step 5
Add Lesson 7 if you want explicit safe-use coverage at the end.

---

# What To Do After The Tester Course Is Written

After the Tester role track is fully drafted or entered into the builder:

## 1. Run a post-course content production audit

Answer:
- which lessons were easy to create?
- which lesson types created friction?
- which task formats felt unnatural in the current builder?
- what repeated manual work appeared?
- what could be improved without changing the whole system?

## 2. Compare the Tester postmortem with earlier postmortems

Ask:
- did the same friction appear again?
- are the same task patterns awkward?
- does the builder distort this course in the same places?

## 3. Decide whether builder changes are actually needed

### Outcome A — Builder is enough
If the course was created with only minor inconvenience:
- move on;
- keep notes for later improvements.

### Outcome B — Small builder improvements are justified
If repeated friction clearly appears again:
- make a small, evidence-based builder update;
- keep changes backward-compatible.

### Outcome C — A genuinely missing task pattern exists
If an important pattern feels distorted:
- document exactly what the missing pattern is;
- explain why current model is not enough;
- then design the smallest extension.

## 4. Only then plan the next builder update

The builder should evolve like this:

- content first,
- pain observed,
- repeated pattern confirmed,
- minimal improvement,
- test with next course.

---

# Recommended Immediate Next Task

Create:

**`tester-course-postmortem.md`**

It should contain:
- what worked well in the builder;
- what was awkward;
- which task patterns felt strong;
- which task patterns felt forced;
- what minimal builder improvements would help next;
- how much of that overlaps with earlier postmortems.

---

# Final Rule

Do not let the current builder define what the Tester course should be.

First define the strongest course.
Then test whether the builder supports it well enough.
Then improve the builder only where the course proved it necessary.
