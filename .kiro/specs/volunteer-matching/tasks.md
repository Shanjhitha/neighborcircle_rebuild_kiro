# Implementation Plan: Volunteer Matching — MVP

## Overview

Build the Volunteer page as a single React page. A two-button toggle at the top controls what appears in the content area below it. "Request a Volunteer" is active by default and shows volunteer cards. "I Want to Volunteer" swaps the content area to show a single-page guided signup form. No router. No multi-step wizard. No separate routes.

## Tasks

- [x] 1. Set up data files
  - Create `data/mockVolunteers.js` — export an array of at least 6 mock volunteer objects, each with: `id`, `name`, `firstName`, `photo`, `city`, `supportTypes` (array), `availabilityStatus` (boolean), `personalNote`
  - Create `data/activityOptions.js` — export `ACTIVITY_OPTIONS` array (friendly phone calls, in-person visits, tech help, grocery help, errands, appointment support, reading together, walking together, community events, something else)
  - Create `data/availabilityOptions.js` — export `AVAILABILITY_DAYS`, `AVAILABILITY_TIMES`, `AVAILABILITY_FREQ`
  - Create `data/communicationOptions.js` — export `COMMUNICATION_OPTIONS`

- [x] 2. Build `components/PathwayToggle.jsx`
  - Render exactly two large buttons: "Request a Volunteer" and "I Want to Volunteer"
  - Accept props: `activePathway` (`"support" | "volunteer"`), `onPathwayChange`
  - Active button has a filled warm background (Tailwind: `bg-orange-400` or similar) and `aria-pressed="true"`
  - Inactive button has a warm outlined style
  - Both buttons meet 44×44px minimum touch target
  - Keyboard accessible (Tab + Enter/Space)
  - Warm, large text (min 18px)

- [x] 3. Build `components/VolunteerFilterPanel.jsx`
  - Accept props: `activeFilter` (string or null), `onFilterChange`
  - Render one large button per support type (max 4: "Friendly Chat", "Grocery Help", "Tech Help", "Errands") plus a "Show All" reset button
  - Only one filter active at a time; clicking the active filter clears it
  - Active filter button visually distinct (not color-only — also bold or underlined)
  - Buttons meet 44×44px minimum touch target

- [x] 4. Build `components/VolunteerCard.jsx`
  - Accept props: `volunteer`, `onSelect`
  - Display: profile photo, name, city, availability status (always a text label — "Available" or "Not Available Right Now"), support types as small tags
  - Entire card is clickable and keyboard-focusable (Enter to activate)
  - Warm card style with large readable text (min 18px)
  - Availability shown as text label — never color alone

- [x] 5. Build `components/VolunteerList.jsx`
  - Accept props: `volunteers`, `activeFilter`, `onFilterChange`, `onSelectVolunteer`
  - Render warm page heading: "Meet Your Neighbors — People Who Care"
  - Render a short Emotional Anchor phrase below the heading (e.g. "You don't have to do this alone — we're here with you")
  - Render `VolunteerFilterPanel` above the cards
  - Filter `volunteers` by `activeFilter`; cap display at 6 cards; render `VolunteerCard` for each
  - If filter returns no results: show warm message "No one available for this right now — please check back soon"
  - If volunteer list is empty: show warm message "Our neighbors are busy right now — please check back soon. You matter to us"

- [x] 6. Build `components/VolunteerSignupForm.jsx`
  - A single scrollable form section — not a multi-step wizard
  - Warm heading: "We're so glad you want to help"
  - Fields (in order, each with a warm conversational prompt):
    - Name: "What would you like us to call you?" — text input (required)
    - Photo: optional file input placed directly below the name field; helper text: "A picture is welcome, but not required."; store as local state (`photo: File | null`); show a small preview if a file is selected; clearly labeled, no pressure copy
    - City: "What town or city are you in?" — text input (required)
    - Activities: "What kinds of things do you enjoy helping with?" — checkbox group using `ACTIVITY_OPTIONS` (at least one required); "Something else" reveals a short text input
    - Availability days: "When are you usually free?" — single-select large buttons using `AVAILABILITY_DAYS`
    - Times of day — single-select large buttons using `AVAILABILITY_TIMES`
    - Communication preference: "How do you prefer to stay in touch?" — checkbox group using `COMMUNICATION_OPTIONS`
    - Personal note: "Is there anything you'd like your neighbors to know about you?" — optional textarea
  - Local state for all field values and a simple `errors` object
  - Validate only on submit: name and city required, at least one activity required
  - Gentle inline error messages (e.g. "Just let us know your name — anything you're comfortable with")
  - "Send My Details" primary submit button (large, warm, 44×44px min)
  - "Cancel" secondary link — no confirmation dialog, returns to volunteer list
  - On valid submit: call `onSubmit(formData)` — parent handles adding to list and showing success message
  - All inputs use warm placeholder text; all touch targets ≥ 44×44px; min 18px font

- [x] 7. Build `pages/VolunteerPage.jsx` and wire everything together
  - State: `activePathway` (default `"support"`), `contentView` (default `"browse"`), `activeFilter` (default `null`), `volunteers` (seeded from `mockVolunteers`), `selectedVolunteer` (null), `signupSuccess` (false)
  - Always render `PathwayToggle` at the top
  - Render content area below based on `contentView`:
    - `"browse"` → `VolunteerList`
    - `"signup"` → `VolunteerSignupForm`
    - `"success"` → inline warm success message: "You're officially a Neighbor Helper, [firstName]! Thank you for signing up — your neighbors are lucky to have you." with a "Back to Volunteers" button
  - `handlePathwayChange`: "support" → `contentView = "browse"`, clear filter; "volunteer" → `contentView = "signup"`, clear filter
  - `handleSignupSubmit(formData)`: construct new volunteer object, append to `volunteers`, set `contentView = "success"`
  - `handleCancelSignup`: set `activePathway = "support"`, `contentView = "browse"`
  - `handleFilterChange`: update `activeFilter`
  - Page opens with "Request a Volunteer" active and volunteer cards visible
