# Friends Match — Requirements

## Feature Summary

Friends Match is a companionship discovery feature inside NeighborCircle. It helps older adults find people they may enjoy talking with, based on shared interests, location, and personal comfort. The experience is warm, low-pressure, and emotionally safe. It must never feel like a dating app or a cold algorithmic feed.

---

## Problem Being Solved

Many older adults experience social isolation and loneliness, especially after major life transitions such as retirement, bereavement, or moving to a new area. They may want to make new friends but feel uncertain about how to start. Friends Match provides a gentle, guided way to discover people who share their interests and values — without pressure, urgency, or social-media-style mechanics.

---

## Matching Purpose

The matching system is not algorithmic in this MVP. Suggested friends are curated mock profiles that feel realistic and relatable. The purpose is to give users a comfortable browsing experience where they can take their time, read about potential friends, and decide at their own pace whether to reach out.

---

## User Goals

1. Browse a list of suggested friend profiles that feel warm and human
2. Understand why a suggested person might be a good fit
3. Filter or sort suggestions to find people who feel most relevant
4. Send a hello to someone they feel comfortable with
5. Cancel a sent hello if they change their mind
6. View hellos they have received from others
7. Accept or gently decline incoming hellos without pressure
8. See the current status of all their hellos clearly

---

## Requirements

### REQ-1: Suggested Friend Profiles
The page must display a list of suggested friend profiles using mock data. The section heading must use warm language such as "People You May Enjoy Talking With" or "Suggested Friends" — not "Matches" or "Results".

### REQ-2: Profile Card Content
Each profile card must include:
- Full name
- Age
- Location (city or neighborhood)
- Gender
- A list of shared interests (at least 3)
- A short friendly bio written in warm, first-person language
- A "why you might get along" note — a brief, human-written reason for the connection
- Preferred way to connect (optional field) — one of: phone call, walking together, tea or a chat, book club, community events

The preferred connect field makes cards feel more personal and helps users imagine a real first interaction.

### REQ-3: Realistic Mock Profiles
Mock profiles must feel realistic and senior-appropriate. Names, ages (65–85), interests, and bios should reflect the lives and personalities of older adults. Profiles must be diverse in background, interest, gender, and location.

### REQ-4: Filtering
Users must be able to filter suggested profiles by:
- Location — using simple, senior-friendly choices: "Same city", "Nearby", "Any location". No precise distance calculations in MVP.
- Gender — "Any", "Woman", "Man", "Non-binary", "Prefer not to say"
- Interests — simple chip or checkbox selection from a shared interest pool

Filter controls must be lightweight and easy to use. Avoid dense multi-select behavior. Interest chips are acceptable as simple toggles.

### REQ-5: Sorting
Users must be able to sort suggested profiles by:
- Most interests in common (default)
- Closest location — based on mock location grouping only, no real geographic distance logic in MVP
- Newest addition

### REQ-6: Filter and Sort Controls
Filter and sort controls must be simple, readable, and easy to use. Large touch targets, clear labels, plain language. No tiny dropdowns. No multi-step filter flows. A "Clear filters" option must always be available.

### REQ-7: Outgoing Request — Send
From any profile card, the user must be able to send a hello. The button label must be "Say Hello". Avoid longer variants like "Send a Friendly Hello" — keep button text short and readable.

### REQ-8: Outgoing Request — Pending State
After sending a hello, the card must immediately update to show a pending state without requiring a page refresh. The pending state must use short, warm text:
- Primary: "Hello sent"
- Subtext: "Waiting for a reply"

The card must not become crowded. The pending state must not allow a duplicate hello to be sent.

### REQ-9: Outgoing Request — Cancel
From the pending state, the user must be able to cancel their sent hello. The cancel action must use gentle language: "Take Back Hello". After cancellation, the card must immediately return to its default state. Cancellation must not feel like rejection or a negative action.

### REQ-10: Incoming Requests View
The page must include a clearly labeled section or sub-tab within the Friends Match page itself where the user can view hellos they have received. This must not be a separate page. A simple tab or section toggle is sufficient.

### REQ-11: Incoming Request — Accept
For each incoming hello, the user must be able to accept it. After accepting, the action buttons must be removed and replaced with a warm success message (e.g. "You are now friends 🌻"). The update must happen immediately in local state.

### REQ-12: Incoming Request — Decline
For each incoming hello, the user must be able to decline it. The decline action must use gentle, non-punitive language (e.g. "Not right now"). After declining, the buttons must be replaced with a soft message (e.g. "You have gently passed on this one."). The declined state must not be visually dominant or harsh.

