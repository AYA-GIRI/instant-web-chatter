# content-pilot-plan.md

# Content Pilot Plan

## Purpose

This pilot exists to answer one practical question:

> Can the current version of the platform support one strong common-base course and one strong role-specific mini-track without collapsing into chaos?

This is not the stage for building all roles or all content.
This is the stage for validating the product loop with real learning content.

---

## Pilot Goal

Build:

1. **one real common-base course** for all users;
2. **one real role track** for the first specialty;
3. enough tasks and AI feedback patterns to validate:
   - onboarding,
   - common-base gating,
   - role logic,
   - content structure,
   - practice flow,
   - AI evaluation quality.

---

## Why This Comes Before Bigger Builder Improvements

Right now the project already has:

- role selection;
- common-base gating;
- course taxonomy;
- practicum flow;
- AI feedback foundation.

What it still lacks is **strong real content**.

Because of that, the next step should not be “over-improve the builder”.
It should be:

> create a small but real content core, observe where production becomes painful, and only then improve the builder based on actual use.

---

## Pilot Scope

### In scope

- 1 common-base course
- 1 role mini-track
- 3–4 lessons in the common base
- 3 lessons in the role track
- real tasks written with actual success criteria
- AI evaluation prompts aligned to assignment types
- enough polish that the pilot can be used in demo and testing

### Out of scope

- all 5 role tracks
- full content migration from old legacy lessons
- deep optional reading library
- advanced personalization
- perfect builder redesign
- production-scale content volume

---

## Recommended First Role Track

### Choose: **Developer**

Why developer first:

- easiest to formulate realistic practical tasks;
- easiest to evaluate with structured prompt and output criteria;
- easiest to test quickly inside the current product;
- strong alignment with your own project context and ability to judge content quality.

After the developer pilot is stable, the next likely role track can be:
- Analyst

### Implementation status (Developer track)

Ролевой трек для разработчиков заведён в БД миграцией `supabase/migrations/20250316000000_seed_developer_role_track.sql`: курс `ai-for-developers` («AI для разработчиков: практические сценарии»), 7 уроков по спецификации [developer-role-track-spec.md](developer-role-track-spec.md). Структура каждого урока: theory, info, quiz, task. После применения миграции курс доступен после прохождения общей базы (gating).

---

# Part 1 — Common Base Course

## Recommended course title

**AI Foundations for Work** (RU: «Основы AI для работы»)

Alternative names (conceptual only, не обязательно совпадают с реальным слагом/тайтлом в БД):
- AI Basics for Interns
- Foundations of Practical AI Use
- AI as a Working Tool

---

## Common Base Course Goal

After this course, the user should be able to:

- understand where AI helps in work;
- formulate a clear task for a model;
- improve prompts iteratively;
- evaluate output critically instead of trusting blindly;
- continue learning independently by researching tools and workflows.

---

## Recommended Common Base Structure

### Implementation status

Для пилота общий базовый курс уже заведен в практикуме как:

- курс `ai-foundations` с названием «Основы AI для работы»;
- категория `course_category = 'common_base'`, `is_common_base = true`;
- 4 урока (см. структуру ниже), каждый собран в текущем PracticumBuilder как цепочка из блоков `theory` → `info` → `quiz` → `task` с AI‑проверкой.

### Lesson 1 — AI as a work tool: where it helps and where it fails

#### Goal
Give the user the correct mental model:
AI is not magic, but a practical assistant with strengths and limits.

#### What to teach
- what AI is useful for in work;
- typical work-like scenarios;
- what AI is bad at;
- why verification matters;
- why AI should support thinking, not replace it.

#### Example task
**Task type:** analyze a situation

**Prompt to learner:**
You are given 5 work situations. Decide in which ones AI is likely useful, in which ones it is risky, and briefly explain why.

#### Skill trained
- identifying appropriate AI use cases;
- thinking critically about strengths and limits.

#### Suggested AI-checked task
Ask the learner to write a short explanation:
> “Describe one realistic situation from your future specialty where AI could help, and one where you should be careful using it.”

#### Success criteria
- gives a realistic work context;
- explains the value of AI clearly;
- names at least one limitation or risk;
- avoids blind trust language.

---

