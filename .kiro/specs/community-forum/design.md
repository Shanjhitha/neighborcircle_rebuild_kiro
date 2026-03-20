# Design Document — Community Forum

## 1. Overview

The Community Forum replaces the `PlaceholderPage` rendered by `AppLayout` when `currentPage === 'community'`. It gives NeighborCircle residents a calm, low-pressure space to read and share messages with their neighbors. The tone is a quiet digital neighborhood — not a social media feed.

The page is organized into four sections (All Community, Small Groups, One-on-One, General), shows a Safe Space Reminder card on every view, supports emoji reactions on posts, and includes an optional share area. All data is mock/static. No backend, no routing, no real-time updates.

The implementation follows the `DashboardPage.jsx` pattern: one page file (`CommunityPage.jsx`) with all sub-components defined inline above the default export.

### Naming Convention

| Location | Name |
|---|---|
| File | `neighborcircle/src/pages/CommunityPage.jsx` |
| Default export | `CommunityPage` |
| AppLayout import | `import CommunityPage from '../pages/CommunityPage'` |
| AppLayout render | `case 'community': return <CommunityPage user={user} onNavigate={onNavigate} />;` |
| Display / UI label | "Community Forum" (used in headings, cards, and user-facing text) |

This avoids any confusion between `CommunityForumPage` and `CommunityPage` — the file and component are `CommunityPage`, the human-readable name is always "Community Forum".

---

## 2. Section Constants

All section metadata is defined in a single constant object at the top of `CommunityPage.jsx`. This is the single source of truth for tab labels, helper text, and empty-state messages.

```js
const SECTIONS = {
  all: {
    id: 'all',
    label: 'All Community',
    helperText: 'Announcements and important updates for everyone.',
    emptyText: 'No messages here yet. Feel free to say hello when you are ready.',
  },
  groups: {
    id: 'groups',
    label: 'Small Groups',
    helperText: 'Clubs, hobby circles, and personal groups.',
    emptyText: 'No group updates here yet.',
  },
  oneOnOne: {
    id: 'oneOnOne',
    label: 'One-on-One',
    helperText: 'Private conversations between two people.',
    emptyText: 'No personal conversations here yet.',
  },
  general: {
    id: 'general',
    label: 'General',
    helperText: 'Friendly everyday sharing with the community.',
    emptyText: 'No messages here yet. Feel free to say hello when you are ready.',
  },
};

const SECTION_ORDER = ['all', 'groups', 'oneOnOne', 'general'];
```

Using `SECTIONS` as a map and `SECTION_ORDER` for rendering order means adding a new section in the future only requires adding one entry to `SECTIONS` and one id to `SECTION_ORDER`.

---

## 3. Component Architecture

All components live in `neighborcircle/src/pages/CommunityPage.jsx`. No separate component files are created.

```
CommunityPage               ← default export, owns all page-level state
  SectionTabs               ← renders the 4 tab buttons
  SafeSpaceCard             ← static reassurance banner, always visible (below tabs)
  SectionHelperText         ← section description + passive participation note
  PostList                  ← maps posts for the active section → PostCard
    PostCard                ← renders one post, owns its own reaction state
      ReactionBar           ← renders the 5 reaction buttons
      ReplyList             ← renders replies for the post
        ReplyItem           ← renders one reply
  ShareArea                 ← textarea + submit button, owns share state
```

### Page layout order (top to bottom)

1. `SectionTabs`
2. `SafeSpaceCard` — always visible, below tabs
3. `SectionHelperText` — section description + passive participation note inline
4. `PostList` (with `PostCard` → `ReactionBar` + `ReplyList`)
5. `ShareArea`

### Responsibilities

