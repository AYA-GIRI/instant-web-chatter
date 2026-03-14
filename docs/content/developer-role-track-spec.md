# developer-role-track-spec.md

# Developer Role-Track Spec

## Purpose

This document fixes the first role-specific course for the platform:
the **Developer track**.

Its purpose is to answer:

- what this course should teach;
- what lessons it should contain;
- what practical tasks are needed;
- which task types are already supported by the current builder;
- what should be reviewed after the course is created and tested.

This document should be used **before** creating the Developer course in the practicum builder.

---

## Course Identity

### Recommended course title

**AI for Developers: Practical Developer Workflows**

Alternative titles:
- AI for Developers: First Practical Workflows
- Practical AI for Junior Developers
- AI Assistance in Developer Work

---

## Course Goal

After finishing this course, the learner should be able to:

- use AI to understand unfamiliar code more effectively;
- use AI to support debugging and investigation;
- critically evaluate AI explanations and not trust them blindly;
- use AI to draft technical explanations and documentation;
- use AI to decompose implementation tasks into clearer steps;
- use AI to support thinking about tests, edge cases, and safe usage.

This course is **not** meant to teach programming from zero.
It is meant to teach **how a developer can apply AI in real work-like scenarios**.

---

## Course Position In Product Logic

This course belongs to:

- `course_category = role_track`

It should become available **after** the common base is completed.

It is intended for:

- junior developers;
- interns with basic programming knowledge;
- learners who already passed the common base and understand:
  - what AI is,
  - how to write prompts,
  - how to iterate,
  - why verification matters.

---

## Core Course Principle

This role track should not become:
- a full software engineering curriculum;
- a theory-heavy computer science module;
- a prompt-writing-only course.

Instead, it should teach:
- realistic AI-assisted workflows;
- practical judgment;
- correct framing of technical requests;
- critical thinking about AI output.

---

# Recommended Course Structure

## Suggested lesson count

**6–7 lessons** is the strongest first version.

Recommended MVP:
- **6 lessons** if you want a tighter course
- **7 lessons** if you want to include explicit safe-use coverage inside the role track

Recommended version below:
- **7 lessons**

---

# Lesson 1 — Use AI to understand unfamiliar code

## Goal

Teach the learner to use AI to understand a code fragment, module, or file without asking vague questions like “explain everything”.

## What the learner should understand

- AI needs code context;
- good requests ask for purpose, structure, and risky areas;
- the answer should be concise and technical;
- explanations from AI still need to be checked against the actual code.

## Practical task type

**Write a structured request**

## Suggested task

Write a request to AI that will help you understand an unfamiliar module.

The request should ask AI to:
1. explain the main purpose of the code;
2. describe the key parts;
3. point out suspicious or risky places;
4. keep the answer concise and technical.

## Success criteria

- asks for code purpose;
- asks for structure or key parts;
- requests suspicious or risky areas;
- includes useful answer constraints;
- avoids vague “explain everything” phrasing.

## Common mistakes

- no technical context;
- too broad request;
- no request for risky areas;
- no answer format or constraints.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 2 — Use AI to frame debugging problems correctly

## Goal

Teach the learner to describe a bug or issue in a way that makes AI useful for diagnosis, not just blind fixing.

## What the learner should understand

- debugging requests need context;
- expected vs actual behavior matters;
- error signals matter;
- AI should help form hypotheses and next checks.

## Practical task type

**Improve a weak request**

## Suggested task

You are given a weak debugging request:

> “My code does not work, fix it.”

Rewrite it so that AI understands:
- the context,
- the expected behavior,
- the actual behavior,
- the error or symptom,
- and that you want possible causes plus next debugging steps.

## Success criteria

- includes technical context;
- includes expected vs actual behavior;
- includes an inspectable symptom or error signal;
- asks for diagnostic help, not magical fixing only.

## Common mistakes

- still vague;
- missing expected vs actual behavior;
- asks only for a final fix;
- no debugging context.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 3 — Critically evaluate an AI explanation of code

## Goal

Teach the learner to analyze an AI answer and distinguish useful explanation from questionable or unverified claims.

## What the learner should understand

- AI answers can sound confident and still be wrong;
- useful explanation and questionable claims should be separated;
- developers must identify what to verify manually in code.

## Practical task type

**Analyze and critique AI output**

## Suggested task