### Lesson 2 — How to write a good prompt

#### Goal
Teach the learner to formulate a clear request instead of writing vague instructions.

#### What to teach
- task clarity;
- context;
- goal;
- constraints;
- desired format of answer.

#### Example task
Show two prompts:
- weak and vague;
- structured and clear.

Ask the learner to explain why one is better.

#### Suggested AI-checked task
> Rewrite a weak prompt so that it becomes specific, contextual, and useful.

Example weak prompt:
> “Help me with my work task.”

#### Skill trained
- structuring prompts;
- expressing goal and constraints.

#### Success criteria
- clear task;
- enough context;
- expected output format;
- no major ambiguity.

---

### Lesson 3 — How to improve a prompt iteratively

#### Goal
Teach the learner that first prompt quality is rarely final and that revision is normal.

#### What to teach
- how to analyze a weak model response;
- how to refine the prompt;
- how to ask for clarification, structure, or constraints;
- how to use multiple attempts productively.

#### Example task
Show:
- original prompt;
- mediocre AI answer.

Ask:
> What should be improved in the next prompt?

#### Suggested AI-checked task
> You are given a weak initial prompt and an unsatisfying AI response. Write an improved second prompt.

#### Skill trained
- iterative prompting;
- diagnosing prompt weaknesses.

#### Success criteria
- identifies what was missing in first attempt;
- adds better structure or constraints;
- improves likely answer quality;
- does not just rephrase superficially.

---

### Lesson 4 — Verification, safety, and independent tool research

#### Goal
Teach the learner that good AI use includes checking answers and finding tools independently.

#### What to teach
- why AI answers should be verified;
- common hallucination risks;
- safe behavior with sensitive information;
- how to search for tools relevant to your specialty;
- how to build an “AI workflow mindset”.

#### Example task
Show a plausible but flawed AI answer and ask the learner what should be checked before trusting it.

#### Suggested AI-checked task
> Describe how you would evaluate whether a new AI tool is worth using in your specialty.
Include:
1. what task you want to improve,
2. what you would test,
3. how you would compare results,
4. what risks you would watch for.

#### Skill trained
- verification;
- safe usage;
- tool research mindset.

#### Success criteria
- connects tool choice to real task;
- includes validation/testing logic;
- mentions risks or limitations;
- demonstrates independent thinking.

---

## Common Base Completion Rule

The course should count as complete when:
- all required lessons are completed;
- all interactive required tasks are passed;
- user has finished the final lesson on verification and tool research.

Implementation note (current UI):
- завершённые уроки внутри курса подсвечиваются зелёной карточкой;
- завершённые курсы на `/practicum` подсвечены зелёной рамкой и фоном, кнопка меняет текст «Начать практикум» → «Продолжить курс» → «Просмотреть курс» в зависимости от прогресса;
- доступ к ролевым трекам открывается только после завершения общего базового курса и зависит от выбранной `specialty_role`.

---

# Part 2 — Developer Pilot Track

## Recommended course title

**AI for Developers: First Practical Workflows**

Alternative names:
- Practical AI for Junior Developers
- AI Assistance in Developer Work
- Developer AI Workflow Basics

---

## Developer Track Goal

After this mini-track, the learner should be able to:

- use AI to understand code faster;
- use AI to support debugging and investigation;
- use AI to help write technical explanations or documentation;
- evaluate whether AI output is technically useful and safe enough to trust.

---

## Recommended Developer Track Structure

### Lesson 1 — Use AI to understand unfamiliar code

#### Goal
Teach the learner to ask AI for code explanation in a useful, structured way.

#### What to teach
- how to provide code context;
- how to ask for explanation at the right level;
- how to request risks, assumptions, and unclear spots;
- how to avoid asking overly broad questions.

#### Suggested AI-checked task
> Write a prompt for AI that will help you understand an unfamiliar module.
The prompt should ask the model to:
1. explain the main purpose of the code,
2. describe key parts,
3. point out suspicious or risky areas,
4. keep the answer concise and technical.

#### Success criteria
- asks for purpose and structure;
- requests useful technical detail;
- includes constraints on answer style;
- avoids vague “explain everything” phrasing.

---

### Lesson 2 — Use AI to help with debugging

