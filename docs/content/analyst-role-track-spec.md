# analyst-role-track-spec.md

# Analyst Role-Track Spec

## Purpose

This document defines the second role-specific course for the platform:
the **Analyst track**.

Its purpose is to answer:

- what this course should teach;
- what lessons it should contain;
- what practical tasks are needed;
- which task types are already supported by the current builder;
- what should be reviewed after the course is created and tested.

This document should be used **before** creating the Analyst course in the practicum builder.

---

## Course Identity

### Recommended course title

**AI for Analysts: Practical Analytical Workflows**

Alternative titles:
- AI for Analysts: First Practical Workflows
- Practical AI for Junior Analysts
- AI Assistance in Analytical Work

---

## Course Goal

After finishing this course, the learner should be able to:

- use AI to clarify analytical tasks before starting work;
- use AI to structure business questions into analyzable sub-questions;
- use AI to support SQL / query thinking without blindly trusting generated logic;
- use AI to help summarize findings and draft analytical conclusions;
- critically evaluate AI-generated analytical reasoning;
- use AI safely without trusting invented numbers, fake metrics, or unsupported conclusions.

This course is **not** meant to teach analytics from zero.
It is meant to teach **how an analyst can apply AI in realistic work-like scenarios**.

---

## Course Position In Product Logic

This course belongs to:

- `course_category = role_track`

It should become available **after** the common base is completed.

It is intended for:

- junior analysts;
- interns with basic analytics knowledge;
- learners who already passed the common base and understand:
  - what AI is,
  - how to write prompts,
  - how to iterate,
  - why verification matters.

---

## Core Course Principle

This role track should not become:
- a full analytics curriculum;
- a statistics-from-zero course;
- a SQL theory course;
- a prompt-writing-only course.

Instead, it should teach:
- realistic AI-assisted analytical workflows;
- practical judgment;
- correct framing of analytical requests;
- critical thinking about AI-generated conclusions.

---

# Recommended Course Structure

## Suggested lesson count

**6–7 lessons** is the strongest first version.

Recommended MVP:
- **6 lessons** if you want a tighter course
- **7 lessons** if you want to include explicit safety / invented-conclusion coverage as a dedicated ending lesson

Recommended version below:
- **7 lessons**

---

# Lesson 1 — Turn a vague business question into a clear analytical task

## Goal

Teach the learner to use AI to clarify what exactly needs to be analyzed before touching data.

## What the learner should understand

- vague business questions should be turned into concrete analytical tasks;
- AI can help identify missing context, entities, metrics, and time windows;
- the analyst still has to define what is actually being measured.

## Practical task type

**Improve a vague request**

## Suggested task

You are given a vague business question:

> “Why did our results get worse recently?”

Rewrite it into a stronger analytical request for AI so that it becomes clear:
- what results are meant,
- for what period,
- for which segment or product,
- and what clarifying questions should be answered before analysis.

## Success criteria

- replaces vagueness with a clearer analytical framing;
- specifies metric or target area;
- introduces time or scope;
- asks clarifying questions where needed.

## Common mistakes

- keeps the request vague;
- no metric or business object is clarified;
- no scope or time window;
- turns into generic “analyze everything”.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 2 — Break an analytical task into useful sub-questions

## Goal

Teach the learner to use AI to decompose one analytical question into smaller, practical investigation steps.

## What the learner should understand

- good analysis is rarely one giant question;
- AI can help identify segments, comparisons, funnels, cohorts, or possible dimensions;
- decomposition should lead to a more structured investigation.

## Practical task type

**Describe a structured approach**

## Suggested task

You need to analyze a drop in conversion for an online product.

Describe how you would use AI to break this problem into smaller analytical questions, for example:
- by segment,
- by time,
- by funnel step,
- by traffic source,
- by product area.

## Success criteria

- decomposes the problem into useful analytical directions;
- includes more than one dimension of analysis;
- stays tied to a realistic business problem;
- shows structured analytical thinking.

## Common mistakes

- too generic;
- no decomposition;
- only one obvious angle;
- no connection to real analysis flow.

## Builder fit

**Supported by current builder.**
This is a workflow-thinking task, not only prompt-writing.

---

# Lesson 3 — Use AI to support SQL / query thinking

## Goal

Teach the learner to use AI as support for thinking about query structure without blindly trusting generated SQL.

## What the learner should understand

- AI can help draft query logic, joins, filters, and aggregations;
- generated SQL must still be checked;
- the analyst must understand what the query is doing.

