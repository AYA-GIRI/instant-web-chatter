# master-index.md

# Master Index

## Purpose

This file is the entry point for the whole project documentation system.

It exists for two audiences:

1. the human developer / project owner;
2. AI coding assistants working with the repository (for example in Cursor).

Its job is simple:

- explain why these documents exist;
- explain what each file is for;
- explain in which order they should be used;
- explain how product decisions, content decisions, and implementation decisions should be made;
- prevent the project from turning back into chaotic feature-building.

This file should be the first documentation file opened when someone new starts working on the project.

---

## What This Documentation System Is For

This project is no longer just “a site with pages and features”.

It is being shaped into a coherent product:

- a platform that helps interns and junior specialists learn how to apply AI in their own specialty;
- with a common foundational track for everyone;
- with role-specific tracks;
- with practical tasks;
- with AI-driven feedback;
- with a content system and admin system;
- with a technical foundation that should feel close to a real product.

Because of that, the project needs more than code.
It needs decision-making structure.

This documentation system exists to answer:

- what this project is;
- for whom it exists;
- what belongs in the project;
- what does not belong in the project;
- what content should be produced;
- what should be implemented next;
- how to know whether the MVP is good enough to present.

---

## Main Rule

If there is uncertainty about:
- product direction,
- user flow,
- course structure,
- scope,
- implementation priority,
- content creation,
- or AI evaluation,

do not guess from memory.

Use the relevant document from this system.

---

## Recommended Reading Order

### For understanding the project from zero

Read in this order:

1. `PROJECT_CONTEXT.md`
2. `project-definition.md`
3. `user-journeys.md`
4. `roadmap.md`
5. `implementation-backlog.md`

This gives:
- current project state;
- product meaning;
- user flow;
- development direction;
- concrete implementation priorities.

---

### For content work

Read in this order:

1. `project-definition.md`
2. `user-journeys.md`
3. `content-matrix.md`
4. `assignment-spec.md`
5. `task-library.md`
6. `course-outlines.md`
7. `content-production-plan.md`
8. `ai-feedback-rubrics.md`

This gives:
- scope;
- audience;
- content structure;
- lesson/task standards;
- task ideas;
- course composition;
- production process;
- feedback rules.

---

### For implementation work

Read in this order:

1. `PROJECT_CONTEXT.md`
2. `project-definition.md`
3. `user-journeys.md`
4. `implementation-backlog.md`
5. `mvp-release-checklist.md`

This gives:
- current state;
- target state;
- expected user behavior;
- what to build next;
- how readiness will be judged.

---

## Document Map

## 1. `PROJECT_CONTEXT.md`

### Purpose
Describes the current real state of the project.

### Use it for
- understanding the existing codebase and architecture;
- understanding what is already implemented;
- understanding current routes, entities, features, and technical constraints.

### Do not use it for
- deciding product scope alone;
- deciding what the platform should become without checking product docs.

---

## 2. `project-definition.md`

### Purpose
Defines the product itself.

### Answers
- what this project is;
- what problem it solves;
- who it is for;
- what is in scope;
- what is out of scope;
- what success looks like.

### Use it for
- deciding whether a feature, course, or idea belongs in the project;
- explaining the project to another person;
- keeping the product coherent.

---

## 3. `user-journeys.md`

### Purpose
Describes how different users move through the platform.

### Answers
- what the learner does first;
- how progression works;
- how the admin interacts with the system;
- what pain points and UX needs exist.

### Use it for
- designing flows;
- improving UX;
- understanding what screens and states matter most;
- deciding what is confusing or missing in the current experience.

---

## 4. `roadmap.md`

### Purpose
Explains the development direction at a strategic level.

### Answers
- what to focus on first;
- what to focus on later;
- what should not be prioritized yet.

### Use it for
- choosing the next area of work;
- aligning product, UX, content, and technical priorities.

---

## 5. `content-matrix.md`

### Purpose
Maps the platform content by user role and learning purpose.

### Answers
- what the common base should teach;
- what each role track should teach;
- what skills and topics belong to each area.

### Use it for
- deciding course modules;
- deciding what content belongs to each role;
- avoiding random or duplicated topic selection.

---

## 6. `assignment-spec.md`

### Purpose
Defines how lessons and tasks should be designed.

### Answers
- what a good assignment looks like;
- what fields a task should contain;
- what standards each lesson should follow.

### Use it for
- writing new lessons;
- writing new practical tasks;
- standardizing how practice works across the platform.

---

## 7. `task-library.md`

### Purpose
Provides a starter library of realistic assignment ideas.

### Answers
- what tasks can already be created now;
- what task types exist for the common base and each role.

### Use it for
- populating the MVP quickly;
- selecting candidate tasks for new lessons;
- avoiding blank-page syndrome during content production.

---

## 8. `course-outlines.md`

### Purpose
Shows how content should be grouped into actual courses.

### Answers
- what the common base course contains;
- what role-based courses contain;
- what lesson order makes sense.

### Use it for
- structuring the builder;
- planning course creation;
- understanding progression across lessons.

---

## 9. `ai-feedback-rubrics.md`

### Purpose
Defines how AI should evaluate learner responses.

### Answers
- what makes an answer strong, acceptable, or weak;
- how AI feedback should be structured;
- how feedback differs by task type and role.

### Use it for
- implementing AI evaluation prompts;
- calibrating feedback consistency;
- improving the retry / revision loop.

---

## 10. `content-production-plan.md`

### Purpose
Explains how to produce learning content systematically.

### Answers
- what content to create first;
- in what order to produce it;
- what quality gates lesson production should follow.

