# AI Feedback Rubrics

## Purpose

This document defines how AI-based checking should work inside the practicum.

Its goal is to make AI feedback:
- consistent across lessons and roles;
- tied to clear evaluation criteria;
- useful for learning, not just approval / rejection;
- aligned with the product scope: teaching AI application in work, not teaching full professions from scratch.

This document sits between:
- `assignment-spec.md`;
- `task-library.md`;
- `course-outlines.md`;
- the actual implementation of AI-checked tasks in the platform.

---

# 1. Core Principle

AI checking should not behave like an exam grader that only says "correct" or "incorrect".

It should behave like a practice coach that:
1. checks whether the user covered the essential criteria;
2. highlights the strongest part of the answer;
3. points out the most important gap;
4. suggests the next improvement step;
5. avoids over-explaining or giving away the full solution immediately.

The platform is meant to train skill, not reward guessing.

---

# 2. What AI Feedback Should Evaluate

Every AI-checked response should be evaluated along one or more of these dimensions:

## 2.1 Task understanding
Did the user understand what the task is asking for?

## 2.2 Relevance to role / scenario
Is the answer connected to the actual work situation?

## 2.3 Structure and clarity
Is the response organized, specific, and actionable?

## 2.4 AI literacy
Does the user show correct understanding of how to work with AI?
Examples:
- using context;
- specifying output format;
- setting constraints;
- verifying outputs;
- choosing tools by fit.

## 2.5 Practical usefulness
Would this answer realistically help in a work task?

## 2.6 Safety and responsibility
Does the answer avoid careless use of AI, blind trust, or risky data sharing?

---

# 3. Global Feedback Rules

These rules should apply to all AI-checked tasks.

## 3.1 Start with one positive observation
The AI should first identify what the user already did well.

Good example:
> You gave the model a clear task and expected output, which is a strong start.

Why this matters:
- reduces frustration;
- makes feedback feel constructive;
- shows the user what to keep doing.

## 3.2 Focus on the biggest missing piece
Do not overwhelm the user with ten comments at once.

Good example:
> The main thing missing is context: the model knows what to do, but not for whom or under what constraints.

## 3.3 Suggest the next improvement step
Feedback should be actionable.

Good example:
> Try adding the target audience and the exact format you want in the final answer.

## 3.4 Avoid instantly providing the perfect answer
Except in cases where the lesson intentionally reveals a reference answer after several failed attempts.

The default mode should be:
- hint first;
- stronger hint second;
- reference pattern only later.

## 3.5 Keep tone supportive and specific
Avoid vague comments like:
- "This is weak"
- "Try harder"
- "This is not good enough"

Use:
- what is working;
- what is missing;
- what to improve next.

## 3.6 Do not evaluate professional depth beyond scope
If the task is about using AI in a role, the checker should not fail a user because they are not an expert in the profession itself.

Example:
A junior marketer should not be penalized for lacking advanced brand strategy theory if the task is about structuring a prompt for campaign ideas.

---

# 4. Standard Feedback Output Format

For consistency, AI feedback should use the same output structure.

## Recommended structure

### 1. Status
One of:
- **Strong**
- **Almost there**
- **Needs revision**

### 2. What is already good
1-2 short sentences.

### 3. Main gap
The single most important weakness.

### 4. Next improvement step
One concrete action.

### 5. Optional hint
A light hint without giving the whole solution.

---

## Example

**Status:** Almost there  
**What is already good:** You clearly stated the main task and asked for structured output.  
**Main gap:** The prompt does not include enough context about the user role and the situation.  
**Next improvement step:** Add who the model is helping, what the work context is, and what constraints matter.  
**Hint:** Think about audience, goal, and output format.

---

# 5. Pass Logic for MVP

For the MVP, AI checking should stay understandable.

## Suggested completion logic

A task can be marked as passed if:
- the user covers the essential required criteria for that task type;
- the answer is relevant to the scenario;
- the answer is usable enough to support real work;
- there are no major safety or logic failures.

## Important
Pass does not mean perfect.

The platform should reward sufficiently strong practical performance, not ideal textbook answers.

---

# 6. Rubric by Task Type

These are the core task types already implied by the practicum design.

---

## T1. Write a Prompt

### Goal
Train the user to formulate a clear, useful AI request for a work task.

### Essential criteria
- states the task clearly;
- includes relevant context;
- indicates the desired output or format;
- includes useful constraints if needed;
- is understandable and actionable.

