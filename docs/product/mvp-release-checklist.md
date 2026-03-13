# mvp-release-checklist.md

# MVP Release Checklist

## Purpose

This checklist exists to answer one final practical question:

> Is the project already coherent, stable, and complete enough to be shown, demoed, submitted, or treated as a serious MVP?

This is not a feature wishlist.
It is a release-readiness checklist.

The goal is to reduce the gap between:

- a student project that “kind of works”;
- and a product-like MVP that feels intentional, understandable, and presentable.

---

## How to Use This Checklist

Use this document before:

- showing the project to a supervisor or team;
- preparing a demo;
- packaging the repo for review;
- deciding whether the platform is “ready enough”;
- planning the last implementation cycle before a presentation.

Each item should be marked as one of:

- [ ] not done
- [~] partially done
- [x] done

If an item is not relevant for the current release, explicitly mark it as:

- N/A

Do not silently ignore weak areas.

---

# 1. Product Clarity

## 1.1 Product identity

- [ ] The project can be described in one clear sentence
- [ ] The project is positioned as a platform for applying AI in a user’s specialty
- [ ] The core problem the platform solves is clearly stated
- [ ] The difference between the common base and role tracks is clear
- [ ] The project does not present itself as “teaching everything” about professions or AI

## 1.2 Scope discipline

- [ ] Core learning content matches the product definition
- [ ] Out-of-scope topics do not appear inside the main learning flow
- [ ] Optional deep reading is separated from required content
- [ ] Unclear or experimental courses are hidden, archived, or clearly labeled
- [ ] The platform feels focused rather than scattered

## 1.3 User understanding

- [ ] A first-time user can understand what the platform is for
- [ ] A first-time user can understand who the platform is for
- [ ] A first-time user can understand what to do first
- [ ] A first-time user can understand what happens after the common base
- [ ] The product story is visible from the interface, not only from documentation

---

# 2. Core User Flow

## 2.1 Entry and onboarding

- [ ] Registration or first entry works reliably
- [ ] The user can choose a role
- [ ] The selected role is stored correctly
- [ ] The role is visible in the profile or relevant UI
- [ ] The product explains why role selection matters

## 2.2 Learning sequence

- [ ] The common base is required before role tracks
- [ ] The user cannot skip required progression unintentionally
- [ ] Lessons or steps unlock in the correct order
- [ ] Locked content is clearly explained
- [ ] The user always knows the next meaningful action

## 2.3 Learner guidance

- [ ] There is a visible progress indicator
- [ ] The current course / lesson / step is understandable
- [ ] The user can tell what is completed and what is not
- [ ] The user can tell what comes next
- [ ] The platform does not leave the user guessing where to go

---

# 3. Role-Based Learning

## 3.1 Common base

- [ ] A common base course exists
- [ ] The common base covers prompt basics, iteration, verification, and safety
- [ ] The common base includes practical tasks
- [ ] The common base includes at least one task about tool research / independent discovery
- [ ] The common base feels useful for all roles

## 3.2 Role tracks

- [ ] There is at least one role-aware track for each MVP role
- [ ] Role tracks reflect real work-like situations
- [ ] Each role track focuses on AI usage in the specialty
- [ ] Each role track avoids turning into profession-from-zero education
- [ ] Each role track provides clear practical value

## 3.3 Role relevance

- [ ] Developer track feels relevant to developers
- [ ] Analyst track feels relevant to analysts
- [ ] Marketer track feels relevant to marketers
- [ ] Designer track feels relevant to designers
- [ ] Tester track feels relevant to testers

---

# 4. Content Quality

## 4.1 Lesson quality

- [ ] Lessons have a clear purpose
- [ ] Lessons explain why the topic matters
- [ ] Lessons are short enough to stay focused
- [ ] Lessons include examples
- [ ] Lessons include at least one practical action from the learner

## 4.2 Task quality

- [ ] Tasks are tied to realistic role-relevant situations
- [ ] Tasks ask the learner to do something meaningful, not just repeat theory
- [ ] Tasks have a clear answer format
- [ ] Tasks have clear success criteria
- [ ] Tasks do not require hidden assumptions to complete

## 4.3 Scope control in content

- [ ] No lesson drifts into unrelated theory
- [ ] No track tries to replace full professional education
- [ ] Optional materials are separated from core tasks
- [ ] Curiosity-driven deep content is placed in methodical materials, not forced into the main path
- [ ] Content is coherent across the platform

---

# 5. AI Feedback System

## 5.1 Consistency

- [ ] AI feedback follows one consistent response structure
- [ ] Similar task types are evaluated similarly
- [ ] AI feedback supports revision, not random commentary
- [ ] Feedback tone is constructive and understandable
- [ ] Feedback helps the user improve the next attempt

## 5.2 Evaluation quality

- [ ] The system can identify strong, acceptable, and weak answers
- [ ] Typical mistakes are handled well
- [ ] Feedback points to what is missing, not only what is wrong
- [ ] Feedback encourages better thinking, not only formatting fixes
- [ ] The evaluation logic matches the assignment type

## 5.3 Retry and iteration

- [ ] The user can revise and resubmit after feedback
- [ ] Revision flow is clearly visible
- [ ] The product treats retry as part of learning, not as failure only
- [ ] The learner can understand how to improve
- [ ] The practice loop feels iterative

---

# 6. Admin and Content Management

## 6.1 Content administration

- [ ] Admin can create courses
- [ ] Admin can create lessons or steps from blocks
- [ ] Admin can edit content safely
- [ ] Admin can hide or publish content
- [ ] Admin can manage methodical materials

## 6.2 Governance

- [ ] Content statuses exist and are usable
- [ ] Draft and published content are clearly separated
- [ ] Hidden content behaves as expected
- [ ] Archived or irrelevant content does not clutter the main flow
- [ ] The admin interface supports structured production rather than chaos

