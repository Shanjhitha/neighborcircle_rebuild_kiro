# Friends Match — Technical Design

## Overview

Friends Match is a single-page React component (`FriendsPage.jsx`) rendered inside `AppLayout` when `currentPage === 'friends'`. All state is local (`useState`). All data comes from `mockFriendsData.js`. No routing, no backend, no context.

---

## File Structure

```
neighborcircle/src/
  pages/
    FriendsPage.jsx          ← page component + all inline sub-components
  data/
    mockFriendsData.js       ← mock profiles and incoming request objects
```

All sub-components live inline inside `FriendsPage.jsx`, matching the pattern used by `DashboardPage` and `CommunityPage`. No separate component files for this feature.

---

## Data Shape

### Profile

```js
{
  id: string,                   // unique, e.g. 'f1'
  name: string,                 // full name
  age: number,                  // 65–85
  location: string,             // one of: 'Springfield', 'Maplewood', 'Riverside', 'Oakdale'
  locationGroup: string,        // 'same' | 'nearby' | 'other' — used for location filter + sort
  gender: string,               // 'Woman' | 'Man' | 'Non-binary' | 'Prefer not to say'
  interests: string[],          // 3–5 items from INTEREST_POOL
  bio: string,                  // warm first-person, 2–3 sentences
  connectPref: string | null,   // 'Phone call' | 'Walking together' | 'Tea or a chat' | 'Book club' | 'Community events' | null
  matchReason: string,          // 1–2 sentences, human-written, non-algorithmic tone
  addedOrder: number,           // integer for "Newest" sort
  avatarType: string,           // 'initials' | 'photo' — MVP always uses 'initials'; field kept for Phase 2
}
```

### Incoming Request Object (in mock data)

```js
{
  id: string,           // unique, e.g. 'inc1'
  fromProfile: {        // standalone sender — not from MOCK_PROFILES
    id: string,
    name: string,
    age: number,
    location: string,
    gender: string,
    interests: string[],
    bio: string,
    connectPref: string | null,
    avatarType: string,
  },
  status: 'pending',    // always 'pending' in mock data; live status managed in state
}
```

### Request State (managed in component state, not in mock data)

```js
// outgoing: Record<profileId, 'pending'>
// Cancelled hellos simply remove the key — no 'cancelled' value stored.
// Incoming state is an array; accepted/declined cards remain visible in the incoming view.

// outgoing: Record<profileId, 'pending'>
// incoming: Array<{ id, fromProfile, status: 'pending' | 'accepted' | 'declined' }>
```

Outgoing state is a plain object keyed by profile ID. A key present means a hello is pending; key absent means no hello sent (covers both default and cancelled). Incoming state is an array — accepted and declined entries remain in the list so the demo shows all states.

---

## Mock Data File — `mockFriendsData.js`

### `MOCK_PROFILES` — 8–10 profiles

Requirements:
- Ages 65–85, diverse names, at least 3 distinct `location` values
- Genders: at least `Woman`, `Man`, one other value
- Interests drawn from `INTEREST_POOL` (3–5 per profile, overlapping for filter coherence)
- `connectPref` present on most profiles, `null` on at least 1
- `locationGroup` values: at least 3 profiles `'same'`, 2–3 `'nearby'`, 1–2 `'other'`
- `addedOrder` values: sequential integers 1–10
- `avatarType: 'initials'` on all profiles in MVP
- At least one profile shares 3+ interests with `MY_INTERESTS` (high overlap for sort demo)
- At least one profile shares 0–1 interests with `MY_INTERESTS` (low overlap for contrast)
- One profile marked with comment `// pre-seeded: outgoing hello pending` — this ID is used in `FriendsPage` initial `outgoing` state

### `MOCK_INCOMING` — 2–3 incoming request objects

- Senders are standalone profiles (not from `MOCK_PROFILES`)
- All start with `status: 'pending'`
- Mix of genders and interests
- `avatarType: 'initials'` on all

### `INTEREST_POOL` constant (exported for use in `FriendsPage`)

```js
export const INTEREST_POOL = [
  'Gardening', 'Reading', 'Walking', 'Cooking', 'Music',
  'Crafts', 'Birdwatching', 'Puzzles', 'Travel memories',
  'Family stories', 'Faith & spirituality', 'Card games',
];
```

---

## Component Tree (all inline in `FriendsPage.jsx`)

