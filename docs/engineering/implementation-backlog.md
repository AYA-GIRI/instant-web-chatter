# implementation-backlog.md

# Implementation Backlog

## Purpose

This document converts the product framework into a practical implementation backlog.

It exists to answer one main question:

> What should be built, changed, cleaned up, or formalized next in the product and codebase?

This backlog is not a random feature list.
It is a prioritized implementation plan based on:

- the product definition;
- the user journeys;
- the content matrix;
- the course and assignment framework;
- the current technical state of the project.

The goal is to reduce chaos and move from:

> “we can keep coding anything”

to:

> “we know exactly what to implement next and why”.

---

## Backlog Principles

### Principle 1 — Product coherence first

Any implementation that makes the platform more coherent is more important than decorative features.

Examples:

- role selection is more important than visual polish;
- consistent course flow is more important than adding extra pages;
- content governance is more important than adding more random courses.

---

### Principle 2 — MVP means usable, not huge

The MVP should be:

- understandable;
- stable;
- sequential;
- role-aware;
- easy to run locally;
- easy to explain.

The MVP should **not** try to be:

- a giant education platform;
- a full profession-from-zero school;
- a feature-heavy LMS clone.

---

### Principle 3 — Build what supports the core loop

The core learning loop is:

1. user enters the platform;
2. user understands what the platform is for;
3. user selects their role;
4. user completes the common base;
5. user enters the role track;
6. user studies a block;
7. user completes a task;
8. AI gives structured feedback;
9. user improves their answer;
10. user progresses.

Any implementation that strengthens this loop is high priority.

---

### Principle 4 — Infrastructure matters

This project should feel close to a real product.
That means:

- reproducible local setup;
- clean env structure;
- consistent data model;
- basic observability;
- stable AI evaluation behavior;
- documented structure.

---

## Target MVP State

The platform is MVP-ready when all of the following are true:

- the user clearly understands what the platform does;
- the platform teaches AI application in a specialty, not unrelated topics;
- every user goes through a required common base;
- each user can enter a relevant role track;
- lessons unlock sequentially;
- tasks are checked with consistent AI feedback logic;
- admins can manage courses, lessons, materials, and visibility;
- admins can view basic progress and activity signals;
- the project is documented and runnable locally with minimal friction;
- the UX feels coherent and stable.

---

## Workstreams

The backlog is divided into six workstreams:

1. Product and UX
2. Content System and Admin
3. AI Feedback and Evaluation
4. Data and Analytics
5. Technical Foundation and DevOps
6. Documentation and Delivery

---

# P0 — Must Do First

These are the highest-priority implementation items.
Without them, the project will remain fragmented or fragile.

---

## P0.1 — Introduce explicit role selection in the product flow

### Why it matters
The platform is role-oriented by design, but the role logic must be visible and explicit in the product flow.

### What to implement
- role selection step after registration or first login;
- save selected role in user profile;
- allow admin override of role;
- expose role in profile and admin view;
- route the user into the correct track logic.

### Outcome
The platform stops feeling generic and starts feeling specialized.

### Done when
- a new user selects a role;
- that role is stored;
- the UI reflects the role;
- the next course suggestions depend on the role.

**Current status (codebase):** реализовано —
- поле `profiles.specialty_role` добавлено в схему Supabase и типы;
- после первой аутентификации пользователи без `specialty_role` проходят явный шаг выбора роли (`/role`);
- профиль и админка позволяют просматривать и изменять профессиональную роль;
- страница `/practicum` показывает блок «Ваша профессиональная роль» и мягкие рекомендации курсов по роли.

---

## P0.2 — Enforce the common base as a required first course

### Why it matters
All users need the same foundation before entering role-specific tracks.

### What to implement
- mark the common base as required;
- prevent role-track access until common base is complete;
- show clear locked/unlocked states;
- show explanation of why the common base comes first.

### Outcome
The learning flow becomes structured and predictable.

### Done when
- users cannot start role tracks before finishing the common base;
- the UI clearly explains progression.

**Current status (codebase):** реализовано —
- в `practicum_courses` добавлен флаг `is_common_base` и индекс, гарантирующий единственный опубликованный базовый курс;
- хук `useCommonBaseStatus` вычисляет наличие и завершённость базового курса по данным `user_progress`;
- `/practicum` визуально выделяет базовый курс и блокирует ролевые треки до его завершения;
- страницы курса и урока практикума перенаправляют пользователя на базовый курс при попытке открыть ролевой до завершения базы.

---

## P0.3 — Clean course scope and content taxonomy

### Why it matters
The project loses coherence when unrelated or overly broad courses sit alongside core AI-in-work tracks.

### What to implement
- introduce course categories:
  - common base
  - role track
  - optional reading
  - archived / hidden
- review current courses and reclassify them;
- move out-of-scope items away from the main path;
- define visibility and publication status more clearly.

### Outcome
The course catalog becomes understandable.

