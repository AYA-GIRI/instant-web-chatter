# Course Outlines

## Purpose

This document turns the product vision, role logic, content matrix, and task library into a concrete course structure for the MVP.

Its goal is to answer:
- which courses should exist in the MVP;
- in what order users should go through them;
- which modules are common for everyone;
- where role-specific content begins;
- what type of block should be used inside each lesson;
- what a minimal but strong first version of the platform should include.

---

# 1. Core Course Logic

## MVP Learning Structure

The recommended MVP structure is:

1. **Common Base Course** for all users
2. **Role selection**
3. **One role track** chosen by the user
4. **Sequential progress** inside the selected track
5. **Optional methodology / reading materials** for deeper exploration

This means the platform should not behave like a fully open course catalog in the MVP. The main user flow should feel guided and intentional.

## Why this structure works

It solves several product problems at once:
- all users get the same baseline in AI usage;
- weak users are not overwhelmed;
- role-specific learning starts only after the foundation is built;
- the project stays within scope: AI application in work, not teaching whole professions from scratch.

---

# 2. MVP Course Set

## Required for all users

### Course 1. AI Basics for Work
A mandatory base course for every user.

Goal:
Build a common foundation before specialization.

Main outcomes:
- understand what AI can and cannot do in work;
- learn how to formulate a task clearly;
- learn iterative prompting;
- learn how to verify model output;
- understand safe and responsible usage.

---

## Role Tracks for MVP
After completing the base course, the user selects one of the following tracks:

1. AI for Developers
2. AI for Analysts
3. AI for Marketers
4. AI for Designers
5. AI for Testers

Only one track needs to be actively completed in the MVP flow. More advanced multi-track logic can be added later.

---

# 3. Common Base Course Outline

## Course: AI Basics for Work

### Course Goal
Teach every user the basic principles of useful, safe, and role-aware AI usage.

### Suggested Course Length
4 to 6 lessons.

### Recommended Module Structure

---

## Lesson 1. What AI Is Useful For in Work

### Goal
Show AI as a practical assistant, not as magic or as a replacement for thinking.

### Key ideas
- AI helps accelerate work, not eliminate responsibility;
- AI is useful for drafts, structuring, exploration, and iteration;
- the user is still responsible for quality and verification.

### Block structure
1. Markdown theory block
2. Short comprehension test
3. Mini practical reflection task

### Example practical task
The user gets 4 work scenarios and must identify where AI is useful, where it is risky, and where it is unnecessary.

---

## Lesson 2. How to Formulate a Good Prompt

### Goal
Teach the user how to formulate clear, structured, actionable prompts.

### Key ideas
- role/context/task/output format/constraints;
- avoid vague instructions;
- define the expected result.

### Block structure
1. Markdown explanation
2. Prompt comparison examples
3. Short test
4. AI-checked practice

### Example practical task
Rewrite a weak prompt into a strong prompt for a real work task.

---

## Lesson 3. How to Improve a Prompt Iteratively

### Goal
Teach the user that the first prompt is a draft and that iteration improves results.

### Key ideas
- refine after first answer;
- specify missing constraints;
- ask for alternatives;
- narrow the result format.

### Block structure
1. Markdown explanation
2. Example dialogue improvement
3. AI-checked task

### Example practical task
The user gets a task and a mediocre AI answer, then must write a follow-up prompt to improve the result.

---

## Lesson 4. How to Check AI Output

### Goal
Teach the user not to trust the model blindly.

### Key ideas
- factual errors;
- invented details;
- weak structure;
- mismatch between task and result;
- the need for human judgment.

### Block structure
1. Markdown explanation
2. Example answer analysis
3. Test
4. AI-checked practice

### Example practical task
The user is shown an AI response and must identify what is good, what is risky, and what must be checked manually.

---

## Lesson 5. Safe and Responsible AI Usage

### Goal
Teach the user the minimum safe behavior when working with AI.

### Key ideas
- avoid careless sharing of sensitive data;
- do not delegate responsibility blindly;
- understand that tools differ in privacy, reliability, and use case.

### Block structure
1. Markdown theory
2. Decision scenarios
3. Test or classification task

### Example practical task
The user reviews several examples and decides which data can be safely shared with a tool and which should not.

---

## Lesson 6. Choosing the Right Tool

### Goal
Teach users to think in terms of tool-task fit instead of using one AI for everything.

### Key ideas
- text models;
- image generation tools;
- research assistants;
- coding assistants;
- workflow automation tools.

### Block structure
1. Markdown overview
2. Comparison table
3. Matching task
4. AI-checked reasoning task