| Component | Responsibility |
|---|---|
| `CommunityPage` | Holds `activeSection` and `posts` state. Handles section switching and new post submission. Passes filtered posts and `activeSection` to children. |
| `SectionTabs` | Renders 4 tab buttons from `SECTION_ORDER`. Receives `activeSection` and `onSelect`. Applies active/inactive styles. |
| `SafeSpaceCard` | Purely presentational. No props. Always rendered. |
| `SectionHelperText` | Receives `activeSection`. Looks up `SECTIONS[activeSection].helperText`. Renders helper text and the passive participation note inline. |
| `PostList` | Receives `posts` array and `activeSection`. If empty, renders section-aware empty-state from `SECTIONS[activeSection].emptyText`. Maps to `PostCard`. |
| `PostCard` | Receives a single `post` object. Owns `reactions` and `toggled` state. Renders author, timestamp, body, `groupName` badge (if present), `ReactionBar`, `ReplyList`. |
| `ReactionBar` | Receives `reactions`, `toggled`, and `onToggle` from `PostCard`. Renders 5 reaction buttons. Each button is isolated — toggling one does not affect others or other cards. |
| `ReplyList` | Receives `replies` array. Maps to `ReplyItem`. Renders nothing if empty. |
| `ReplyItem` | Receives a single `reply`. Purely presentational. |
| `ShareArea` | Owns `text` and `error` state. Calls `onSubmit(text)` on valid submission. Uses warm, non-technical wording throughout. |

---

## 4. Data Structures

### Section IDs

```js
// Valid section values — matches keys in SECTIONS constant
// 'all' | 'groups' | 'oneOnOne' | 'general'
```

### Reply

```js
/**
 * @typedef {Object} Reply
 * @property {string} id          - Unique identifier, e.g. 'r1'
 * @property {string} author      - Display name, e.g. 'Harold B.'
 * @property {string} timestamp   - Friendly string, e.g. '1 hour ago'
 * @property {string} body        - Reply text content
 */
```

### Reaction counts (initial mock values on each Post)

```js
/**
 * @typedef {Object} ReactionCounts
 * @property {number} care        - ❤️ Care
 * @property {number} smile       - 😊 Smile
 * @property {number} support     - 🙏 Support
 * @property {number} celebrate   - 🎉 Celebrate
 * @property {number} thinking    - 🌷 Thinking of you
 */
```

### Post

```js
/**
 * @typedef {Object} Post
 * @property {string}         id          - Unique identifier, e.g. 'p1'
 * @property {string}         section     - Section key: 'all' | 'groups' | 'oneOnOne' | 'general'
 * @property {string}         author      - Display name, e.g. 'Margaret T.'
 * @property {string}         timestamp   - Friendly string, e.g. '2 hours ago'
 * @property {string}         body        - Post text content
 * @property {ReactionCounts} reactions   - Initial reaction counts
 * @property {Reply[]}        replies     - Array of replies (may be empty)
 * @property {boolean}        isRead      - Whether the current user has seen this post this session
 * @property {string}         [groupName] - Small Groups only: e.g. 'Book Club'
 *                                          Future: used to filter by group within the groups section
 */
```

### Mock data file shape

```js
// neighborcircle/src/data/mockForumData.js
//
// SMALL GROUPS NOTE: Each post in section 'groups' includes a `groupName` field.
// This field is the hook for future group-filter UI — filter MOCK_POSTS by
// section === 'groups' && groupName === selectedGroup to show group-specific views.
// No restructuring of the component tree is needed to add that feature later.
//
// READ STATE NOTE: `isRead` initializes some posts as false (unread) to simulate
// a realistic session. Posts marked isRead: true represent messages the user has
// already seen. CommunityPage manages read state in its `posts` useState — the
// mock data provides the starting values only.

export const MOCK_POSTS = [
  // All Community posts (section: 'all') — at least 3, mix of isRead: true/false
  // Small Groups posts  (section: 'groups', groupName required) — at least 3
  // One-on-One posts    (section: 'oneOnOne') — at least 3, forum-style tone only
  // General posts       (section: 'general') — at least 3
];
```

### One-on-One mock post tone

Posts in `section: 'oneOnOne'` should feel like warm personal notes, not direct messages. Example body text: "Dorothy, I was thinking of you after our walk last Tuesday. I hope you are feeling well!" — clearly forum-style, not a chat interface.