### Done when
- every course has a category;
- the main user flow shows only in-scope learning paths;
- optional/deep content does not interfere with the core path.

**Current status (codebase):** частично реализовано в минимальном виде для MVP —
- в `practicum_courses` добавлено поле `course_category` (`common_base` / `role_track` / `optional` / `NULL`) и CHECK‑ограничение, связывающее его с `is_common_base`;
- страница `/practicum` группирует курсы по категориям в отдельные секции («Общий базовый модуль», «Ролевые треки», «Опциональные модули»), сохраняя существующий gating по базе и soft‑рекомендации по роли;
- в конструкторе практикумов админ может явно задать тип курса, а в списке курсов категории отображаются бейджами.

Оставшаяся часть P0.3 (переразметка контента и вынос out‑of‑scope курсов) остаётся продуктовой задачей и будет решаться на уровне контента и admin‑операций.

---

## P0.4 — Standardize lesson structure inside the builder

### Why it matters
If lessons are built inconsistently, content quality will drift and AI feedback will become harder to maintain.

### What to implement
- define a recommended internal lesson schema:
  - intro / why it matters
  - short explanation
  - example
  - task
  - feedback
  - takeaway
- reflect this structure in the admin builder workflow;
- add optional field hints or internal guidance for content creators.

### Outcome
Course production becomes more repeatable.

### Done when
- admins can build lessons in a consistent pattern;
- new lessons naturally follow the same content architecture.

---

## P0.5 — Add content status lifecycle

### Why it matters
Content should not jump directly from idea to visible published material.

### What to implement
Introduce statuses such as:
- draft
- review
- published
- hidden
- archived

Apply this to:
- courses
- lessons
- materials
- maybe tasks if supported cleanly

### Outcome
Content governance becomes safer and more professional.

### Done when
- admins can see content status;
- unpublished content is separated from published content;
- hidden and archived content behave differently.

---

## P0.6 — Make AI task feedback structured and consistent

### Why it matters
AI feedback is a central product feature.
If it feels inconsistent, the platform loses trust.

### What to implement
- standard response structure for AI evaluation:
  - short verdict
  - what is good
  - what is missing
  - how to improve
  - next attempt guidance
- map task types to feedback rubric types;
- ensure tasks do not use totally different evaluation styles unless intentional.

### Outcome
Users receive more reliable, understandable feedback.

### Done when
- tasks of the same type receive feedback in the same style;
- feedback supports revision rather than random commentary.

---

## P0.7 — Add retry and revision flow in practice tasks

### Why it matters
The value of AI feedback is not just evaluation, but guided improvement.

### What to implement
- explicit retry state;
- save attempt history if possible;
- show “revise and resubmit” logic;
- optionally show progress from previous attempt.

### Outcome
Practice becomes iterative instead of one-shot.

### Done when
- a user can clearly revise after feedback;
- the system treats second attempt as part of the learning flow.

---

## P0.8 — Improve progress visibility for the learner

### Why it matters
Sequential learning feels better when users see where they are.

### What to implement
- course progress indicator;
- lesson completion states;
- locked vs unlocked step states;
- current role track visibility;
- “what comes next” section.

### Outcome
Users feel guided rather than lost.

### Done when
- users can see where they are in the common base and in their role track;
- the next recommended action is obvious.

---

## P0.9 — Improve admin visibility into user progress

### Why it matters
The admin side should support both administration and learning analytics.

### What to implement
- progress per user;
- progress per course;
- recent activity;
- stuck users / incomplete users;
- maybe simple counts of attempts and completions.

### Outcome
The admin panel becomes useful beyond static management.

### Done when
- admin can identify course completion and user engagement at a glance.

---

## P0.10 — Create a clean Docker-based local setup

### Why it matters
A real-feeling product should be easy to run and share.

### What to implement
- Dockerfile;
- docker-compose if needed;
- environment variable strategy;
- startup instructions;
- clear handling of Supabase-related dependencies.

### Outcome
The project becomes easier to reproduce and demo.

### Done when
- another person can run the project locally using documented steps;
- setup does not depend on hidden tribal knowledge.

---

## P0.11 — Clean environment configuration and secrets handling

### Why it matters
Messy environment configuration creates friction and risk.

### What to implement
- `.env.example`
- grouped env variables by purpose;
- remove ambiguous or unused envs;
- document required values;
- keep secrets out of the repo.

### Outcome
The project becomes safer and easier to set up.

### Done when
- local setup can be understood from docs;
- missing env variables are easy to identify.

---

## P0.12 — Add basic error states and empty states across the UX

### Why it matters
A platform feels unfinished when every edge case leads to confusion.

### What to implement
- loading states;
- empty states;
- permission-denied states;
- no-content states;
- AI-check-failed states;
- broken-file or unavailable-material states.

### Outcome
The platform feels much more robust.

### Done when
- major pages behave gracefully under non-happy-path conditions.

---

## P0.13 — Improve performance on the slowest pages

### Why it matters
Slow, unoptimized pages undermine trust in the product.