#### Goal
Teach the learner to frame debugging problems clearly for AI.

#### What to teach
- how to describe the bug;
- how to include environment/context;
- how to include expected vs actual behavior;
- how to ask AI for debugging hypotheses instead of magical fixes.

#### Suggested AI-checked task
> Rewrite a weak debugging request into a strong one.

Weak version:
> “My code does not work, fix it.”

The learner should turn it into a structured debugging prompt with:
- context,
- expected behavior,
- actual behavior,
- error signal,
- request for possible causes and next checks.

#### Success criteria
- contains debugging context;
- includes expected vs actual behavior;
- asks for diagnostic help, not blind patching only;
- makes the problem inspectable.

---

### Lesson 3 — Use AI to generate technical explanations and documentation

#### Goal
Teach the learner to turn code or a feature into usable technical documentation with AI assistance.

#### What to teach
- when AI can help with documentation;
- how to specify audience;
- how to request structure;
- how to verify that generated docs match reality.

#### Suggested AI-checked task
> Write a prompt for AI to generate draft documentation for a feature or code block.
The prompt should specify:
1. audience,
2. what is being documented,
3. desired sections,
4. what must not be invented.

#### Success criteria
- clear audience;
- clear documentation scope;
- expected structure included;
- explicit instruction not to invent missing details;
- shows awareness of verification.

---

## Developer Track Optional Final Mini-Task

If you want a stronger pilot, add one final synthesis task:

> You received a new backend task with unfamiliar code and a failing behavior.
Describe how you would use AI across three stages:
1. understand the code,
2. investigate the issue,
3. draft technical explanation or notes.

This is good because it checks not just prompt-writing, but workflow thinking.

---

# Production Order for the Pilot

## Step 1
Create the common-base course shell.

### Deliverables
- course card
- 4 lesson stubs
- lesson titles and goals
- draft success criteria per lesson

---

## Step 2
Write the first two common-base lessons fully.

Reason:
this is enough to test lesson structure, AI feedback, and learner flow before completing the whole base.

---

## Step 3
Complete all 4 common-base lessons.

At this point you validate:
- common-base gating UX;
- practical quality;
- AI checking quality;
- lesson consistency.

---

## Step 4
Create the developer pilot track shell.

### Deliverables
- course card
- 3 lesson stubs
- learning goals
- initial task specs

---

## Step 5
Write the developer lessons fully and test them.

---

## Step 6
Review pain points in:
- builder UX;
- lesson structure;
- AI rubrics;
- wording;
- gating;
- admin workflow.

This review becomes the foundation for **P0.4-lite** or later builder standardization.

---

# Recommended Format Per Lesson

For the pilot, every lesson should use the same lightweight structure:

1. Why this matters
2. Short explanation
3. One good example
4. One weak example or common mistake
5. One practical task
6. AI feedback
7. One short takeaway

Do not overcomplicate this yet.
Consistency matters more than perfect sophistication.

---

# What To Do With Legacy Content

Do not try to force old lessons into the new pilot if they do not fit the product.

Use old content only in one of these ways:

- hidden legacy content;
- temporary sandbox for testing;
- source of reusable fragments, if they can be cleaned and reframed.

The pilot should be built from the new product logic, not by stretching outdated lessons.

---

# Pilot Success Criteria

The pilot is successful if all of the following are true:

- the common base feels useful and coherent;
- the developer track feels realistic and role-relevant;
- tasks feel like real work-like practice;
- AI feedback is good enough to guide revisions;
- the builder is good enough to create these lessons without chaos;
- you can clearly see which builder or content problems actually matter next.

---

# What This Pilot Should Teach You

By the end of the pilot, you should know:

- whether the current builder is enough for real content production;
- which lesson blocks are missing or awkward;
- whether the AI feedback pattern is strong enough;
- which fields are essential in lesson creation;
- what must be improved before scaling to more roles.

This is exactly why the pilot comes now.

---

# Recommended Immediate Next Task

Create the **common-base course shell** first.

Minimum immediate deliverable:
- course title;
- 4 lesson titles;
- 1–2 sentence goal for each lesson;
- draft task idea for each lesson.

Only after that start filling the full lesson content.
