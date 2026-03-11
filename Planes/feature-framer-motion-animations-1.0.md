---
goal: Implement Framer Motion Animations Across Index and Auth Pages
version: 1.0
date_created: 2026-03-11
last_updated: 2026-03-11
owner: AI Assistant
status: 'Completed'
tags: ['feature', 'design', 'frontend', 'animation']
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-brightgreen)

This implementation plan details the addition of Framer Motion animations to the application, specifically targeting the index page, authentication/registration modals, and user profile. It includes scroll animations, SVG icon animations, text typing animations, and a cohesive gradient noise background for the auth modal that aligns with the project's brand colors.

## 1. Requirements & Constraints

- **REQ-001**: Animate the entire content of the index page.
- **REQ-002**: Animate the appearance of the registration/login modal.
- **REQ-003**: Animate the user profile component.
- **REQ-004**: Update the right panel of the registration modal to use a green gradient with noise, homogenized with the project's general green (not neon electric green).
- **REQ-005**: Implement appearance/disappearance animations for content triggered by scrolling.
- **REQ-006**: Identify and animate SVG icons.
- **REQ-007**: Implement typing text animations for placeholders/text inside registration and login inputs.
- **CON-001**: Must use `framer-motion` for all animations.
- **GUD-001**: Follow Framer Motion Animator skill best practices (use springs, GPU-accelerated properties, layout, AnimatePresence for exits, maintain accessibility with useReducedMotion, etc.).

## 2. Implementation Steps

### Implementation Phase 1: Setup & Global Components

- GOAL-001: Set up generic Framer Motion wrapper components for reuse across the application (scroll animations, typing animations).

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | Create `AnimatedContainer` component for reusable entrance/scroll animations using `useInView`. | ✅ | 2026-03-11 |
| TASK-002 | Create a `TypingAnimation` component using `framer-motion` to stagger character appearance for input placeholders or labels. | ✅ | 2026-03-11 |
| TASK-003 | Create an `AnimatedIcon` wrapper for orchestrating SVG path drawing or scaling on hover/mount. | ✅ | 2026-03-11 |

### Implementation Phase 2: Registration & Login Modals

- GOAL-002: Redesign and animate the authentication modals and their inputs.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-004 | Update the Auth Modal component to use `AnimatePresence` for mount/unmount and `motion.div` for a smooth spring-based appearance animation. | ✅ | 2026-03-11 |
| TASK-005 | Update the right panel of the registration modal to a CSS gradient background with noise (using a pseudo-element or SVG filter) with the project's standard green shade. | ✅ | 2026-03-11 |
| TASK-006 | Integrate `TypingAnimation` into the inputs of the registration and login forms. | ✅ | 2026-03-11 |

### Implementation Phase 3: Index Page Animations

- GOAL-003: Animate the content on the home (index) page based on scroll position.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-007 | Wrap index page sections (Hero, Objectives, Profiles, Areas, etc.) with `AnimatedContainer` to trigger fade-in/slide-up animations on scroll. | ✅ | 2026-03-11 |
| TASK-008 | Identify SVG icons on the index page and replace or wrap them with `AnimatedIcon` variants. | ✅ | 2026-03-11 |
| TASK-009 | Add stagger effects for lists or grid items on the index page to create fluid sequential appearances. | ✅ | 2026-03-11 |

### Implementation Phase 4: User Profile Animation

- GOAL-004: Add entrance and interaction animations to the User Profile view.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-010 | Wrap the User Profile component in a `motion.div` for initial load animation. | ✅ | 2026-03-11 |
| TASK-011 | Add hover animations (using `whileHover` and `whileTap`) to interactive elements within the user profile (buttons, tabs, avatar). | ✅ | 2026-03-11 |

## 3. Alternatives

- **ALT-001**: Using CSS animations or Tailwind `animate-` utilities. Rejected because Framer Motion provides more robust orchestration (stagger, spring physics, layout animations) and state-based transitions out-of-the-box.
- **ALT-002**: Pure React Spring. Rejected as the requirements explicitly requested `framer-motion`.

## 4. Dependencies

- **DEP-001**: `framer-motion` library needs to be installed (already present or to be added to `package.json`).
- **DEP-002**: Custom CSS for the noise gradient might require creating a small SVG noise asset or using a CSS trick (e.g., repeating linear gradients with noise filters).

## 5. Files

- **FILE-001**: `app/components/ClientAuthMenu.tsx` (or related modal container) - to wrap with `AnimatePresence`.
- **FILE-002**: `app/page.tsx` (Index) - to add scroll animations.
- **FILE-003**: `app/components/AnimatedContainer.tsx` - new reusable component.
- **FILE-004**: `app/components/TypingAnimation.tsx` - new reusable component.
- **FILE-005**: Auth Form / Input components - for typing effects and modal styling changes.

## 6. Testing

- **TEST-001**: Verify modal opens and closes with smooth spring animations without jumpiness.
- **TEST-002**: Verify index page elements correctly trigger animations only when scrolled into view.
- **TEST-003**: Verify SVG icons animate predictably without clipping.
- **TEST-004**: Test with 'Reduce Motion' OS setting enabled to ensure accessibility compliance via `useReducedMotion`.

## 7. Risks & Assumptions

- **RISK-001**: Heavy use of scroll animations might impact performance on lower-end devices if not careful with GPU-accelerated properties.
- **ASSUMPTION-001**: The project structure follows standard Next.js app router conventions.