### Strong answer signs
- specific role or scenario included;
- concrete expected output;
- realistic work framing;
- not overly vague;
- not overloaded with irrelevant detail.

### Common mistakes
- vague instruction;
- missing context;
- no output format;
- asking for something too broad;
- no constraints when they matter.

### Feedback focus
Usually emphasize:
- clarity;
- context;
- output format.

---

## T2. Improve a Weak Prompt

### Goal
Train the user to recognize and fix low-quality prompts.

### Essential criteria
- identifies the weakness of the original prompt;
- produces a better version;
- adds missing context, structure, or constraints;
- makes the request more practical.

### Strong answer signs
- visible improvement over original;
- better alignment with scenario;
- clearer expected result;
- more structured instruction.

### Common mistakes
- only rephrasing superficially;
- keeping the same vagueness;
- improving wording but not usefulness;
- forgetting the work context.

### Feedback focus
Usually emphasize:
- whether the prompt is truly improved;
- whether practical ambiguity was reduced.

---

## T3. Improve an AI Answer

### Goal
Teach the user to iterate instead of accepting the first answer blindly.

### Essential criteria
- identifies what is weak in the AI answer;
- proposes a next-step prompt or revision strategy;
- targets a real weakness: missing detail, weak structure, wrong audience, etc.

### Strong answer signs
- user does not just say "make it better";
- follow-up request is precise;
- asks for concrete correction or refinement.

### Common mistakes
- vague follow-up;
- no explanation of what is wrong;
- trying again without new constraints;
- trusting poor output too easily.

### Feedback focus
Usually emphasize:
- quality of diagnosis;
- precision of iteration.

---

## T4. Analyze an AI Response

### Goal
Teach critical reading of model output.

### Essential criteria
- identifies useful parts of the answer;
- identifies risks or weaknesses;
- distinguishes what should be checked manually;
- stays tied to the original task.

### Strong answer signs
- balanced analysis;
- no blind trust;
- can explain why something is risky or insufficient.

### Common mistakes
- accepts everything as correct;
- only criticizes without explaining;
- misses mismatch between task and output;
- does not mention manual verification.

### Feedback focus
Usually emphasize:
- critical thinking;
- task-result alignment;
- verification awareness.

---

## T5. Choose the Right AI Tool

### Goal
Teach tool-task fit.

### Essential criteria
- selects a suitable tool category or workflow;
- explains why it fits the task;
- acknowledges relevant constraints if needed.

### Strong answer signs
- compares options;
- explains choice using task needs;
- avoids one-tool-for-everything thinking.

### Common mistakes
- choosing tools by popularity only;
- no reasoning;
- mismatch between tool type and task;
- ignoring privacy or workflow constraints.

### Feedback focus
Usually emphasize:
- reasoning quality;
- suitability of the selected tool.

---

## T6. Break a Work Task into AI-Assisted Steps

### Goal
Teach the user to think in workflows, not isolated prompts.

### Essential criteria
- breaks task into realistic steps;
- identifies where AI helps;
- keeps human judgment where needed;
- produces a usable sequence.

### Strong answer signs
- clear order of actions;
- not everything delegated to AI;
- practical workflow awareness.

### Common mistakes
- skipping important human review;
- unclear step order;
- unrealistic automation;
- no distinction between AI work and user work.

### Feedback focus
Usually emphasize:
- workflow realism;
- human-in-the-loop thinking.

---

# 7. Role-Specific Evaluation Priorities

The same task type may need slightly different emphasis depending on the role.

---

## 7.1 Developer Track

### What to emphasize
- clarity of technical objective;
- request structure;
- constraints and expected format;
- debugging / explanation usefulness;
- realism for coding workflow.

### Typical strong signals
- asks for code explanation, refactoring ideas, or documentation in a structured way;
- specifies language / framework / expected output;
- does not blindly ask for full production-ready code without context.

### Typical mistakes
- vague coding request;
- no environment or language context;
- overtrust in generated code;
- no request for explanation or edge cases when relevant.

---

## 7.2 Analyst Track

### What to emphasize
- clarity of business question;
- structure of analysis request;
- distinction between insight, assumption, and fact;
- practical usefulness for analysis workflow.

### Typical strong signals
- clear analytical goal;
- good request for summary, SQL logic, interpretation, or reporting;
- asks for structured output.