### REQ-13: Request States
All request states must be clearly represented and immediately reflected in the UI without requiring a page refresh:
- Default — no hello sent or received
- Pending outgoing — hello sent, awaiting reply
- Pending incoming — someone said hello to you
- Accepted — now friends; action buttons removed, warm success message shown
- Declined — gently passed; soft message shown, not visually dominant
- Cancelled — user withdrew their own hello; card returns to default

### REQ-14: Mock Data for Requests
Mock data must include enough pre-seeded state to demonstrate all request states in the demo without requiring the user to manually trigger every flow. This includes:
- At least one profile in default state
- At least one profile with a pending outgoing hello
- At least one profile with an accepted connection
- At least one profile with a cancelled hello (returns to default)
- At least 2–3 incoming hellos (mix of pending, accepted, declined)
- A mix of genders, cities, and interests across profiles to make filtering meaningful

### REQ-15: Language and Tone
All copy — labels, button text, status messages, empty states — must use warm, friendly, non-technical language. Avoid: "match", "algorithm", "notification", "request denied", "no results", "declined" in visible UI copy. Prefer: "suggested friends", "people you may enjoy talking with", "say hello", "waiting for a reply", "not yet connected". Internal state variables may use technical names (e.g. `status: 'declined'`) but visible copy must always be soft.

### REQ-16: Empty States
Warm copy must be shown for all empty states:
- No suggested friends after filtering: "No new suggestions just yet. Try changing a preference."
- No incoming hellos: "No one has said hello yet, but new connections may appear soon."

### REQ-17: Accessibility
All interactive elements must:
- Be keyboard navigable
- Have clear, descriptive aria-labels that include the person's name
- Use minimum 48px touch targets
- Maintain high contrast text
- Provide clear, immediate feedback after every action

### REQ-18: Visual Style
The page must use the same warm amber/orange palette used across the authenticated layout. No separate color identity. Large readable fonts (16px+ body, 20px+ headings). Spacious layout. Hover and motion guidance:
- Slight card lift on hover (shadow increase)
- Smooth button transitions (`transition-colors duration-200`)
- No fast motion, no scale transforms, no flashy effects
- All transitions must feel calm and unhurried

### REQ-19: Immediate State Updates
All request state changes — sending a hello, cancelling, accepting, declining — must be reflected immediately in the UI through local state updates. No page refresh required. No loading states needed in MVP.

### REQ-20: Avatar Placeholders
All profile cards must display a consistent avatar placeholder. Since no photo uploads exist in MVP, every card must show an initials badge — a circle with the person's initials, using the amber palette. The avatar style must be consistent across suggested friend cards and incoming hello cards.

---

## Expected User Experience

A user opens Friends Match and sees a warm heading and a short reassuring description of what this page is for. Below it, they see simple filter controls and a list of suggested friend cards. Each card feels like a gentle introduction — an initials avatar, a name, a few interests, a preferred way to connect, and a short note about why they might get along.

The user reads through the cards at their own pace. When they feel comfortable, they click "Say Hello" on one card. The button immediately changes to "Hello sent" with a subtext "Waiting for a reply." They can take it back if they change their mind.

They switch to the "Hellos Received" tab and see that someone has already said hello to them. They can accept or gently decline. If they accept, the card immediately updates: "You are now friends 🌻."

Everything feels calm, human, and unhurried.

---

## Success Criteria

- [ ] Suggested friend profiles render correctly with all required fields including optional connect preference
- [ ] Filter controls update the visible profile list correctly and immediately
- [ ] Sort controls reorder the profile list correctly
- [ ] Sending a hello immediately updates the card to pending state ("Hello sent" / "Waiting for a reply")
- [ ] Cancelling a hello immediately returns the card to default state
- [ ] Incoming hellos section is accessible within the Friends Match page via tab or section toggle
- [ ] Accepting an incoming hello immediately shows warm accepted state, buttons removed
- [ ] Declining an incoming hello immediately shows soft declined message, buttons removed
- [ ] All request states are visually distinct, clearly labeled, and use warm language
- [ ] Declined and cancelled states are not visually dominant
- [ ] Empty states render correctly with specified warm copy
- [ ] All interactive elements meet 48px minimum touch target
- [ ] All buttons have descriptive aria-labels including the person's name
- [ ] Avatar initials badges are consistent across all card types
- [ ] Language throughout is warm, friendly, and senior-appropriate — no harsh or technical wording visible
- [ ] Visual style matches the rest of the authenticated NeighborCircle layout
- [ ] No errors in console on any interaction

---

## Out of Scope (Phase 2)

- Real backend or database persistence
- Real-time notifications
- Messaging between accepted friends
- Profile photo uploads
- User-editable interest preferences
- Group friend connections
- Real geographic distance calculations