```
FriendsPage
  ├── PageIntro
  ├── ViewToggle                    ← "Suggested Friends" | "Hellos Received"
  ├── [view === 'suggested']
  │     ├── FilterSortBar
  │     ├── SuggestedCount          ← e.g. "4 suggested friends"
  │     ├── ProfileList             ← filtered + sorted
  │     │     └── ProfileCard
  │     └── EmptyState
  └── [view === 'incoming']
        ├── IncomingList
        │     └── IncomingCard
        └── IncomingEmptyState
```

---

## State Design

All state lives in `FriendsPage`:

```js
const [view, setView]                       = useState('suggested');
const [filterLocation, setFilterLocation]   = useState('');       // '' | 'same' | 'nearby'
const [filterGender, setFilterGender]       = useState('');       // '' = any
const [filterInterests, setFilterInterests] = useState([]);       // [] = all
const [sortBy, setSortBy]                   = useState('common'); // 'common' | 'location' | 'newest'
const [outgoing, setOutgoing]               = useState({ [PRE_SEEDED_ID]: 'pending' });
const [incoming, setIncoming]               = useState(MOCK_INCOMING);
```

### Derived values (computed inline, not stored)

```js
// Fixed mock set representing the current user's interests
const MY_INTERESTS = ['Gardening', 'Reading', 'Walking', 'Cooking'];

function countCommon(profile) {
  return profile.interests.filter(i => MY_INTERESTS.includes(i)).length;
}

// Location sort ranking — explicit, not alphabetical
const LOCATION_RANK = { same: 0, nearby: 1, other: 2 };

const filteredProfiles = MOCK_PROFILES
  .filter(p => !filterLocation || p.locationGroup === filterLocation)
  .filter(p => !filterGender   || p.gender === filterGender)
  .filter(p => filterInterests.length === 0 || filterInterests.some(i => p.interests.includes(i)));

const sortedProfiles = [...filteredProfiles].sort((a, b) => {
  if (sortBy === 'common')   return countCommon(b) - countCommon(a);
  if (sortBy === 'location') return LOCATION_RANK[a.locationGroup] - LOCATION_RANK[b.locationGroup];
  if (sortBy === 'newest')   return b.addedOrder - a.addedOrder;
  return 0;
});

const pendingIncomingCount = incoming.filter(r => r.status === 'pending').length;
```

### Handler functions

```js
function handleSendHello(profileId) {
  setOutgoing(prev => ({ ...prev, [profileId]: 'pending' }));
}

function handleCancelHello(profileId) {
  setOutgoing(prev => {
    const next = { ...prev };
    delete next[profileId];
    return next;
  });
}

function handleAccept(requestId) {
  setIncoming(prev => prev.map(r => r.id === requestId ? { ...r, status: 'accepted' } : r));
}

function handleDecline(requestId) {
  setIncoming(prev => prev.map(r => r.id === requestId ? { ...r, status: 'declined' } : r));
}
```

---

## Sub-Component Specs

### PageIntro

```jsx
<div className="space-y-1">
  <h1 className="text-2xl font-bold text-amber-700">Find a Friend</h1>
  <p className="text-base text-gray-600">
    Take your time and browse. There is no rush — just a few neighbors
    who might enjoy getting to know you.
  </p>
</div>
```

---

### ViewToggle

Two tab buttons side by side. "Hellos Received" shows count only when `pendingIncomingCount > 0` — never shows `(0)`.

```jsx
<div className="flex gap-3" role="tablist">
  <button
    role="tab"
    aria-selected={view === 'suggested'}
    tabIndex={view === 'suggested' ? 0 : -1}
    onClick={() => setView('suggested')}
    className={`px-5 py-3 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-400
      ${view === 'suggested' ? 'bg-amber-600 text-white' : 'bg-white border border-amber-400 text-amber-700 hover:bg-amber-50'}`}
    style={{ minHeight: '48px' }}>
    Suggested Friends
  </button>
  <button
    role="tab"
    aria-selected={view === 'incoming'}
    tabIndex={view === 'incoming' ? 0 : -1}
    onClick={() => setView('incoming')}
    className={`px-5 py-3 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-400
      ${view === 'incoming' ? 'bg-amber-600 text-white' : 'bg-white border border-amber-400 text-amber-700 hover:bg-amber-50'}`}
    style={{ minHeight: '48px' }}>
    Hellos Received{pendingIncomingCount > 0 ? ` (${pendingIncomingCount})` : ''}
  </button>
</div>
```