### Example practical task
Given 5 real-world tasks, the user chooses the most appropriate tool category and explains why.

---

# 4. Role Track Structure

## Shared logic for every role track

Each role track should follow the same structure for consistency.

### Recommended track pattern
1. Role-specific introduction
2. Core AI use cases for that profession
3. Prompting patterns for common tasks
4. Output verification in that role
5. Tool research and workflow building
6. Final integrative practice

This makes the whole platform predictable and easier to maintain.

---

# 5. Role Track: AI for Developers

## Track Goal
Teach developers to use AI as an assistant for coding, debugging, explaining, documenting, and structuring technical work.

## Suggested Lessons

### Lesson 1. Where AI Helps a Developer
Focus:
- code explanation;
- boilerplate drafts;
- debugging support;
- refactoring ideas;
- documentation.

Practice example:
Classify common dev tasks into “AI useful”, “AI useful with caution”, “better done manually”.

### Lesson 2. Prompting for Code Understanding
Focus:
- explain what code does;
- summarize module logic;
- identify weak points;
- request structured output.

Practice example:
Write a prompt that asks AI to explain a code fragment and highlight possible risks.

### Lesson 3. Prompting for Debugging and Refactoring
Focus:
- asking for likely causes of a bug;
- requesting step-by-step debugging suggestions;
- asking for safe refactoring directions.

Practice example:
Improve a weak debugging prompt into a strong one.

### Lesson 4. Prompting for Documentation and Communication
Focus:
- internal docs;
- README drafts;
- code comments;
- technical summaries.

Practice example:
Write a prompt for generating a first draft of documentation from a function/module description.

### Lesson 5. Verifying AI Output in Development
Focus:
- correctness;
- edge cases;
- hidden assumptions;
- unsafe code;
- invented APIs.

Practice example:
Review an AI-produced code explanation and identify what must be manually checked.

### Lesson 6. Tool Research for Developers
Focus:
- coding assistants;
- docs tools;
- terminal/workflow helpers;
- when to use which tool.

Practice example:
Given several dev scenarios, choose the best AI tool category and justify it.

### Final Task
A realistic mini-case:
The user receives a small development scenario and must:
- choose an AI use strategy;
- write one or more prompts;
- explain what they would verify manually.

---

# 6. Role Track: AI for Analysts

## Track Goal
Teach analysts to use AI for structuring requests, exploring data tasks, drafting insights, and accelerating analytical communication.

## Suggested Lessons

### Lesson 1. Where AI Helps an Analyst
Focus:
- clarifying business questions;
- structuring analysis plans;
- generating hypotheses;
- summarizing findings;
- drafting SQL/data requests.

### Lesson 2. Prompting for Analytical Framing
Practice:
Turn a vague business request into a structured prompt for an AI assistant.

### Lesson 3. Prompting for Hypotheses and Exploration
Practice:
Write prompts that help generate sensible hypotheses and analysis directions.

### Lesson 4. Prompting for SQL / Data Request Drafts
Practice:
Ask AI to propose SQL/query drafts or data request structures, while keeping human review mandatory.

### Lesson 5. Verifying AI Output in Analysis
Focus:
- weak assumptions;
- wrong logic;
- invented interpretations;
- mismatch between business question and conclusion.

### Lesson 6. Tool Research for Analysts
Practice:
Compare tool categories for research, summarization, spreadsheets, SQL support, and workflow acceleration.

### Final Task
Take a small business scenario and build an AI-assisted analysis workflow from request to verification.

---

# 7. Role Track: AI for Marketers

## Track Goal
Teach marketers to use AI for copy ideation, segmentation, campaign drafts, research support, and content workflow acceleration.

## Suggested Lessons

### Lesson 1. Where AI Helps a Marketer
Focus:
- ideas;
- message variation;
- audience framing;
- campaign drafts;
- competitive research support.

### Lesson 2. Prompting for Offers and Messaging
Practice:
Write prompts to generate several message variants for different audiences.

### Lesson 3. Prompting for Content Ideation and Planning
Practice:
Use AI to generate content ideas, post angles, campaign outlines, and content calendar suggestions.

### Lesson 4. Prompting for Research and Structuring
Practice:
Ask AI to structure a quick research task or summarize scattered inputs.

### Lesson 5. Verifying AI Output in Marketing
Focus:
- generic output;
- tone mismatch;
- wrong audience assumptions;
- weak differentiation;
- factual unreliability in research summaries.

### Lesson 6. Tool Research for Marketers
Practice:
Choose between writing assistants, research tools, image tools, and automation helpers.

### Final Task
Create an AI-assisted workflow for launching a simple campaign asset set.

---

