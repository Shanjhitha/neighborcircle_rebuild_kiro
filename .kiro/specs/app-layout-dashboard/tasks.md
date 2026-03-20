# Implementation Plan: AppLayout and DashboardPage (MVP)

## Overview

4 files, 4 tasks, in implementation order. App.jsx is updated first so the shell exists before the pages are built into it.

## Tasks

- [ ] 1. Update `src/App.jsx`
  - Add `user` mock state: `{ firstName: 'Margaret', lastName: 'Thompson' }`
  - Keep `currentPage` state (already exists, default `'login'`)
  - When `currentPage === 'login'`: render `<LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />` — unchanged
  - When `currentPage !== 'login'`: render `<AppLayout currentPage={currentPage} onNavigate={setCurrentPage} onSignOut={() => setCurrentPage('login')} user={user} />`
  - Import AppLayout from `./components/AppLayout`
  - Remove the old `<DashboardPage />` direct render
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.7_

- [ ] 2. Create `src/components/AppLayout.jsx`
  - [ ] 2.1 Layout shell
    - Two-column layout: fixed-width left sidebar (`w-64`) + `flex-1` scrollable main area
    - Full viewport height (`min-h-screen`), warm amber/orange palette (`bg-amber-800` sidebar, `bg-amber-50` main)
    - _Requirements: 1.1, 12.1_
  - [ ] 2.2 Sidebar
    - NeighborCircle brand name at top (bold, white or amber-100)
    - Nav links from `NAV_LINKS` array: Dashboard, Community Forum, Friends Match, Volunteer Match, Profile
    - Active link highlighted (e.g. `bg-amber-600` when `currentPage` matches)
    - Each link min 48px height, keyboard focusable with `focus:ring`
    - Tech support contact info at the bottom (phone + email, small text)
    - _Requirements: 1.2, 1.3, 1.4, 1.11, 1.12_
  - [ ] 2.3 ProfileBadge and DropdownMenu
    - Top-right amber circle showing `user.firstName[0] + user.lastName[0]` initials (uppercase)
    - Min 48×48px, keyboard focusable
    - `dropdownOpen` useState controls visibility
    - Dropdown items: Profile → `onNavigate('profile')`, Settings → `onNavigate('settings')`, Help → `onNavigate('help')`, Sign Out → `onSignOut()`
    - Close on outside click via `useEffect` + `useRef` mousedown listener
    - `aria-expanded={dropdownOpen}` on badge button
    - _Requirements: 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.13_
  - [ ] 2.4 Content slot + StaticPanel
    - Render `<DashboardPage user={user} onNavigate={onNavigate} />` when `currentPage === 'dashboard'`
    - Render `<PlaceholderPage title="..." />` for community / friends / volunteer / profile
    - Render inline `StaticPanel` for settings / help (heading + "coming soon" message, no separate file)
    - _Requirements: 1.4, 2.1, 2.2, 2.3_

- [ ] 3. Create `src/pages/PlaceholderPage.jsx`
  - Accept `title` prop
  - Centered card: title as `h1` (text-2xl+), friendly "coming soon" message
  - Warm amber palette, large readable text, high contrast
  - _Requirements: 2.1, 2.2, 12.2, 12.3_

- [ ] 4. Create `src/pages/DashboardPage.jsx` (replaces placeholder)
  - Accept `user` and `onNavigate` props
  - Declare all state: `selectedMood`, `supportStep`, `journalText`, `medications`, `newMedInput`, `medError`, `checkedInToday`, `todayKey`
  - [ ] 4.1 WelcomeCard (inline)
    - "Welcome, [firstName]! This is your Dashboard." — text-xl+
    - ProfileBadge (initials) on the right side of the card
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ] 4.2 CheckInNudgeCard (inline)
    - Shown only when `!checkedInToday`
    - Friendly nudge message encouraging daily check-in
    - _Requirements: 4.1, 4.2, 4.3_
  - [ ] 4.3 DateTimeCard (inline)
    - `now` state + `useEffect` setInterval every 1000ms
    - Display full date (e.g. "Monday, 14 July 2025") and live time
    - Clear interval on unmount
    - _Requirements: 5.1, 5.2, 5.3_
  - [ ] 4.4 WeatherCard (inline)
    - Static mock data: condition, temperature, location
    - Weather emoji, "Sample data" label so user is not misled
    - _Requirements: 6.1, 6.2, 6.3_
  - [ ] 4.5 CheckInCard (inline) — full supportStep flow
    - 5 mood buttons (emoji + label): Great, Good, Okay, Low, Very Low — min 48px height
    - On select: set `selectedMood`, set `checkedInToday(true)`, show supportive message
    - Mood 4 or 5: show SupportPrompt (Community Forum, Friends Match, Volunteer Match, Maybe Later)
    - Mood 5 additionally: show CrisisPrompt (Talk to family, Talk to a friend, Talk to someone you trust, Professional support, Maybe later)
    - "Professional support" → `supportStep = 'professional'` → show Phone / Video / Chat buttons
    - Any contact mode → `supportStep = 'confirmed'` → show "A professional will be with you shortly."
    - "Maybe Later" → `supportStep = 'none'`
    - SupportPrompt nav buttons call `onNavigate(page)`
    - Allow mood re-selection (clicking a new mood resets supportStep)
    - _Requirements: 7.1–7.13_
  - [ ] 4.6 JournalCard (inline)
    - Controlled textarea, `journalText` state
    - "My Weekly Journal" heading, min 4 lines height
    - Accessible label via `<label>` or `aria-label`
    - _Requirements: 9.1–9.5_
  - [ ] 4.7 MedicationReminderCard (inline)
    - List of `medications` strings, each with a Remove button (min 48px)
    - Text input + Add button (min 48px), accessible label on input
    - Empty/whitespace input → show `medError` message, do not add
    - Valid input → append to list, clear input, clear error
    - _Requirements: 10.1–10.8_
  - [ ] 4.8 TodaysReminderCard (inline)
    - "Today's Reminder" heading
    - Static reminder message for MVP
    - _Requirements: 11.1–11.3_
  - [ ] 4.9 Layout
    - Responsive card grid: single column on small screens, 2-column on md+
    - All cards: white bg, rounded corners, soft shadow, amber accent headings
    - Base font size 16px+, card headings 20px+, high contrast text
    - _Requirements: 12.2, 12.3, 12.4, 12.5, 12.8_

- [ ] 5. Final checkpoint
  - Full flow: Login → Dashboard with AppLayout shell visible
  - Sidebar nav switches between Dashboard, Community Forum, Friends Match, Volunteer Match, Profile
  - ProfileBadge dropdown opens/closes, Sign Out returns to Login
  - Settings and Help show StaticPanel placeholders
  - All 8 dashboard cards render correctly
  - CheckInCard full flow: mood select → supportive message → SupportPrompt (moods 4-5) → CrisisPrompt (mood 5) → ProfessionalSupportPanel → confirmation
  - Medication add/remove works with validation
  - DateTimeCard live clock ticking
  - LoginPage has no sidebar or AppLayout visible

## Notes

- No weekly mood tracking (WeeklyMoodTracker / FollowUpPrompt) — Phase 2
- No real weather API — static mock only
- No activity notifications — Phase 2
- No React Router — currentPage useState pattern continues
- `onLoginSuccess` in LoginPage is unchanged — still calls `setCurrentPage('dashboard')`