## Practical task type

You may choose one of two variants.

### Variant A — write a structured request

Write a request to AI asking it to help draft query logic for an analytical task.

The request should specify:
- what business question you are answering;
- what tables or entities are involved;
- what metric you want;
- what grouping / filtering is needed;
- that AI should explain the logic, not only output raw SQL.

### Variant B — critique weak analytical SQL reasoning

You are given a weak AI-generated explanation of a query or aggregation.
Describe what looks questionable and what should be checked manually.

## Recommended MVP choice

Use **Variant A** first, because it is easier to validate and fits the builder cleanly.

## Success criteria (Variant A)

- clear business question;
- enough table/entity context;
- metric and grouping are specified;
- asks for logic explanation, not blind code only.

## Success criteria (Variant B)

- identifies questionable assumptions;
- names what to verify manually;
- avoids blind trust.

## Common mistakes

- asks for SQL with no context;
- no business question;
- no explanation requirement;
- treats generated query as final truth.

## Builder fit

- Variant A: **fully supported**
- Variant B: **supported**

---

# Lesson 4 — Critically evaluate AI-generated analytical conclusions

## Goal

Teach the learner to separate useful analytical reasoning from invented or weak conclusions.

## What the learner should understand

- AI can produce plausible but unsupported analytical interpretations;
- useful summaries and invented causal claims must be distinguished;
- analysts must check whether conclusions are actually grounded in data.

## Practical task type

**Analyze and critique AI output**

## Suggested task

You are given an AI-generated analytical summary.

Describe:
1. what in the summary looks useful;
2. what conclusions look unsupported or too confident;
3. what data or checks would be needed before using this summary in real work;
4. why the summary should not be accepted blindly.

## Success criteria

- distinguishes useful vs questionable parts;
- identifies unsupported claims;
- names concrete validation steps;
- explains why analyst review is still required.

## Common mistakes

- only praise or only criticism;
- too abstract;
- no validation logic;
- no link to actual data checks.

## Builder fit

**Supported by current builder.**
This is an important non-prompt-only pattern.

---

# Lesson 5 — Use AI to draft summaries and communicate findings

## Goal

Teach the learner to use AI to turn analytical findings into clear written communication.

## What the learner should understand

- AI can help structure analytical summaries;
- audience matters;
- caveats and uncertainty matter;
- wording should not overstate conclusions.

## Practical task type

**Write a structured request**

## Suggested task

Write a request to AI that will help draft a short analytical summary for a stakeholder.

The request should specify:
1. who the audience is;
2. what findings should be summarized;
3. what tone or structure is needed;
4. what cautions or uncertainties should be preserved.

## Success criteria

- clear audience;
- clear communication goal;
- includes structure or formatting expectation;
- includes caution against overstating certainty.

## Common mistakes

- no audience;
- no uncertainty/caveat preservation;
- overly generic;
- turns analysis into unsupported confident messaging.

## Builder fit

**Fully supported by current builder.**

---

# Lesson 6 — Use AI to compare, verify, and stress-test analytical reasoning

## Goal

Teach the learner to use AI not just for answers, but for checking whether their own analytical logic is missing something.

## What the learner should understand

- AI can help generate alternative explanations;
- AI can help identify missing factors, segments, or checks;
- verification is not the same as outsourcing the analysis.

## Practical task type

**Describe a workflow / verification plan**

## Suggested task

Imagine you already have a first hypothesis about why a key metric dropped.

Describe how you would use AI to:
1. challenge your own hypothesis;
2. surface alternative explanations;
3. identify missing checks;
4. avoid confirmation bias in the analysis process.

## Success criteria

- shows a structured verification approach;
- includes alternative explanations;
- includes missing-check logic;
- shows awareness of bias and overconfidence.

## Common mistakes

- too general;
- no alternative explanations;
- no verification stages;
- uses AI only as agreement machine.

## Builder fit

**Supported by current builder.**

---

# Lesson 7 — Safe and responsible AI use in analytics

## Goal

Teach the learner to think about confidentiality, invented data, and responsible use of AI in analytical work.

## What the learner should understand

- analysts should not trust invented numbers or unsupported claims;
- some data should not be pasted into external tools without care;
- AI can help with structure, wording, and exploration, but final analytical claims must be checked.

## Practical task type

**Analyze a scenario**

## Suggested task