### What to implement
- identify slow views;
- reduce unnecessary fetches;
- cache where reasonable;
- optimize large data loads in admin views;
- improve rendering of course and content pages.

### Outcome
The project feels more professional.

### Done when
- the slowest critical user and admin pages are noticeably improved;
- obvious avoidable inefficiencies are removed.

---

## P0.14 — Add internal logging for critical learning events

### Why it matters
You need to understand how users move through the platform.

### What to implement
Track events such as:
- role selected
- course started
- lesson started
- task submitted
- task passed
- task revised
- course completed

### Outcome
The platform becomes measurable.

### Done when
- critical flow events are recorded consistently.

---

## P0.15 — Update navigation and copy to reflect the real product

### Why it matters
The platform must present itself as a role-aware AI learning product, not a vague “site with materials”.

### What to implement
- homepage copy aligned with the product definition;
- practical role-aware wording;
- clearer labels for common base, role track, optional materials;
- explain why some content is required first.

### Outcome
The product story becomes clearer.

### Done when
- the user can understand the platform’s purpose from the UI itself.

---

# P1 — Strong Improvements After Core Stabilization

These are highly valuable but should follow P0.

---

## P1.1 — Add role-aware recommended content blocks

Show recommended next lessons, methods, or examples based on role and progress.

---

## P1.2 — Add methodical materials as optional deep reading

Separate core practice from optional theory and reference reading.

---

## P1.3 — Build examples library for good and bad prompts

Useful for both learning and admin-side course creation.

---

## P1.4 — Add tool discovery blocks per role

Support the skill of finding relevant AI tools independently.

---

## P1.5 — Add lightweight attempt analytics for tasks

See which tasks are too easy, too hard, or poorly designed.

---

## P1.6 — Add richer admin filters and search

Useful once content and users grow.

---

## P1.7 — Add content duplication / templating in the builder

Useful for faster content production once the structure stabilizes.

---

## P1.8 — Add role-switch handling UX

Clarify what happens if a user changes role after starting a track.

---

## P1.9 — Add course completion summaries

Help users understand what they learned and what to do next.

---

## P1.10 — Add prompt example banks per module

Good for both learning and AI feedback calibration.

---

# P2 — Later / Optional Improvements

These are valuable but not needed for the first coherent MVP.

---

## P2.1 — Initial skill diagnostics

Could later recommend a starting path or adapt depth.

---

## P2.2 — Personalization beyond role

Could consider experience level, performance, interests, or repeated mistakes.

---

## P2.3 — Advanced analytics dashboards

Detailed charts, funnels, and content performance monitoring.

---

## P2.4 — Multiple feedback modes

For example: strict mode, coaching mode, concise mode.

---

## P2.5 — Cross-role mini projects

Useful after the core tracks become stable.

---

## P2.6 — A/B testing for lesson and task wording

Only useful once the product is already stable enough.

---

## P2.7 — Advanced permissions and editor roles

Useful if the content team grows.

---

# Suggested Immediate Build Order

If choosing what to implement in the next real development cycle, use this order:

1. role selection flow
2. common base gating
3. course taxonomy cleanup
4. lesson structure standardization
5. AI feedback standardization
6. retry / revise flow
7. learner progress visibility
8. admin progress visibility
9. Docker and env cleanup
10. performance cleanup
11. event logging
12. homepage and navigation copy update

This sequence gives the best balance of:
- product coherence;
- usability;
- implementation value;
- demo readiness.

---

# What Not to Build Right Now

Do not prioritize these yet:

- over-detailed visual polish;
- too many extra roles;
- deep academic theory modules;
- advanced personalization;
- complex gamification;
- overcomplicated analytics;
- large optional content branches;
- features with unclear relation to the main learning loop.

---

# Suggested Sprint Framing

## Sprint 1 — Product coherence

Focus:
- role selection
- common base gating
- course taxonomy
- copy and navigation alignment

---

## Sprint 2 — Practice system quality

Focus:
- lesson structure
- AI feedback standardization
- retry / revise flow
- learner progress visibility

---

## Sprint 3 — Admin and operations

Focus:
- admin progress analytics
- content lifecycle statuses
- logging
- builder improvements

---

## Sprint 4 — Technical packaging

Focus:
- Docker
- env cleanup
- docs
- performance fixes
- stability polish

---

# Definition of Done for an Implementation Task

A backlog item is done when:

- the problem it solves is visible and real;
- the implementation matches the product direction;
- the UX behavior is clear;
- edge cases are handled;
- the change is documented if needed;
- it does not introduce scope drift;
- it makes the platform more coherent, stable, or usable.

---

# Final Rule

When choosing what to implement next, ask:

1. Does it strengthen the core learning flow?
2. Does it make the platform more coherent?
3. Does it reduce confusion or fragility?
4. Does it help the user or admin complete a real job?
5. Would this matter in a real product review?

If the answer is mostly “no”, it is probably not the next thing to build.