---

### FilterSortBar

Layout: `<div className="bg-white rounded-2xl border border-amber-100 p-5 space-y-4">`

1. Location row — `<label htmlFor="filter-location" className="text-base font-medium text-gray-700">Near</label>` + `<select id="filter-location">`:
   - Options: `All locations` (`''`), `Same city` (`'same'`), `Nearby` (`'nearby'`)

2. Gender row — `<label htmlFor="filter-gender">Gender</label>` + `<select id="filter-gender">`:
   - Options: `Any` (`''`), `Woman`, `Man`, `Non-binary`, `Prefer not to say`

3. Interests row — `<label id="interests-label">Interests</label>` + pill buttons from `INTEREST_POOL`:
   - `aria-labelledby="interests-label"` on the pill container
   - Each pill: `aria-pressed={isToggled}`, toggled = `bg-amber-500 text-white`, untoggled = `bg-white border border-amber-300 text-amber-700`
   - Clicking a toggled pill removes it; clicking untoggled adds it
   - `flex flex-wrap gap-2`, `minHeight: 40px` per pill — wraps cleanly, no overflow

4. Sort row — `<label htmlFor="sort-by">Sort by</label>` + `<select id="sort-by">`:
   - Options: `Most in common` (`'common'`), `Closest location` (`'location'`), `Newest` (`'newest'`)

5. Clear filters button — `text-sm text-amber-700 underline` — resets all four values to defaults

All `<select>`: `text-base rounded-lg border border-gray-200 px-3 py-2`, `minHeight: 48px`.
All `<label>`: `text-base font-medium text-gray-700`, visually rendered (not sr-only).

---

### SuggestedCount

Shown between `FilterSortBar` and `ProfileList` when `sortedProfiles.length > 0`:

```jsx
<p className="text-sm text-gray-500">
  {sortedProfiles.length} suggested {sortedProfiles.length === 1 ? 'friend' : 'friends'}
</p>
```

Hidden (not rendered) when `sortedProfiles.length === 0` — `EmptyState` handles that case.

---

### ProfileCard

Wrapper: `<article aria-label={profile.name} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3 transition-shadow duration-200 hover:shadow-md">`

Layout (top to bottom):

1. Avatar + header row:
   ```jsx
   <div className="flex items-center gap-4">
     <div className="w-14 h-14 rounded-full bg-amber-200 text-amber-800 font-bold text-lg flex items-center justify-center flex-shrink-0"
       aria-hidden="true">
       {initials}
     </div>
     <div>
       <p className="text-xl font-semibold text-gray-900">{profile.name}</p>
       <p className="text-base text-gray-500">{profile.age} · {profile.location}</p>
       <p className="text-sm text-gray-400">{profile.gender}</p>
     </div>
   </div>
   ```

2. Interests — `flex flex-wrap gap-2`:
   `<span className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-full">`

3. Connect preference (if `profile.connectPref` is not null):
   `<p className="text-sm text-amber-600">💬 Prefers: {profile.connectPref}</p>`

4. Bio:
   `<p className="text-base text-gray-700 italic leading-relaxed">{profile.bio}</p>`

5. Match reason (reused as the "why this card is shown" line):
   `<p className="text-base text-amber-800">🤝 {profile.matchReason}</p>`

6. Action area — full width:

   - **Default state** (key absent from `outgoing`):
     ```jsx
     <button onClick={() => onSend(profile.id)}
       aria-label={`Say hello to ${profile.name}`}
       className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
       style={{ minHeight: '48px' }}>
       Say Hello
     </button>
     ```

   - **Pending state** (key present in `outgoing`):
     ```jsx
     <div className="space-y-2">
       <div className="w-full bg-amber-100 border border-amber-400 text-amber-700 font-medium text-base rounded-xl px-4 py-3 text-center">
         Hello sent
         <span className="block text-sm font-normal text-amber-600 mt-0.5">Waiting for a reply</span>
       </div>
       <button onClick={() => onCancel(profile.id)}
         aria-label={`Take back hello sent to ${profile.name}`}
         className="w-full text-sm text-gray-500 underline text-center focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
         style={{ minHeight: '40px' }}>
         Take Back Hello
       </button>
     </div>
     ```

---

### EmptyState (suggested)

```jsx
<div className="bg-amber-50 rounded-2xl p-8 text-center">
  <p className="text-gray-500 text-base italic">
    No new suggestions just yet. Try changing a preference.
  </p>
</div>
```

