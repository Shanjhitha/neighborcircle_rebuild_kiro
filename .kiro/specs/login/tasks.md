# Implementation Plan: Login (MVP)

## Overview

Minimal implementation across 5 files. App.jsx manages page state; LoginPage renders branding, help toggle, and guest path; LoginForm owns form state and delegates auth; mockAuthHandler validates credentials; DashboardPage is the post-login destination.

## Tasks

- [x] 1. Create `src/auth/mockAuthHandler.js`
  - Export an async function `mockAuthHandler({ email, password })`
  - Validate against a hardcoded `MOCK_USERS` array (e.g. `user@example.com` / `password123`)
  - Simulate async delay with a short `setTimeout` wrapped in a Promise
  - Return `{ success: true }` on match, `{ success: false, error: '...' }` otherwise
  - _Requirements: 3.5, NFR 3_

- [x] 2. Create `src/components/LoginForm.jsx`
  - [x] 2.1 Build the form UI with email input, password input, and "Sign In" button
    - All labels at 18px+, inputs min-height 48px, button min 48x48px touch target
    - "Show password" toggle bound to `showPassword` state, using `aria-pressed` and `aria-label`
    - Visible focus ring on all inputs (Tailwind `focus:ring`)
    - Full keyboard navigation support (tab order, Enter to submit)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 2.2 Implement submit handler with validation and auth delegation
    - On submit: clear errors, check empty email → set `emailError`, check empty password → set `passwordError`
    - If any error: move focus to first errored field via `useRef`, return early (do not call auth handler)
    - If valid: `setIsLoading(true)`, call `mockAuthHandler`, `setIsLoading(false)`
    - On success: set `successMessage` ("You're in! Welcome back."), call `onLoginSuccess` after 1500ms
    - On failure: set `generalError` ("We couldn't find that email and password. Please try again.")
    - Clear field error on `onChange` for that field
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.6, Edge Cases 1–3_

  - [x] 2.3 Render error and success messages
    - `emailError` below email field, `passwordError` below password field — both 16px+, warm red (`text-red-600`), with a text prefix (e.g. "⚠") so color is not the only indicator
    - `generalError` at top of form
    - `successMessage` replaces general error area on success
    - Loading state: disable "Sign In" button and show a spinner or "Signing in…" label
    - _Requirements: 3.3, 3.4, Accessibility 4, Edge Case 4_

- [x] 3. Create `src/pages/LoginPage.jsx`
  - Render NeighborCircle brand name/logo at top, welcoming heading (24px+, e.g. "Welcome back. We're glad you're here.")
  - Use warm Tailwind palette (yellows, oranges, soft reds) consistent with design system
  - Render `<LoginForm onLoginSuccess={onLoginSuccess} />`
  - Below the form: "Need help signing in?" button — toggles `showHelp` state, `aria-expanded={showHelp}`
  - When `showHelp` is true: render inline friendly help message with contact info
  - Below help: "Continue without signing in" button — calls `onLoginSuccess` directly, bypassing auth
  - Help button and guest button each min 48x48px touch target
  - Plain, non-technical language throughout
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3, 4.4_

- [x] 4. Create `src/pages/DashboardPage.jsx`
  - Minimal functional component — warm welcome message (e.g. "You're in. Welcome to NeighborCircle.")
  - Use warm color palette, large readable text
  - No props required for MVP
  - _Requirements: 3.2_

- [x] 5. Update `App.jsx` to wire pages together
  - Add `const [currentPage, setCurrentPage] = useState('login')`
  - Conditionally render `<LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />` or `<DashboardPage />`
  - Keep existing `<VolunteerPage />` accessible (can remain as a separate branch or be removed for MVP focus)
  - _Requirements: 3.1, 3.2, NFR 2_

- [ ] 6. Final checkpoint
  - Ensure all 5 files are wired together and the full flow works: open app → see LoginPage → sign in with mock credentials → see success message → land on DashboardPage
  - Verify guest path bypasses auth and lands on DashboardPage
  - Verify help toggle shows/hides inline message
  - Verify empty-field and invalid-credential errors display correctly with focus management
  - Ask the user if any questions arise.

## Notes

- No test files, routing libraries, Context, or Redux — intentional MVP scope
- `onLoginSuccess` is the seam for future React Router `navigate('/dashboard')` — no other files need to change when routing is introduced
- Tasks marked with `*` are optional and can be skipped for a faster MVP