### Use it for
- organizing content creation;
- preventing scope drift in lesson production;
- running the content workstream like a real pipeline.

---

## 11. `implementation-backlog.md`

### Purpose
Converts the product framework into concrete implementation priorities.

### Answers
- what to build next in the product and codebase;
- how to prioritize product, UX, admin, AI feedback, and technical tasks;
- what the next real development cycles should focus on.

### Use it for
- creating engineering tasks;
- selecting sprint scope;
- deciding what to implement before adding more content or features.

This is one of the most important documents for active development.

---

## 12. `mvp-release-checklist.md`

### Purpose
Defines what “ready enough to show” means.

### Answers
- what must be true before the project is demo-ready;
- how to evaluate coherence, stability, content quality, technical readiness, and presentation readiness.

### Use it for
- pre-demo checks;
- pre-submission checks;
- release-readiness reviews.

---

## Decision Rules

### If the question is:
“Does this idea belong in the project?”

Use:
- `project-definition.md`

---

### If the question is:
“How should the learner or admin move through the platform?”

Use:
- `user-journeys.md`

---

### If the question is:
“What should we build next?”

Use:
- `implementation-backlog.md`
- `roadmap.md`

---

### If the question is:
“What content should exist for a role?”

Use:
- `content-matrix.md`
- `course-outlines.md`

---

### If the question is:
“How should this task be written?”

Use:
- `assignment-spec.md`
- `task-library.md`

---

### If the question is:
“How should AI evaluate this answer?”

Use:
- `ai-feedback-rubrics.md`

---

### If the question is:
“Is the MVP already strong enough to present?”

Use:
- `mvp-release-checklist.md`

---

## Recommended Repository Placement

Recommended structure:

```text
docs/
  index/
    master-index.md

  product/
    project-definition.md
    user-journeys.md
    roadmap.md
    mvp-release-checklist.md

  content/
    content-matrix.md
    assignment-spec.md
    task-library.md
    course-outlines.md
    ai-feedback-rubrics.md
    content-production-plan.md

  engineering/
    implementation-backlog.md

  tech/
    PROJECT_CONTEXT.md
```

If needed, filenames can remain the same but should be grouped by purpose.

---

## Recommended Working Style With These Docs

### For human work

Use this loop:

1. understand the problem;
2. check the relevant doc;
3. decide the intended outcome;
4. implement one small coherent change;
5. review the result against the docs;
6. update docs if the product direction changed intentionally.

Do not treat docs as static decoration.
Treat them as the control system of the project.

---

### For AI-assisted work

Use this loop:

1. give the AI one concrete task;
2. tell it exactly which docs it must read first;
3. ask it to propose a short plan before coding if the change is large;
4. ask it to explain what files it will modify;
5. review the result against product and implementation docs;
6. ask it to update docs if the change alters behavior or scope.

---

## How AI Should Interpret This Documentation System

An AI assistant working in this repository should follow these principles:

1. Do not invent product direction from code alone.
2. Use `project-definition.md` to determine scope.
3. Use `user-journeys.md` to determine user-facing flow.
4. Use `content-matrix.md` and `course-outlines.md` when creating or changing course content.
5. Use `assignment-spec.md` and `ai-feedback-rubrics.md` when changing task design or AI evaluation.
6. Use `implementation-backlog.md` to choose the next development priorities.
7. Use `mvp-release-checklist.md` to judge release-readiness.
8. If code and docs disagree, do not assume the docs are wrong; explicitly flag the mismatch.
9. Do not add unrelated educational features that drift away from AI application in a user’s specialty.
10. Prefer coherent product behavior over adding extra isolated features.

---

## Anti-Chaos Rules

The project should avoid falling back into these patterns:

- adding random courses without checking scope;
- building UI before deciding the user flow;
- implementing AI feedback without shared rubric logic;
- treating optional materials as required path content;
- mixing “AI in a specialty” with “full profession-from-zero education”;
- coding new features without checking implementation priorities;
- keeping major product decisions only in chat messages and not in docs.

---

## What To Do Before Starting Any Major Change

Before any major change, answer these five questions:

1. What exact problem am I solving?
2. Which user does this change affect?
3. Which document defines the correct direction here?
4. Is this in scope for the product?
5. How will I know the change is done?

If these questions are not answered, implementation quality will likely drop.

---

## Suggested Minimum Docs To Read For Common Task Types

### A. Building a new platform feature
Read:
- `PROJECT_CONTEXT.md`
- `project-definition.md`
- `user-journeys.md`
- `implementation-backlog.md`

### B. Building or editing a course
Read:
- `project-definition.md`
- `content-matrix.md`
- `course-outlines.md`
- `content-production-plan.md`

### C. Writing a new task
Read:
- `assignment-spec.md`
- `task-library.md`
- `ai-feedback-rubrics.md`

### D. Preparing a demo or review
Read:
- `project-definition.md`
- `implementation-backlog.md`
- `mvp-release-checklist.md`

---

## Maintenance Rule

Whenever a major product or flow decision changes, update the relevant documentation.

At minimum:
- update `project-definition.md` if scope changes;
- update `user-journeys.md` if flow changes;
- update `content-matrix.md` if role content changes;
- update `implementation-backlog.md` if priorities change;
- update `mvp-release-checklist.md` if readiness criteria change.

If code changes but docs do not, knowledge debt grows.

---

## Final Rule

This documentation system exists so the project can be developed intentionally.

The codebase shows what has been built.
These documents explain why it exists, how it should evolve, and how to keep it coherent.

If there is doubt, start here.