---

## 5. State Design

### `CommunityPage` level

```js
const [activeSection, setActiveSection] = useState('all');
// Drives SectionTabs, SectionHelperText, and PostList filtering.

const [posts, setPosts] = useState(MOCK_POSTS);
// Full post list. New posts are prepended on submission.
// Filtered by activeSection before passing to PostList.
// isRead field on each post is updated here — this is the single source of truth
// for all unread counts (Forum tabs AND Dashboard Activity Notifications).

// Derived unread counts — computed from posts, not stored separately:
// const unreadBySection = SECTION_ORDER.reduce((acc, id) => {
//   acc[id] = posts.filter(p => p.section === id && !p.isRead).length;
//   return acc;
// }, {});
```

### `PostCard` level

```js
const [reactions, setReactions] = useState({ ...post.reactions });
const [toggled, setToggled] = useState({
  care: false, smile: false, support: false, celebrate: false, thinking: false,
});
// Each PostCard owns its own isolated reaction state.
// toggled[key] tracks whether the current user has activated that reaction.
// Reactions on one card never affect another card.
```

### `ShareArea` level

```js
const [text, setText] = useState('');
const [error, setError] = useState('');
// error is the validation message string; empty string = no error shown.
```

---

## 6. Rendering Logic

### Section switching

1. User clicks a `SectionTabs` button.
2. `onSelect(sectionId)` calls `setActiveSection(sectionId)` in `CommunityPage`.
3. `CommunityPage` derives `filteredPosts = posts.filter(p => p.section === activeSection)` and passes it to `PostList`.
4. `SectionHelperText` re-renders with the new `activeSection` and reads `SECTIONS[activeSection].helperText`.
5. `PostList` reads `SECTIONS[activeSection].emptyText` for the empty-state message.
6. `SafeSpaceCard` is always rendered — no conditional logic.

### Reaction toggling (inside `PostCard`)

```
onToggle(key):
  setReactions(prev => ({
    ...prev,
    [key]: toggled[key] ? Math.max(0, prev[key] - 1) : prev[key] + 1,
  }));
  setToggled(prev => ({ ...prev, [key]: !prev[key] }));
```

Both state updates happen in the same handler. Because each `PostCard` owns its own `reactions` and `toggled` state, toggling a reaction on one card never affects any other card.

### Marking a post as read (`CommunityPage`)

```
markRead(postId):
  setPosts(prev =>
    prev.map(p => p.id === postId ? { ...p, isRead: true } : p)
  );
```

- Called from `PostCard` via an `onRead` prop when the card enters the viewport (`IntersectionObserver`) or when the user interacts with it (reaction toggle or share submission).
- `isRead` is append-only — once `true`, it is never set back to `false`.
- `PostCard` uses a `useEffect` with `IntersectionObserver` to call `onRead` when the card becomes at least 50% visible.
- The observer is disconnected after the first read event to avoid repeated calls.

### Unread count derivation

Unread counts are derived inline — never stored as separate state:

```js
// Inside CommunityPage render:
const unreadBySection = SECTION_ORDER.reduce((acc, id) => {
  acc[id] = posts.filter(p => p.section === id && !p.isRead).length;
  return acc;
}, {});
// Passed to SectionTabs as a prop.
// Exported via a prop to DashboardPage's ActivityNotificationsCard when lifted to App.jsx.
```

### Post submission (`ShareArea` → `CommunityPage`)

1. User types in the textarea. `setText` updates on every keystroke.
2. User activates "Share with Neighbors".
3. `ShareArea` checks: if `text.trim() === ''`, set `error` to the validation message and return early.
4. If valid, call `onSubmit(text.trim())`.
5. `CommunityPage.handleSubmit(text)`:
   - Author: `user?.firstName || 'Neighbor'` — warm fallback if firstName is unavailable.
   - Builds: `{ id: Date.now().toString(), section: activeSection, author, timestamp: 'Just now', body: text, reactions: { care:0, smile:0, support:0, celebrate:0, thinking:0 }, replies: [], isRead: true }`.
   - New posts are always `isRead: true` — the author has already seen their own message.
   - Calls `setPosts(prev => [newPost, ...prev])`.