Describe:
1. one case where it is useful for an analyst to use AI;
2. one case where using AI directly could create a risk for data quality, confidentiality, or decision-making.

For the risky case, explain:
- what the risk is;
- what should be checked or done safely;
- what should not be done directly.

## Success criteria

- gives realistic analyst situations;
- names a concrete risk;
- explains a safe behavior or manual check;
- avoids careless trust language.

## Common mistakes

- too abstract;
- no concrete risk;
- no safe action;
- ignores data quality or confidentiality.

## Builder fit

**Supported by current builder.**

---

# Summary of Task Types in This Course

This course should not be reduced to one repetitive task format.

Recommended distribution:

## Type 1 — Improve a vague or weak analytical request
- Lesson 1

## Type 2 — Describe a structured analytical workflow
- Lesson 2
- Lesson 6

## Type 3 — Write a structured request
- Lesson 3A
- Lesson 5

## Type 4 — Analyze / critique AI output
- Lesson 4
- optionally Lesson 3B

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
- enough structure for the first Analyst track.

## What may become a future builder improvement area

Not required before writing the course, but useful to observe:

- clearer helper text for critique-style tasks;
- clearer helper text for workflow-description tasks;
- easier entry of alternative examples or analyst-specific mini-cases;
- lightweight role-specific lesson templates.

These should be decided **after** the Analyst course is drafted, not before.

---

# Recommended Production Order

## Step 1
Create the course shell with 6–7 lesson stubs.

## Step 2
Write Lessons 1 and 2 fully.
These are the strongest first pair because they define:
- analytical framing,
- decomposition,
- realistic role use.

## Step 3
Write Lessons 3 and 4.
This extends the course into SQL/query thinking and critique of AI-generated conclusions.

## Step 4
Write Lessons 5 and 6.
These add communication and verification thinking.

## Step 5
Add Lesson 7 if you want the track to end with explicit safe-use coverage.
If time is tight, this can remain the final compact module in MVP form.

---

# What To Do After The Analyst Course Is Written

After the Analyst role track is fully drafted or entered into the builder, do **not** jump straight into random builder changes.

Use this sequence:

## 1. Run a post-course content production audit

Answer:
- which lessons were easy to create?
- which lesson types created friction?
- which task formats felt unnatural in the current builder?
- what repeated manual work appeared?
- what could be improved without changing the whole system?

## 2. Compare the Analyst postmortem with the Developer postmortem

This is the critical step.

Ask:
- did the same friction appear in both tracks?
- were the same task patterns awkward in both tracks?
- did the current builder distort both courses in the same places?

If the same pain repeats in both tracks, then builder change is much more justified.

## 3. Decide whether builder changes are actually needed

There are three possible outcomes:

### Outcome A — Current builder is enough
If both tracks were created with only minor inconvenience:
- do not rush more builder work;
- move to the next role track;
- keep notes for later improvements.

### Outcome B — Small builder improvements are justified
If repeated friction clearly appeared in both tracks:
- make a small, evidence-based builder update;
- only solve pain that already happened in practice;
- keep changes backward-compatible.

### Outcome C — A genuinely missing task pattern exists
If the same important task pattern feels distorted in both tracks:
- document exactly what the missing pattern is;
- explain why the current model is not enough;
- then design the smallest possible extension.

## 4. Only then plan the next builder update

The builder should evolve like this:

- content first,
- pain observed,
- repeated pattern confirmed,
- minimal improvement,
- test with next course.

Not:
- speculative refactor first,
- then hope content fits.

---

# Explicit Rule For Builder Evolution After Analyst Course

After the Analyst course is finished, the next builder update should be based on:

1. a real friction point that happened while authoring the course;
2. repeated inconvenience across more than one role track;
3. clear value for future courses too;
4. minimal implementation size;
5. full backward compatibility.

If a proposed builder change does not meet these conditions, it should probably wait.

---

# Recommended Immediate Next Task

Create a new document after course drafting:

**`analyst-course-postmortem.md`**

It should contain:

- what worked well in the builder;
- what was awkward;
- which task patterns felt strong;
- which task patterns felt forced;
- what minimal builder improvements would help next;
- how much of that overlaps with the Developer postmortem.

This postmortem should be the basis for deciding whether builder changes are needed before the third role track.

---

# Final Rule

Do not let the current builder define what the Analyst course should be.

First define the strongest course.
Then test whether the builder supports it well enough.
Then improve the builder only where the course proved it necessary.
