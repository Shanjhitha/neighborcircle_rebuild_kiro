# NeighborCircle

## 🌟 Project Overview

NeighborCircle is a senior-friendly social platform designed to reduce social isolation by helping older adults connect with their community in a simple, accessible, and emotionally supportive way.

Many existing platforms are not designed for seniors. They often include small text, complex navigation, and overwhelming interfaces. NeighborCircle addresses this gap by prioritizing clarity, readability, and human-centered design from the ground up.

### Target Users
- Older adults experiencing social isolation  
- Community volunteers  
- Caregivers and local support networks  

### Solution Summary
- A simple, accessible platform for social connection  
- Designed with large typography and minimal complexity  
- Focused on meaningful interactions rather than feature overload  

### Key Features
- Dashboard with daily reminders and updates  
- Community forum for interaction  
- Friend matching based on shared interests  
- Volunteer support matching  
- Accessibility-first UI (large text, clean layouts)  

---

## 🛠 Tech Stack

- React  
- TailwindCSS  
- Vite  
- JavaScript  

---

## 🚀 Setup Instructions

```bash
git clone https://github.com/Shanjhitha/neighborcircle_rebuild_kiro
cd neighborcircle
npm install
npm run dev
```
---
### 🏗️ Architecture & Design Decisions

NeighborCircle is built as a frontend MVP using a component-based architecture. The focus was on speed of development, modularity, and user experience.

## Project Structure

components/ → reusable UI components

pages/ → main views (Dashboard, Community, Friends, Volunteer, Profile)

data/ → static configuration (interests, availability)

.kiro/ → specs, hooks, and steering documents

## Design Decisions

Card-based layouts instead of long vertical forms

Full-width layout to reduce empty space

Large typography for accessibility

Minimal navigation complexity

## Technology Choices

React → modular, scalable UI

TailwindCSS → rapid and consistent styling

Vite → fast development environment

## Trade-offs

Simplicity prioritized over full backend functionality

UI/UX focus over feature completeness

No persistent data (state-based MVP)

No authentication system implemented

## Security Considerations

No sensitive data stored in the current version

Future plans include authentication, secure APIs, and session management

## Scalability Considerations

Backend integration using REST APIs

Database for user profiles and matching

Modular architecture supports easy feature expansion

Potential deployment and scaling using AWS

---
### 🤖 Kiro Usage

Kiro was used as the primary development assistant to accelerate UI development and improve consistency. The workflow combined vibe coding, spec-driven development, steering documents, and agent hooks.

## Vibe Coding

Used natural language prompts to design and refine UI

Improved layouts, typography, and accessibility

Enabled rapid iteration without manual CSS tuning

## Spec-Driven Development

Structured features inside .kiro/specs/

Used requirements, design, and task files to guide implementation

Provided clarity and organization for feature development

## Steering Documents

Defined global design rules (typography, layout, colors)

Ensured consistency across all pages

Reduced repeated prompting

## Agent Hooks

Applied consistent UI updates across components

Automated repetitive adjustments (spacing, typography, styling)

Improved development efficiency
---
### Kiro Usage Scenario

The Volunteer page initially existed as a long vertical form with small text and poor spacing, making it difficult to navigate and visually overwhelming.

A prompt was used to redesign the experience:
“Convert this into a portfolio-style card layout with large readable text and reduce empty space.”

As a result:

The layout was transformed into a grid-based card structure

- Typography was increased significantly

- Spacing and alignment were improved

This change reduced cognitive load, improved accessibility, and made the interface more engaging and user-friendly.
---
### Kiro Performance Notes

Kiro significantly improved development speed and UI quality. It enabled rapid iteration and reduced the need for manual styling.

However, some limitations were observed:

- Execution time displayed did not always match actual processing time

- Some tasks stopped mid-execution

- Prompts occasionally needed to be re-run multiple times

Despite these issues, Kiro remained highly effective and played a critical role in the development process.

----
### 📂 Kiro Directory Requirement

The .kiro directory is included at the root of this project

It contains specs, steering documents, and configuration files

---
### 📚 Learning & Future Work 
## Challenges

- Designing for accessibility while maintaining usability

- Avoiding overly complex UI

- Balancing speed with thoughtful design

## Skills Gained

- AI-assisted development workflows

- Accessibility-focused UI design

- Frontend architecture and component structuring

## Future Enhancements

- Backend integration for persistent user data

- Matching algorithms for improved recommendations

- Real-time communication features

- AI-based engagement suggestions

- Deployment and scaling using AWS

----
### Demo Video
https://www.youtube.com/watch?v=b8cQvzWVEyE
It is Unlisted