You are given an AI explanation of a piece of code.

Describe:
1. what in the answer looks useful;
2. what looks questionable or uncertain;
3. what you would verify manually in the code;
4. why you should not accept the explanation blindly.

## Success criteria

- identifies both useful and questionable parts;
- mentions concrete manual verification points;
- explains why blind trust is risky;
- stays tied to technical reality.

## Common mistakes

- only praise or only criticism;
- too abstract;
- no manual verification logic;
- no explanation of risk.

## Builder fit

**Supported by current builder.**
This is important because it proves tasks do not have to be only “write a prompt”.

---

# Lesson 4 — Use AI to draft technical explanations and documentation

## Goal

Teach the learner to use AI to create documentation drafts without letting the model invent missing details.

## What the learner should understand

- technical documentation must specify audience;
- structure should be requested explicitly;
- AI should not invent undocumented behavior;
- documentation still needs review against the real implementation.

## Practical task type

**Write a structured request**

## Suggested task

Write a request to AI that will help generate a draft documentation text for a feature or code block.

The request should specify:
1. who the audience is;
2. what is being documented;
3. what sections should be included;
4. that the AI must not invent missing technical details.

## Success criteria

- clear audience;
- clear documentation target;
- useful structure;
- explicit no-invention instruction;
- signs of verification awareness.

## Common mistakes

- no audience;
- generic documentation request;
- no structure;
- no instruction against making things up.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 5 — Use AI to decompose an implementation task

## Goal

Teach the learner to use AI as a planning assistant before implementation.

## What the learner should understand

- AI can help break a task into steps;
- AI can help identify risks and dependencies;
- this is a draft plan, not final architecture truth;
- developers still own the implementation judgment.

## Practical task type

**Describe a workflow / planning approach**

## Suggested task

Imagine you received a new backend task in an unfamiliar codebase.

Describe how you would use AI to:
1. understand the context;
2. break the task into implementation steps;
3. identify risks and dependencies;
4. prepare a draft implementation plan.

## Success criteria

- includes sequence of practical stages;
- includes context understanding;
- includes risk/dependency thinking;
- treats AI as planning support, not final authority.

## Common mistakes

- too abstract;
- no sequence;
- no risks/dependencies;
- treats AI plan as final answer.

## Builder fit

**Supported by current builder.**
This is another non-prompt-only task type.

---

# Lesson 6 — Use AI to think about test cases and edge cases

## Goal

Teach the learner to use AI to broaden testing thinking while still checking against real requirements.

## What the learner should understand

- AI can suggest positive, negative, and edge-case scenarios;
- suggested cases must still be checked against real behavior and requirements;
- AI can miss business logic or domain-specific constraints.

## Practical task type

You may choose one of two variants.

### Variant A — more builder-friendly

**Write a structured request**

Write a request to AI that will help generate:
- 5 positive test scenarios,
- 5 negative test scenarios,
- 3 edge cases
for a specific backend function or feature.

### Variant B — more analytical

**Describe how to verify AI-generated tests**

Explain how you would check whether AI-generated test cases actually cover the necessary behavior and edge cases.

## Recommended MVP choice

Use **Variant A** first, because it is simpler to validate and easier to compare.

## Success criteria (Variant A)

- clear feature/function context;
- asks for multiple scenario classes;
- includes enough specificity;
- not overly vague or generic.

## Success criteria (Variant B)

- includes checking against requirements;
- includes coverage thinking;
- includes limits of AI-generated tests.

## Common mistakes

- no feature context;
- generic “write tests” request;
- no distinction between scenario types;
- no mention of real requirements.

## Builder fit

- Variant A: **fully supported**
- Variant B: **supported**

---

# Lesson 7 — Safe and responsible AI use in development

## Goal

Teach the learner to think about confidentiality, code safety, and responsibility when using AI in engineering work.

## What the learner should understand

- some code, data, or internal details should not be pasted into external tools carelessly;
- generated code must be reviewed;
- AI output can create security, reliability, and confidentiality risks;
- useful AI usage must stay inside safe boundaries.

## Practical task type

**Analyze a scenario**

## Suggested task

Describe:
1. one case where it is useful for a developer to use AI;
2. one case where using AI directly could create a risk for security, quality, or confidentiality.

For the risky case, explain:
- what the risk is;
- what should be checked or done safely;
- what should not be done directly.

## Success criteria