---

### IncomingCard

Wrapper: `<article aria-label={`Hello from ${name}`} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3">`

Layout: same avatar + header + interests + bio as `ProfileCard`. No match reason. No connect preference shown.

Optional warm intro line above actions (when `status === 'pending'`):
```jsx
<p className="text-base text-gray-600">{name} would like to get to know you.</p>
```

Action area — status-based:

- **Pending**:
  ```jsx
  <div className="flex gap-3">
    <button onClick={() => onAccept(request.id)}
      aria-label={`Accept hello from ${name}`}
      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
      style={{ minHeight: '48px' }}>
      Accept Hello
    </button>
    <button onClick={() => onDecline(request.id)}
      aria-label={`Decline hello from ${name}`}
      className="flex-1 bg-white border border-gray-300 text-gray-600 font-medium text-base rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
      style={{ minHeight: '48px' }}>
      Not right now
    </button>
  </div>
  ```

- **Accepted** (card remains visible):
  ```jsx
  <p className="text-green-700 font-semibold text-base">You are now friends 🌻</p>
  ```

- **Declined** (card remains visible):
  ```jsx
  <p className="text-gray-500 italic text-base">You have gently passed on this one.</p>
  ```

---

### IncomingEmptyState

```jsx
<div className="bg-amber-50 rounded-2xl p-8 text-center">
  <p className="text-gray-500 text-base italic">
    No one has said hello yet, but new connections may appear soon.
  </p>
</div>
```

---

## Filtering Logic

- Location filter: `p.locationGroup === filterLocation` (show all if `filterLocation === ''`)
- Gender filter: exact string match against `p.gender` (show all if `filterGender === ''`)
- Interest filter: OR logic — show profile if it has ANY of the selected interests (show all if `filterInterests` is empty)
- Filters are additive: AND between filter types, OR within interests
- No scoring beyond `countCommon` — keep logic simple
- Profiles with a pending outgoing hello remain visible — status shown on card
- Sort applied after filtering

## Sorting Logic

- `'common'`: descending by `countCommon(profile)` — profiles with most shared interests first
- `'location'`: ascending by `LOCATION_RANK[p.locationGroup]` — same (0) → nearby (1) → other (2). Explicit ranking, not string sort.
- `'newest'`: descending by `addedOrder`

---

## Accessibility Notes

- `ProfileCard`: `<article aria-label={profile.name}>`
- `IncomingCard`: `<article aria-label={`Hello from ${name}`}>`
- Avatar circles: `aria-hidden="true"` — decorative
- All action buttons: `aria-label` includes the person's name
- Interest filter pills: `aria-pressed`
- ViewToggle: `role="tab"` + `aria-selected` + `tabIndex={0|-1}`
- All `<select>` elements: visually rendered `<label>` with `htmlFor`
- Focus ring on all interactive elements: `focus:outline-none focus:ring-2 focus:ring-amber-400`
- Interest pill container: `aria-labelledby` pointing to the "Interests" label

---

## Visual Style Notes

- Palette: amber/orange — consistent with AppLayout, DashboardPage, CommunityPage
- No new color identity; no purple
- Body text: `text-base` (16px minimum)
- Headings: `text-xl` or `text-2xl`
- Cards: `bg-white rounded-2xl shadow-sm border border-amber-100 p-5`
- Page background: inherits `bg-amber-50` from AppLayout
- Spacing: `space-y-5` between major sections
- Profile grid: `grid grid-cols-1 md:grid-cols-2 gap-5`
- Card hover: `transition-shadow duration-200 hover:shadow-md` — no scale, no bounce
- Button transitions: `transition-colors duration-200` — smooth, not instant
- No fast motion, no flashy effects, no scale transforms anywhere

---

## AppLayout Wiring

Replace the existing `case 'friends'` in `AppLayout.jsx`:

```jsx
// Add import at top:
import FriendsPage from '../pages/FriendsPage';

// In renderContent():
case 'friends': return <FriendsPage user={user} />;
```

No additional props needed — all state is local to `FriendsPage`.

---

## Phase 2 Deferrals

- Real backend persistence for request state
- Real-time incoming hello notifications
- Messaging between accepted friends
- User-editable interest profile
- Profile photo uploads (`avatarType: 'photo'` path)
- Real geographic distance calculations
- Mutual friend suggestions