# 8. Role Track: AI for Designers

## Track Goal
Teach designers to use AI for visual exploration, reference search, concept articulation, and workflow acceleration without replacing design judgment.

## Suggested Lessons

### Lesson 1. Where AI Helps a Designer
Focus:
- reference exploration;
- concept directions;
- moodboards;
- style articulation;
- routine acceleration.

### Lesson 2. Prompting for Visual Direction
Practice:
Write prompts for generating or describing visual concepts with clear constraints.

### Lesson 3. Prompting for References and Idea Expansion
Practice:
Use AI to expand one concept into multiple visual directions.

### Lesson 4. Prompting for Design Communication
Practice:
Formulate prompts that help generate structured briefs, rationale, and presentation support.

### Lesson 5. Verifying AI Output in Design
Focus:
- generic aesthetics;
- mismatch with brand/task;
- low usability relevance;
- weak originality;
- overreliance on style imitation.

### Lesson 6. Tool Research for Designers
Practice:
Compare image generation, visual search, moodboard, and workflow tools.

### Final Task
Create a mini AI-assisted concept workflow for a design task from brief to selected direction.

---

# 9. Role Track: AI for Testers

## Track Goal
Teach testers to use AI for generating test ideas, structuring test cases, improving bug reporting, and accelerating QA reasoning.

## Suggested Lessons

### Lesson 1. Where AI Helps a Tester
Focus:
- test case ideas;
- edge cases;
- checklist generation;
- bug report drafting;
- structuring testing strategy.

### Lesson 2. Prompting for Test Case Generation
Practice:
Write prompts that generate test cases from a requirement description.

### Lesson 3. Prompting for Edge Cases and Negative Scenarios
Practice:
Ask AI to propose risky scenarios and boundary conditions.

### Lesson 4. Prompting for Bug Reporting and QA Communication
Practice:
Use AI to structure better bug reports or summarize findings clearly.

### Lesson 5. Verifying AI Output in QA
Focus:
- missing cases;
- fake confidence;
- shallow coverage;
- irrelevant test suggestions.

### Lesson 6. Tool Research for Testers
Practice:
Compare tools for documentation, test ideation, summarization, and workflow assistance.

### Final Task
Build an AI-assisted QA workflow for a simple product feature.

---

# 10. Recommended Lesson Template

Each lesson in the MVP should follow a standard pattern.

## Minimal lesson pattern
1. **Intro markdown block**
   - what this lesson is about;
   - why it matters for the role.
2. **Concept / explanation block**
   - short theory, examples, patterns.
3. **Mini test block**
   - checks basic understanding.
4. **AI-checked practice block**
   - user writes a prompt / analyzes a response / chooses a tool / improves a weak request.
5. **Wrap-up block**
   - what the user learned;
   - what opens next.

This structure should stay simple and repeatable.

---

# 11. Recommended Difficulty Logic

## For MVP
Use only 3 internal difficulty levels:
- **Basic** — straightforward task with strong guidance
- **Applied** — realistic work-like task with moderate ambiguity
- **Integrated** — multi-step task combining several skills

This makes track progression visible without overcomplicating the system.

---

# 12. Recommended MVP Scope by Courses

## Minimum viable strong version

### Required to ship
- 1 base course
- 5 role tracks
- 4 to 6 lessons in the base course
- 4 to 6 lessons per role track
- at least 1 meaningful final task per track
- methodology materials as optional support, not as the main learning path

## Acceptable lighter MVP if time is limited
- 1 base course fully done
- 2 role tracks done well
- 3 role tracks drafted structurally
- all remaining tracks partially scaffolded

This is still much better than shipping many shallow inconsistent courses.

---

# 13. What Should Not Happen

The course structure should avoid the following:
- mixing AI-application content with full profession training;
- turning the platform into a general theory portal;
- opening too many disconnected courses at once;
- making optional methodology materials more central than practical learning;
- creating lessons without role-specific value;
- building different lesson logic for every track without need.

---

# 14. Definition of Done for a New Course

A course is ready when:
- its role and purpose are clearly defined;
- it fits the platform scope;
- its lessons follow the standard structure;
- its practice tasks map to real work scenarios;
- its AI-check logic is understandable;
- it teaches AI application, not the whole profession;
- the next step in the user flow is clear.

---

# 15. Recommended Next Documents

After this file, the most useful next artifacts are:
1. `ai-feedback-rubrics.md` — how AI should evaluate different task types
2. `course-seeds.md` — first concrete lesson texts for the MVP
3. `admin-content-workflow.md` — how admins create, review, publish, and improve content
4. `ux-improvements.md` — improvements derived from user journeys and course logic

