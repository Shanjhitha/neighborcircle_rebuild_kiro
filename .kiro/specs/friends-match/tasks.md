# Friends Match — Implementation Tasks

- [x] 1. Create mock data file
- [x] 2. Scaffold FriendsPage with constants and local state
- [x] 3. Wire AppLayout friends case
- [x] 4. Implement PageIntro and ViewToggle
- [x] 5. Implement FilterSortBar
- [x] 6. Implement ProfileCard and suggested list
- [x] 7. Implement outgoing hello state changes
- [x] 8. Implement IncomingCard and incoming list
- [x] 9. Implement empty states
- [x] 10. Final accessibility and visual polish

---

## Task 1 — Create mock data file

File: `neighborcircle/src/data/mockFriendsData.js`

- Export `INTEREST_POOL` — array of 12 strings: `'Gardening'`, `'Reading'`, `'Walking'`, `'Cooking'`, `'Music'`, `'Crafts'`, `'Birdwatching'`, `'Puzzles'`, `'Travel memories'`, `'Family stories'`, `'Faith & spirituality'`, `'Card games'`

- Export `MOCK_PROFILES` — 8–10 profile objects. Each must include:
  - `id` (unique string, e.g. `'f1'`)
  - `name`, `age` (65–85), `location` (city string), `locationGroup` (`'same'` | `'nearby'` | `'other'`)
  - `gender` — set must include at least `'Woman'`, `'Man'`, and one other value
  - `interests` — 3–5 items from `INTEREST_POOL`; overlapping across profiles so filters visibly change results
  - `bio` — warm, first-person, 2–3 sentences
  - `connectPref` — one of `'Phone call'`, `'Walking together'`, `'Tea or a chat'`, `'Book club'`, `'Community events'`, or `null` on at least 1 profile
  - `matchReason` — 1–2 sentences, human-written, non-algorithmic tone
  - `addedOrder` — sequential integer 1–10
  - `avatarType: 'initials'` on all profiles
  - Distribution: at least 3 profiles `locationGroup: 'same'`, 2–3 `'nearby'`, 1–2 `'other'`
  - At least one profile shares 3+ interests with `MY_INTERESTS = ['Gardening', 'Reading', 'Walking', 'Cooking']`
  - At least one profile shares 0–1 interests with `MY_INTERESTS`
  - Mark one profile with comment `// pre-seeded: outgoing hello pending` — this `id` must match `PRE_SEEDED_OUTGOING_ID` in `FriendsPage.jsx`

- Export `MOCK_INCOMING` — 2–3 incoming request objects. Each must include:
  - `id` (unique string, e.g. `'inc1'`)
  - `fromProfile` — standalone profile object (not from `MOCK_PROFILES`) with: `id`, `name`, `age`, `location`, `gender`, `interests`, `bio`, `connectPref`, `avatarType: 'initials'`
  - `status: 'pending'`
  - Mix of genders and interests across senders

Acceptance: file exports `INTEREST_POOL`, `MOCK_PROFILES`, `MOCK_INCOMING` with correct shapes, no duplicate IDs, all required fields present on every object.

---

## Task 2 — Scaffold FriendsPage with constants and local state

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Create file with default export `FriendsPage({ user })`
- Import `useState` from React
- Import `MOCK_PROFILES`, `MOCK_INCOMING`, `INTEREST_POOL` from `../data/mockFriendsData`
- Near the top of the file (before the component), define:
  - `const PRE_SEEDED_OUTGOING_ID = 'f3';` — named constant, must match the ID marked in mock data. Do not hardcode the ID string inside `useState`.
  - `const MY_INTERESTS = ['Gardening', 'Reading', 'Walking', 'Cooking'];`
  - `const LOCATION_RANK = { same: 0, nearby: 1, other: 2 };`
- Define `countCommon(profile)` helper near those constants: `profile.interests.filter(i => MY_INTERESTS.includes(i)).length`
- Add all state inside `FriendsPage`:
  - `view` — `useState('suggested')`
  - `filterLocation` — `useState('')`
  - `filterGender` — `useState('')`
  - `filterInterests` — `useState([])`
  - `sortBy` — `useState('common')`
  - `outgoing` — `useState({ [PRE_SEEDED_OUTGOING_ID]: 'pending' })` — uses the named constant
  - `incoming` — `useState(MOCK_INCOMING)`
- Add all handler functions inside `FriendsPage`:
  - `handleSendHello(profileId)` — adds key to `outgoing` with value `'pending'`
  - `handleCancelHello(profileId)` — deletes key from `outgoing` (no `'cancelled'` value stored; absence = default state)
  - `handleAccept(requestId)` — sets `status: 'accepted'` on matching incoming entry
  - `handleDecline(requestId)` — sets `status: 'declined'` on matching incoming entry