- gives realistic developer situations;
- names a concrete risk;
- explains a safe behavior or manual check;
- avoids blind or careless usage language.

## Common mistakes

- too abstract;
- no concrete risk;
- no safe action;
- treats safety as an optional detail.

## Builder fit

**Supported by current builder.**

---

# Summary of Task Types in This Course

This course should not be reduced to one repetitive task format.

Recommended distribution:

## Type 1 — Write a request
- Lesson 1
- Lesson 4
- Lesson 6A

## Type 2 — Improve a weak request
- Lesson 2

## Type 3 — Analyze / critique AI output
- Lesson 3

## Type 4 — Describe a workflow or plan
- Lesson 5

## Type 5 — Analyze safety / risk
- Lesson 7

This is important because it proves the current builder can already support more than simple “write a prompt” practice.

---

# Builder Compatibility Review

## What the current builder already supports well

- structured lesson flow with theory / info / quiz / task;
- open-text AI-checked tasks;
- success criteria entry;
- hints and examples;
- ordered lesson creation;
- enough structure for this first role track.

## What may become a future builder improvement area

Not required before writing the course, but useful to observe:

- richer support for critique-style tasks;
- clearer helper text for workflow-description tasks;
- easier entry of multiple examples or reusable task presets;
- better support for lesson templates per role.

These should be decided **after** the Developer course is drafted, not before.

---

# Recommended Production Order

## Step 1
Create the course shell with 6–7 lesson stubs.

## Step 2
Write Lessons 1 and 2 fully.
These are the strongest first pair because they are:
- practical,
- easy to validate,
- close to real developer workflows.

## Step 3
Write Lessons 3 and 4.
This expands from prompting into evaluation and documentation.

## Step 4
Write Lessons 5 and 6.
These deepen workflow thinking and testing support.

## Step 5
Add Lesson 7 if you want the role track to end with explicit safe-use coverage.
If time is tight, this lesson can remain in MVP as the last compact module.

---

# What To Do After The Developer Course Is Written

After the Developer role track is fully drafted or entered into the builder, do **not** jump straight into random builder changes.

Use this sequence:

## 1. Run a post-course content production audit

Answer:
- which lessons were easy to create?
- which lesson types created friction?
- which task formats felt unnatural in the current builder?
- what repeated manual work appeared again and again?
- what could be improved without changing the whole system?

## 2. Decide whether builder changes are actually needed

There are three possible outcomes:

### Outcome A — Current builder is enough
If the course was created with only minor inconvenience:
- do not rush more builder work;
- move to the next role track;
- keep notes for later improvements.

### Outcome B — Small builder improvements are justified
If repeated friction clearly appeared:
- make a small, course-justified builder update;
- only solve pain that already happened in practice;
- keep changes backward-compatible.

### Outcome C — A new task type is genuinely needed
If one or more very important developer lessons feel distorted by the current model:
- document exactly what the missing task pattern is;
- explain why current task type is not enough;
- then design the smallest possible extension.

## 3. Run a focused “builder needs vs course needs” review

This review should ask:

- did the current builder force lessons into an unnatural format?
- were some tasks weakened just to fit the UI?
- do we need a better way to author critique / workflow / risk-analysis tasks?
- which improvements would help future role tracks too?

## 4. Only then plan the next builder update

The builder should evolve like this:

- content first,
- pain observed,
- minimal improvement,
- test with next course.

Not:
- speculative refactor first,
- then hope content fits.

---

# Explicit Rule For Builder Evolution After Developer Course

After the Developer course is finished, the next builder update should be based on:

1. a real friction point that happened while authoring the course;
2. repeated inconvenience, not one isolated annoyance;
3. clear value for future courses too;
4. minimal implementation size;
5. full backward compatibility.

If a proposed builder change does not meet these conditions, it should probably wait.

---

# Recommended Immediate Next Task

Create a new document after course drafting:

**`developer-course-postmortem.md`**

It should contain:

- what worked well in the builder;
- what was awkward;
- which task patterns felt strong;
- which task patterns felt forced;
- what minimal builder improvements would help next.

This postmortem should be the basis for deciding whether builder changes are needed before the next role track.

---

# Final Rule

Do not let the current builder define what the Developer course should be.

First define the strongest course.
Then test whether the builder supports it well enough.
Then improve the builder only where the course proved it necessary.