6. `ShareArea` clears `text` and `error` after `onSubmit` returns.

---

## 7. File Structure

### Files to create

```
neighborcircle/src/pages/CommunityPage.jsx    ← new page component
neighborcircle/src/data/mockForumData.js      ← new mock data file
```

### Files to modify

```
neighborcircle/src/components/AppLayout.jsx
  — add: import CommunityPage from '../pages/CommunityPage';
  — replace: case 'community': return <PlaceholderPage ... />;
  — with:    case 'community': return <CommunityPage user={user} onNavigate={onNavigate} />;

neighborcircle/src/App.jsx
  — lift posts state up from CommunityPage to App.jsx so Dashboard can read unread counts
  — pass posts and onMarkRead down to CommunityPage
  — pass unreadBySection derived value down to DashboardPage

neighborcircle/src/pages/DashboardPage.jsx
  — update ActivityNotificationsCard to accept and display unreadBySection prop
```

### State lifting for Dashboard synchronization

To share unread counts between CommunityPage and DashboardPage without a state management library:

```
App.jsx
  posts state (useState)          ← lifted from CommunityPage
  unreadBySection (derived)       ← computed from posts
  ↓ props
  CommunityPage  ← receives posts, onMarkRead, onAddPost
  DashboardPage  ← receives unreadBySection
```

`CommunityPage` becomes a controlled component for posts — it no longer owns `posts` state internally. `App.jsx` owns it and passes it down. This is the minimal change needed for Dashboard sync without introducing a context or store.

---

## 8. Share Area Wording

All visible text in the share area uses warm, non-technical language. No "compose", "post", "thread", "channel", or "submit" in UI labels.

| Element | Text |
|---|---|
| Section heading | "Share Something With Your Circle" |
| Textarea placeholder | "Would you like to share something with your neighbors today?" |
| Submit button | "Share with Neighbors" |
| Validation message | "Please write something before sharing — we would love to hear from you!" |
| Author fallback | `user?.firstName \|\| 'Neighbor'` |

---

## 9. Tailwind Class Guidance

Styling stays consistent with the existing amber/orange authenticated layout used in AppLayout and DashboardPage. No new color system is introduced.

### Page wrapper
```
<div className="w-full space-y-5">
```

### Section tabs container
```
<div className="flex flex-wrap gap-2" role="tablist">
```

### Tab button — active
```
className="px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold text-base
           focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200"
style={{ minHeight: '48px' }}
```

### Tab button — inactive
```
className="px-5 py-3 rounded-xl bg-white border border-amber-400 text-amber-700 font-medium text-base
           hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200"
style={{ minHeight: '48px' }}
```

### Safe Space Card (below tabs, above helper text)
```
<div className="bg-amber-100 border border-amber-300 rounded-2xl p-5">
  <p className="text-amber-800 font-semibold text-lg">🏡 This is a Safe and Caring Space</p>
  <p className="text-amber-700 text-base mt-1">
    Everyone here is a neighbor. Please be kind, patient, and supportive with one another.
  </p>
</div>
```

### Section helper text + passive participation note
```
<div className="space-y-1">
  <p className="text-amber-700 text-base italic">{helperText}</p>
  <p className="text-gray-500 text-base italic">
    You are welcome to read and stay connected, even if you do not feel like posting today.
  </p>
</div>
```

### Post card
```
<article className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3">
```

### Post author
```
<span className="text-gray-900 font-semibold text-base">
```

### Post timestamp
```
<span className="text-gray-400 text-sm ml-2">
```

### Post body
```
<p className="text-gray-800 text-base leading-relaxed">
```

### Group name badge (Small Groups only)
```
<span className="inline-block bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
  {post.groupName}
</span>
```