- Add derived values (computed on every render, not stored in state):
  - `filteredProfiles` — applies location, gender, interest filters to `MOCK_PROFILES`
  - `sortedProfiles` — sorts `filteredProfiles` using `LOCATION_RANK` for location sort (not string sort)
  - `pendingIncomingCount` — count of incoming entries with `status === 'pending'`
- Return a `<div className="w-full space-y-5">` placeholder for now

Acceptance: file renders without errors, all state initialises correctly, `PRE_SEEDED_OUTGOING_ID` is a named constant not an inline string, no console errors.

---

## Task 3 — Wire AppLayout friends case

File: `neighborcircle/src/components/AppLayout.jsx`

- Add import at top: `import FriendsPage from '../pages/FriendsPage';`
- In `renderContent()`, replace the `case 'friends'` PlaceholderPage with:
  ```jsx
  case 'friends': return <FriendsPage user={user} />;
  ```
- No other changes to AppLayout

Acceptance: navigating to Friends Match from the sidebar renders `FriendsPage` without errors. No other pages affected.

---

## Task 4 — Implement PageIntro and ViewToggle

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Add `PageIntro` inline sub-component (no props):
  - `<h1 className="text-2xl font-bold text-amber-700">Find a Friend</h1>`
  - Subtext: `"Take your time and browse. There is no rush — just a few neighbors who might enjoy getting to know you."` — `text-base text-gray-600`
  - Optional reassurance line (if it fits without crowding): `"Everyone here is a neighbor, just like you."` — `text-sm text-gray-400 italic`. Keep it short; omit if it makes the intro feel heavy.
  - Wrapper: `<div className="space-y-1">`

- Add `ViewToggle` inline sub-component (props: `view`, `setView`, `pendingIncomingCount`):
  - Wrapper: `<div className="flex gap-3" role="tablist">`
  - Two buttons: "Suggested Friends" and "Hellos Received"
  - "Hellos Received" label: append ` (${pendingIncomingCount})` only when `pendingIncomingCount > 0` — never show `(0)`
  - Active tab: `bg-amber-600 text-white`
  - Inactive tab: `bg-white border border-amber-400 text-amber-700 hover:bg-amber-50`
  - Each button: `role="tab"`, `aria-selected={view === tabId}`, `tabIndex={view === tabId ? 0 : -1}`, `minHeight: 48px`, `focus:outline-none focus:ring-2 focus:ring-amber-400`

- Render `PageIntro` then `ViewToggle` inside the page wrapper

Acceptance: both components render, tab switching updates `view`, active tab is highlighted, badge appears only when pending count > 0.

---

## Task 5 — Implement FilterSortBar

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Add `FilterSortBar` inline sub-component (props: all four filter/sort values + their setters):
  - Wrapper: `<div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">`
  - Location row: visually rendered `<label htmlFor="filter-location" className="text-base font-medium text-gray-700">Near</label>` + `<select id="filter-location">` with options: `All locations` (`''`), `Same city` (`'same'`), `Nearby` (`'nearby'`). `minHeight: 48px`
  - Gender row: `<label htmlFor="filter-gender" className="text-base font-medium text-gray-700">Gender</label>` + `<select id="filter-gender">` with options: `Any` (`''`), `Woman`, `Man`, `Non-binary`, `Prefer not to say`. `minHeight: 48px`
  - Interests row: `<label id="interests-label" className="text-base font-medium text-gray-700">Interests</label>` + pill container `<div className="flex flex-wrap gap-2" aria-labelledby="interests-label">`:
    - One pill button per item in `INTEREST_POOL`
    - Toggled: `bg-amber-500 text-white`; untoggled: `bg-white border border-amber-300 text-amber-700`
    - `aria-pressed={filterInterests.includes(interest)}`
    - Click: add to or remove from `filterInterests` array
    - `minHeight: 40px` per pill, `px-3 py-1 rounded-full text-sm`
    - Pills wrap naturally — do not truncate or hide any chips. Wrapping with `gap-2` keeps the area spacious without crowding.
    - Do not add more filter categories in MVP
  - Sort row: `<label htmlFor="sort-by" className="text-base font-medium text-gray-700">Sort by</label>` + `<select id="sort-by">` with options: `Most in common` (`'common'`), `Closest location` (`'location'`), `Newest` (`'newest'`). `minHeight: 48px`
  - Clear filters button: `<button className="text-sm text-amber-700 underline focus:outline-none focus:ring-2 focus:ring-amber-400 rounded">Clear filters</button>` — resets all four values to defaults (`''`, `''`, `[]`, `'common'`)
  - All `<select>`: `text-base rounded-lg border border-gray-200 px-3 py-2 w-full`