## 6.3 User administration

- [ ] Admin can view users
- [ ] Admin can manage roles
- [ ] Admin can inspect progress
- [ ] Admin can identify users who are stuck or inactive
- [ ] Admin can understand platform usage at a basic level

---

# 7. UX and Interface Quality

## 7.1 Basic clarity

- [ ] Main navigation is understandable
- [ ] Labels are aligned with the actual product logic
- [ ] Required vs optional content is visually clear
- [ ] Role-aware logic is visible in the interface
- [ ] The interface does not feel like a pile of unrelated pages

## 7.2 States and robustness

- [ ] Loading states exist where needed
- [ ] Empty states exist where needed
- [ ] Error states exist where needed
- [ ] Permission-related states are understandable
- [ ] Broken flows do not leave the user confused

## 7.3 Stability feeling

- [ ] The platform feels stable in the main happy path
- [ ] There are no obvious broken buttons in the critical flow
- [ ] The slowest pages are acceptable for demo / review
- [ ] The user is not forced into confusing loops
- [ ] The platform feels intentionally built

---

# 8. Technical Readiness

## 8.1 Local setup

- [ ] The project can be run locally from documented steps
- [ ] Required environment variables are documented
- [ ] `.env.example` exists
- [ ] Hidden setup knowledge is minimized
- [ ] Another person could realistically launch the project

## 8.2 Containerization

- [ ] Dockerfile exists
- [ ] Docker-based startup flow is documented
- [ ] Core services or dependencies are clear
- [ ] The project does not rely on fragile manual setup steps
- [ ] Local reproducibility is acceptable

## 8.3 Codebase sanity

- [ ] The codebase structure is understandable
- [ ] Main logic is not hidden in chaotic files
- [ ] Dead or legacy pieces are removed or isolated
- [ ] The main product flow is reflected in the code structure
- [ ] Changes can be made without fear of breaking everything blindly

---

# 9. Data, Progress, and Analytics

## 9.1 Learning data

- [ ] Progress is stored reliably
- [ ] Completions are tracked correctly
- [ ] Role information is stored correctly
- [ ] Task attempts are handled correctly
- [ ] Core user learning events are not silently lost

## 9.2 Admin analytics

- [ ] User count is visible
- [ ] Course completion or progress is visible
- [ ] Recent activity is visible
- [ ] Major engagement signals are available
- [ ] Analytics support decision-making, not only decoration

## 9.3 Observability

- [ ] Critical events are logged
- [ ] Obvious failures can be investigated
- [ ] AI-related failures are visible enough to debug
- [ ] Admin-side troubleshooting is possible
- [ ] The project is not blind to its own behavior

---

# 10. Documentation Readiness

## 10.1 Core documentation

- [ ] README exists and is useful
- [ ] Product purpose is documented
- [ ] User flows are documented
- [ ] Content structure is documented
- [ ] Implementation priorities are documented

## 10.2 Technical documentation

- [ ] Setup instructions exist
- [ ] Architecture is explained
- [ ] Data model or main entities are explained
- [ ] Environment configuration is documented
- [ ] Deployment / local run instructions are available

## 10.3 Operational usefulness

- [ ] A new collaborator could understand the project from the docs
- [ ] A reviewer could understand the project from the docs
- [ ] The docs reflect the real project, not an outdated vision
- [ ] The docs support continued development
- [ ] The docs reduce tribal knowledge

---

# 11. Demo / Presentation Readiness

## 11.1 Narrative readiness

- [ ] There is a clear explanation of the problem
- [ ] There is a clear explanation of the solution
- [ ] There is a clear explanation of the main user flow
- [ ] There is a clear explanation of the admin side
- [ ] The demo story can be told in a few minutes without confusion

## 11.2 Demo path

- [ ] There is a known happy path for demo
- [ ] Demo accounts or demo content are prepared if needed
- [ ] The chosen role path for the demo is ready
- [ ] Required content is not hidden by mistake
- [ ] The AI-feedback feature behaves predictably enough for demo use

## 11.3 Presentation quality

- [ ] The project can be shown without apologizing for the core idea
- [ ] The project has a coherent identity
- [ ] The project feels thought-through
- [ ] The gap between “student work” and “real product” is visibly reduced
- [ ] The demo focuses on strengths, not accidental chaos

---

# 12. Final Release Gate

You can treat the MVP as ready to show when the following are mostly true:

- [ ] The product has a clear purpose
- [ ] The user flow is coherent
- [ ] The common base and role tracks make sense
- [ ] The content is inside scope
- [ ] AI feedback is structured
- [ ] The admin flow is useful
- [ ] The project can be run and explained
- [ ] The slowest, weakest, and most confusing parts have been improved
- [ ] The project feels stable enough to demo
- [ ] You can defend the product decisions without hand-waving

---

# Recommended Readiness Interpretation

## Not ready

The project is not ready if:
- the scope is still scattered;
- the user flow is unclear;
- role logic is missing;
- the content is inconsistent;
- setup is fragile;
- demo path is unreliable.

## Presentable but still rough

The project is presentable if:
- the core story is clear;
- the main flow works;
- most weak areas are known and limited;
- there is enough structure to show real intent.

## Strong MVP

The project is a strong MVP if:
- it feels coherent end-to-end;
- it is easy to explain;
- it teaches something real and scoped;
- it supports a believable user journey;
- it can be shown as a product-like system rather than only a prototype.

---

# Final Rule

Do not ask only:

> “Does the project work?”

Ask:

> “Would another person understand what it is, how it helps, how it is used, and why it is built this way?”

If the answer is yes, the project is moving from “raw implementation” toward a real MVP.