### Reply area (indented)
```
<div className="ml-6 mt-3 space-y-3 border-l-2 border-amber-100 pl-4">
```

### Reaction button — default
```
className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border border-gray-200
           bg-gray-50 text-gray-700 text-sm hover:bg-amber-50 hover:border-amber-300
           focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200"
style={{ minHeight: '48px', minWidth: '48px' }}
```

### Post card — unread
```
<article className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3
                    border-l-4 border-l-amber-400">
```

### Post card — read (default, no left accent)
```
<article className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3">
```

### Unread "New" chip
```
<span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium
                 px-2 py-0.5 rounded-full">
  ● New
</span>
```

### Seen indicator
```
<span className="text-blue-400 text-xs">✓ Seen</span>
```

### Section tab unread count badge
```
// Count shown inline in tab label — no separate badge element needed
// e.g. label = count > 0 ? `${SECTIONS[id].label} (${count})` : SECTIONS[id].label
// Styled as part of the button text — no red badge, no pill
```

### Share area wrapper
```
<section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3"
         aria-label="Share with your neighbors">
  <p className="text-amber-800 font-semibold text-lg">Share Something With Your Circle</p>
  ...
</section>
```

### Share textarea
```
className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800
           resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
rows={4}
style={{ minHeight: '80px' }}
```

### Share submit button
```
className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-6 py-3
           focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200"
style={{ minHeight: '48px' }}
```

### Validation message
```
<p className="text-red-600 text-base" role="alert">
```

### Empty state (section-aware)
```
<div className="bg-white rounded-2xl border border-amber-100 p-8 text-center">
  <p className="text-gray-500 text-base italic">{SECTIONS[activeSection].emptyText}</p>
</div>
```

---

## 10. Accessibility Notes

### Semantic HTML
- Page root: `<div className="w-full space-y-5">`
- Section tabs container: `role="tablist"`
- Each tab button: `role="tab"`, `aria-selected="true|false"`
- Post list: `<ul>` with each `PostCard` in `<li>`
- Each post: `<article>`
- Each reply list: `<ul>` with each reply as `<li>`
- Share area: `<section aria-label="Share with your neighbors">`
- Textarea: `aria-label="What would you like to share today?"`
- Validation message: `role="alert"`

### Focus management
- All interactive elements reachable via Tab in DOM order
- Visible focus ring: `focus:outline-none focus:ring-2 focus:ring-amber-400`
- No focus traps

### Reaction buttons
- `aria-label`: `"React with Care"`, `"React with Smile"`, `"React with Support"`, `"React with Celebrate"`, `"React with Thinking of you"`
- `aria-pressed="true|false"` reflects toggled state
- Emoji wrapped in `<span aria-hidden="true">`

### Animations
- All transitions: `transition-colors duration-200` or slower
- No auto-dismissing messages, no timed interactions, no flashing

### Color contrast
- `text-gray-800` on `bg-white` — WCAG AA
- `text-amber-700` on `bg-white` — WCAG AA
- White text on `bg-amber-600` — WCAG AA
- Active tab uses both color AND font-weight — never color alone

---

## 11. Phase 2 Deferral List

- **Backend / persistence** — all data is local `useState`; resets on page reload
- **Real-time updates** — no WebSocket, polling, or live refresh
- **User-created groups** — `groupName` is hardcoded; no UI to create or join groups
- **Group filter UI** — data shape supports it; filter control not built yet
- **One-on-One messaging** — mock forum-style posts only; no actual private messaging
- **Reply composition** — users can read replies but cannot write new ones
- **Pagination** — all posts render at once
- **Post editing or deletion** — no edit/delete controls
- **User avatars** — author names only
- **Moderation tools** — no report, flag, or hide controls
- **Search / filter** — no search within the post list
- **`prefers-reduced-motion`** — transitions are already slow/subtle; full support deferred
- **Persistent read state across sessions** — read state resets on page reload; backend persistence is Phase 2
- **Per-reply unread tracking** — only posts carry read state; replies are always shown as-is