- Render `FilterSortBar` only when `view === 'suggested'`

Acceptance: all controls render and update state, interest pills toggle with correct `aria-pressed`, clear button resets everything, filter changes immediately update `sortedProfiles`, no controls are crowded or clipped.

---

## Task 6 — Implement ProfileCard and suggested list

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Add initials helper function near the top of the file:
  ```js
  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  ```

- Add `ProfileCard` inline sub-component (props: `profile`, `outgoingStatus`, `onSend`, `onCancel`):
  - Wrapper: `<article aria-label={profile.name} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3 transition-shadow duration-200 hover:shadow-md">`
  - Avatar: `<div className="w-14 h-14 rounded-full bg-amber-200 text-amber-800 font-bold text-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">{getInitials(profile.name)}</div>`
  - Header: name `text-xl font-semibold text-gray-900`, age + location `text-base text-gray-500`, gender `text-sm text-gray-400`
  - Interests: `flex flex-wrap gap-2` — each `<span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full">`
  - Connect preference (only if `profile.connectPref !== null`): `<p className="text-sm text-amber-600">💬 Prefers: {profile.connectPref}</p>`
  - Bio: `<p className="text-base text-gray-700 italic leading-relaxed">`
  - Match reason: `<p className="text-base text-amber-800">🤝 {profile.matchReason}</p>`
  - Action area: render "Say Hello" button only when `outgoingStatus` is undefined (pending state handled in Task 7):
    - `<button onClick={() => onSend(profile.id)} aria-label={`Say hello to ${profile.name}`} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400" style={{ minHeight: '48px' }}>Say Hello</button>`

- Add `ProfileList` inline sub-component (props: `sortedProfiles`, `outgoing`, `onSend`, `onCancel`):
  - Renders `<ul className="grid grid-cols-1 md:grid-cols-2 gap-5">`
  - Maps `sortedProfiles` in order — no additional sorting or filtering inside this component
  - Each item: `<li key={profile.id}><ProfileCard profile={profile} outgoingStatus={outgoing[profile.id]} onSend={onSend} onCancel={onCancel} /></li>`

- Add `SuggestedCount` display:
  - `<p className="text-sm text-gray-500">{count} suggested {count === 1 ? 'friend' : 'friends'}</p>`
  - Only rendered when `sortedProfiles.length > 0`

- Render order when `view === 'suggested'`: `FilterSortBar` → `SuggestedCount` (if profiles exist) → `ProfileList`

Acceptance: profiles render in two-column grid on medium screens, sorted order is preserved exactly, initials are correct, connect preference hidden when null, count label is accurate.

---

## Task 7 — Implement outgoing hello state changes

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Update `ProfileCard` action area to handle pending state:
  - When `outgoingStatus === 'pending'`, replace the "Say Hello" button entirely with:
    ```jsx
    <div className="space-y-2">
      <div className="w-full bg-amber-100 border border-amber-400 text-amber-700 font-medium text-base rounded-xl px-4 py-3 text-center">
        Hello sent
        <span className="block text-sm font-normal text-amber-600 mt-0.5">Waiting for a reply</span>
      </div>
      <button
        onClick={() => onCancel(profile.id)}
        aria-label={`Take back hello sent to ${profile.name}`}
        className="w-full text-sm text-gray-500 underline text-center focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
        style={{ minHeight: '40px' }}>
        Take Back Hello
      </button>
    </div>
    ```
  - "Say Hello" must not appear anywhere when `outgoingStatus === 'pending'` — the pending block replaces it completely
  - The pre-seeded profile (ID from `PRE_SEEDED_OUTGOING_ID`) must show pending state on first render without any user interaction
  - Clicking "Say Hello" calls `onSend(profile.id)` — card immediately shows pending state
  - Clicking "Take Back Hello" calls `onCancel(profile.id)` — card immediately returns to default state

Acceptance: pre-seeded profile shows pending on load, "Say Hello" immediately switches to pending state, "Take Back Hello" immediately returns to default, "Say Hello" is never visible while pending.

---