### Typical mistakes
- vague analytics request;
- confusion between data question and business conclusion;
- missing output format;
- no verification mindset.

---

## 7.3 Marketer Track

### What to emphasize
- target audience clarity;
- message purpose;
- channel awareness;
- variation and segmentation.

### Typical strong signals
- audience is defined;
- output format is clear;
- task is tied to campaign, post, offer, or message objective.

### Typical mistakes
- generic "write a text" prompts;
- no audience;
- no tone or channel context;
- overreliance on surface-level copy.

---

## 7.4 Designer Track

### What to emphasize
- visual intent;
- style / mood / reference clarity;
- context of use;
- direction quality rather than pure aesthetics theory.

### Typical strong signals
- clear visual direction;
- constraints around brand, tone, style, or layout context;
- realistic use of AI for ideation and references.

### Typical mistakes
- vague visual request;
- no design context;
- confusing design education with AI-assisted workflow;
- no articulation of desired outcome.

---

## 7.5 Tester Track

### What to emphasize
- coverage logic;
- clarity of testing objective;
- structured scenarios;
- critical view on generated test artifacts.

### Typical strong signals
- asks for test cases, edge cases, or bug report structure with clear scope;
- keeps validation mindset;
- does not trust generated outputs blindly.

### Typical mistakes
- vague request for "tests";
- no scope or feature context;
- no distinction between happy path and edge cases;
- no manual validation step.

---

# 8. Safety Triggers

Some answers should trigger stricter feedback or automatic revision requests.

## Trigger examples
- blind trust in AI output for important decisions;
- careless handling of confidential or sensitive information;
- no verification where verification is clearly necessary;
- unrealistic delegation of full responsibility to AI.

## Suggested reaction
In such cases, the AI checker should:
- explicitly mark the issue as important;
- explain why it is risky;
- require revision before passing, if the risk is central to the lesson.

---

# 9. Difficulty Calibration

Because the MVP targets weaker users, feedback should be calibrated for early-stage learners.

## Beginner-friendly principles
- reward partial correctness;
- focus on one major improvement at a time;
- do not require advanced professional jargon;
- do not fail answers for being simple if they are useful;
- prefer "good enough to work" over "perfectly polished".

## What not to do
- do not grade like a university exam;
- do not force one ideal wording;
- do not require expertise the lesson did not teach.

---

# 10. Retry Logic

For the practicum flow, feedback should support iterative improvement.

## Suggested logic

### Attempt 1
- identify what is already good;
- point out the main missing element;
- give a light hint.

### Attempt 2
- be more explicit about the weak point;
- suggest which part to rewrite.

### Attempt 3
- give a stronger scaffold or partial template;
- optionally show the structure of a stronger answer.

### Attempt 4+
- allow pass if the answer is practically usable, even if imperfect;
- or reveal a reference-style answer if the lesson is meant for guided learning.

---

# 11. Suggested Internal Scoring Model

The user does not need to see raw scores, but an internal scoring model can help implementation.

## Example lightweight rubric

Each task can be scored on 0-2 for each criterion:
- clarity;
- context;
- structure;
- role relevance;
- practical usefulness;
- safety / verification awareness.

### Score meaning
- **0** = missing or seriously weak
- **1** = partially present
- **2** = clearly present and useful

### Suggested pass threshold
Pass when:
- there are no critical failures;
- the answer is practically usable;
- most essential criteria are at least partially covered.

---

# 12. Feedback Authoring Template

This template can be used when defining AI checker prompts for each task.

## Template

**Task type:**  
**Role:**  
**What the user is supposed to practice:**  
**Required criteria:**  
**Common mistakes:**  
**What counts as pass:**  
**What requires revision:**  
**Feedback style constraints:** supportive, specific, non-judgmental, one key improvement at a time.

---

# 13. Definition of Done for a New AI-Checked Task

A task is ready for implementation only if:
- its task type is defined;
- required criteria are listed;
- common mistakes are listed;
- pass logic is clear;
- feedback tone is defined;
- safety triggers are considered;
- a reference answer or answer pattern exists.

If these are not defined, the AI checker will likely feel random.

---

# 14. Final Principle

The platform should make users feel:
- guided;
- corrected without being punished;
- pushed to improve;
- able to understand why the answer is weak or strong.

Good AI feedback is not only about evaluation.
It is part of the learning experience itself.