## Task 8 — Implement IncomingCard and incoming list

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Add `IncomingCard` inline sub-component (props: `request`, `onAccept`, `onDecline`):
  - Destructure `name` from `request.fromProfile.name`
  - Wrapper: `<article aria-label={`Hello from ${name}`} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3">`
  - Same avatar (using `getInitials`) + header + interests + bio layout as `ProfileCard` — no match reason, no connect preference
  - Action area region — always rendered in the same position to keep card layout stable after interaction:
    - `status === 'pending'`:
      - Warm intro line: `<p className="text-base text-gray-600">{name} would like to get to know you.</p>`
      - Two side-by-side buttons in `<div className="flex gap-3">`:
        - "Accept Hello": `flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400`, `aria-label={`Accept hello from ${name}`}`, `minHeight: 48px`
        - "Not right now": `flex-1 bg-white border border-gray-300 text-gray-600 font-medium text-base rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300`, `aria-label={`Decline hello from ${name}`}`, `minHeight: 48px`
    - `status === 'accepted'`: `<p className="text-green-700 font-semibold text-base">You are now friends 🌻</p>` — card stays visible
    - `status === 'declined'`: `<p className="text-gray-500 italic text-base">You have gently passed on this one.</p>` — card stays visible. Do not use the word "declined" in visible copy.

- Add `IncomingList` inline sub-component (props: `incoming`, `onAccept`, `onDecline`):
  - Renders `<ul className="space-y-4">`
  - Each item: `<li key={request.id}><IncomingCard .../></li>`
  - Renders all entries regardless of status — accepted and declined cards remain visible for demo

- Render `IncomingList` when `view === 'incoming'` and `incoming.length > 0`

Acceptance: incoming cards render, "Accept Hello" immediately shows "You are now friends 🌻" with buttons removed, "Not right now" immediately shows soft declined message with buttons removed, cards remain in list after action, `pendingIncomingCount` badge decrements correctly, no "declined" word visible in UI.

---

## Task 9 — Implement empty states

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Add `EmptyState` inline sub-component (suggested view):
  - Shown when `view === 'suggested'` and `sortedProfiles.length === 0`
  - Copy: `"No new suggestions just yet. Try changing a preference."`
  - `<div className="bg-amber-50 rounded-2xl p-8 text-center"><p className="text-gray-500 text-base italic">...</p></div>`

- Add `IncomingEmptyState` inline sub-component:
  - Shown when `view === 'incoming'` and `incoming.length === 0` only
  - If all incoming items are accepted or softly passed but still present in the array, do not show empty state — `IncomingList` handles that
  - Copy: `"No one has said hello yet, but new connections may appear soon."`
  - Same styling as `EmptyState`

- Wire both into the page render:
  - Suggested view: render `EmptyState` instead of `SuggestedCount` + `ProfileList` when `sortedProfiles.length === 0`
  - Incoming view: render `IncomingEmptyState` instead of `IncomingList` only when `incoming.length === 0`

Acceptance: filtering to zero results shows warm empty state, switching to incoming view with no requests shows warm empty state, incoming view with all-resolved requests still shows the cards (not empty state), both use specified copy exactly.

---

## Task 10 — Final accessibility and visual polish

File: `neighborcircle/src/pages/FriendsPage.jsx`

- Verify all action buttons have `aria-label` values that include the person's name
- Verify `ViewToggle` uses `role="tab"`, `aria-selected`, and `tabIndex={0|-1}`
- Verify interest filter pills use `aria-pressed` and the pill container uses `aria-labelledby`
- Verify all `<select>` elements have visually rendered `<label>` with `htmlFor` (not sr-only)
- Verify avatar circles use `aria-hidden="true"`
- Verify all interactive elements have `focus:outline-none focus:ring-2 focus:ring-amber-400`
- Verify all action buttons meet `minHeight: 48px`; filter pills meet `minHeight: 40px`
- Verify card hover uses only `transition-shadow duration-200 hover:shadow-md` — no scale, no bounce
- Verify button transitions use `transition-colors duration-200`
- Verify avatar initials badges are consistent across `ProfileCard` and `IncomingCard`
- Verify no visible copy uses "declined", "denied", "no results", "match" as a noun, or any harsh/technical wording
- Verify `SuggestedCount` uses singular/plural correctly
- Verify `pendingIncomingCount` badge never shows `(0)`
- Verify no duplicate `key` props in any list rendering (`ProfileList`, `IncomingList`)
- Verify buttons that change state (send, cancel, accept, decline) retain visible focus ring after state change — focus must not disappear
- Run `getDiagnostics` on `FriendsPage.jsx`, `mockFriendsData.js`, and `AppLayout.jsx`

Acceptance: no diagnostic errors, all states render correctly, visual style matches the rest of the authenticated NeighborCircle layout, all accessibility attributes present and correct, no duplicate keys, focus rings visible after state changes.
