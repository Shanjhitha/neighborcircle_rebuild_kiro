# Implementation Tasks — Community Forum

## Task 1: Create mock forum data file

**File:** `neighborcircle/src/data/mockForumData.js`

Create the mock data file with at least 3 posts per section and realistic warm content.

- Define `MOCK_POSTS` as a named export — an array of `Post` objects
- Include posts for all four sections: `'all'`, `'groups'`, `'oneOnOne'`, `'general'`
- Each post must include: `id`, `section`, `author`, `timestamp`, `body`, `reactions` (all 5 keys: `care`, `smile`, `support`, `celebrate`, `thinking`), `replies`
- Small Groups posts (`section: 'groups'`) must include a `groupName` field (e.g. `'Book Club'`, `'Garden Circle'`, `'Walking Group'`)
- One-on-One posts (`section: 'oneOnOne'`) must use warm personal note tone — clearly forum-style, not chat UI
- At least 2 posts across all sections must have at least 1 reply each
- Author names must be realistic and senior-appropriate (e.g. `'Margaret T.'`, `'Harold B.'`, `'Dorothy K.'`)
- Content must be warm, friendly, and non-controversial (recipes, local events, memories, offers of help)
- Add a comment at the top of the file documenting the `groupName` field and its future use for group-filter UI

**References:** Design §4 (Data Structures), Design §11 (Phase 2 Deferral)

---

## Task 2: Create CommunityPage.jsx with page structure and SECTIONS constant

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Scaffold the page file with the `SECTIONS` constant and the `CommunityPage` default export.

- Add `import { useState } from 'react'` and `import { MOCK_POSTS } from '../data/mockForumData'`
- Define the `SECTIONS` constant object with keys `all`, `groups`, `oneOnOne`, `general` — each containing `id`, `label`, `helperText`, and `emptyText`
- Define `SECTION_ORDER = ['all', 'groups', 'oneOnOne', 'general']`
- Define the `REACTIONS` constant array with the 5 reaction objects: `{ key, emoji, label }` for `care`, `smile`, `support`, `celebrate`, `thinking`
- Create the `CommunityPage` default export as a functional component accepting `{ user, onNavigate }` props
- Add `useState` for `activeSection` (default `'all'`) and `posts` (default `MOCK_POSTS`)
- Derive `filteredPosts = posts.filter(p => p.section === activeSection)` inside the component
- Define `handleSubmit(text)` — builds a new post with `author: user?.firstName || 'Neighbor'`, prepends to `posts` state
- Return a `<div className="w-full space-y-5">` wrapper — leave child component slots as comments for now

**References:** Design §1 (Naming), Design §2 (SECTIONS constant), Design §5 (State Design), Design §6 (Rendering Logic)

---

## Task 3: Wire AppLayout community case

**File:** `neighborcircle/src/components/AppLayout.jsx`

Replace the PlaceholderPage render for the `'community'` case with `CommunityPage`.

- Add `import CommunityPage from '../pages/CommunityPage'` at the top of AppLayout
- In `renderContent()`, replace:
  `case 'community': return <PlaceholderPage title="Community Forum" ... />;`
  with:
  `case 'community': return <CommunityPage user={user} onNavigate={onNavigate} />;`
- Do not modify any other part of AppLayout

**References:** Design §7 (File Structure), Design §1 (Naming Convention table)

---

## Task 4: Implement SectionTabs

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Add the `SectionTabs` inline sub-component and render it at the top of `CommunityPage`.

- Define `function SectionTabs({ activeSection, onSelect })` above the default export
- Render a `<div role="tablist" className="flex flex-wrap gap-2">` container
- Map over `SECTION_ORDER`, rendering a `<button>` for each section using `SECTIONS[id].label`
- Active tab: `bg-amber-600 text-white font-semibold`, `aria-selected="true"`
- Inactive tab: `bg-white border border-amber-400 text-amber-700`, `aria-selected="false"`, `hover:bg-amber-50`
- All tabs: `role="tab"`, `minHeight: '48px'`, `px-5 py-3 rounded-xl text-base`, `focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors duration-200`
- Render `<SectionTabs activeSection={activeSection} onSelect={setActiveSection} />` in `CommunityPage`

**References:** Design §3 (Component Architecture), Design §9 (Tailwind — tab buttons), Design §10 (Accessibility — tablist)

---

## Task 5: Implement SafeSpaceCard, SectionHelperText, and PassiveParticipationNote

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Add the three always-visible informational elements in the correct order below the tabs.

**SafeSpaceCard** (below tabs, above helper text — always visible):
- Define `function SafeSpaceCard()` — no props
- Render `<div className="bg-amber-100 border border-amber-300 rounded-2xl p-5">`
- Heading: `🏡 This is a Safe and Caring Space` — `text-amber-800 font-semibold text-lg`
- Body: `Everyone here is a neighbor. Please be kind, patient, and supportive with one another.` — `text-amber-700 text-base mt-1`

**SectionHelperText** (below SafeSpaceCard — always visible, updates per section):
- Define `function SectionHelperText({ activeSection })` — reads `SECTIONS[activeSection].helperText`
- Render a `<div className="space-y-1">` containing:
  - Helper text: `<p className="text-amber-700 text-base italic">`
  - Passive participation note: `<p className="text-gray-500 text-base italic">You are welcome to read and stay connected, even if you do not feel like posting today.</p>`

- Render both in `CommunityPage` in order: `<SafeSpaceCard />` then `<SectionHelperText activeSection={activeSection} />`

**References:** Design §3 (layout order), Design §9 (Tailwind — SafeSpaceCard, helper text), Requirements §3, §4

---

## Task 6: Implement PostList, PostCard, ReplyList, and ReplyItem

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Add the post display sub-components.

**ReplyItem:**
- Define `function ReplyItem({ reply })` — purely presentational
- Render author (font-semibold), timestamp (text-gray-400 text-sm), body (text-gray-700 text-sm)

**ReplyList:**
- Define `function ReplyList({ replies })` — renders nothing if `replies.length === 0`
- Render `<ul className="ml-6 mt-3 space-y-3 border-l-2 border-amber-100 pl-4">` with `<li>` per reply

**PostCard:**
- Define `function PostCard({ post })` — owns `reactions` and `toggled` state (initialized from `post.reactions`)
- Render `<article className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3">`
- Show `groupName` badge if `post.groupName` exists: `bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full`
- Show author (`font-semibold text-base`), timestamp (`text-gray-400 text-sm`), body (`text-gray-800 text-base leading-relaxed`)
- Render `<ReactionBar />` and `<ReplyList replies={post.replies} />`

**PostList:**
- Define `function PostList({ posts, activeSection })` 
- If `posts.length === 0`, render section-aware empty state using `SECTIONS[activeSection].emptyText`
- Otherwise render `<ul className="space-y-4">` with `<li>` per post containing `<PostCard post={post} />`

- Render `<PostList posts={filteredPosts} activeSection={activeSection} />` in `CommunityPage`

**References:** Design §3, Design §9 (Tailwind — post card, reply area, group badge, empty state)

---

## Task 7: Implement ReactionBar with toggle logic

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Add the `ReactionBar` sub-component and wire reaction toggle state inside `PostCard`.

- Define `REACTIONS` constant at the top of the file:
  ```js
  const REACTIONS = [
    { key: 'care',      emoji: '❤️', label: 'Care' },
    { key: 'smile',     emoji: '😊', label: 'Smile' },
    { key: 'support',   emoji: '🙏', label: 'Support' },
    { key: 'celebrate', emoji: '🎉', label: 'Celebrate' },
    { key: 'thinking',  emoji: '🌷', label: 'Thinking of you' },
  ];
  ```
- Define `function ReactionBar({ reactions, toggled, onToggle })`
- Render `<div className="flex flex-wrap gap-2">` with one button per reaction
- Default button style: `bg-gray-50 border border-gray-200 text-gray-700 hover:bg-amber-50 hover:border-amber-300`
- Toggled button style: `bg-amber-100 border-amber-400 text-amber-800 font-semibold`
- All buttons: `flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-sm`, `minHeight: '48px'`, `minWidth: '48px'`, `transition-colors duration-200`
- Each button: `aria-label={\`React with ${reaction.label}\`}`, `aria-pressed={toggled[reaction.key]}`
- Emoji wrapped in `<span aria-hidden="true">`
- Show count below emoji: `<span>{reactions[reaction.key]}</span>`
- In `PostCard`, define `handleToggle(key)` that updates both `reactions` and `toggled` state together
- Pass `reactions`, `toggled`, `onToggle={handleToggle}` to `<ReactionBar />`

**References:** Design §5 (PostCard state), Design §6 (Reaction toggling), Design §9 (Tailwind — reaction buttons), Design §10 (Accessibility — reaction buttons)

---

## Task 8: Implement ShareArea with validation

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Add the `ShareArea` sub-component at the bottom of the page.

- Define `function ShareArea({ onSubmit })` — owns `text` and `error` state
- Render `<section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 space-y-3" aria-label="Share with your neighbors">`
- Section heading: `<p className="text-amber-800 font-semibold text-lg">Share Something With Your Circle</p>`
- Textarea:
  - `aria-label="What would you like to share today?"`
  - `placeholder="Would you like to share something with your neighbors today?"`
  - `className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"`
  - `rows={4}`, `style={{ minHeight: '80px' }}`
- On submit: if `text.trim() === ''`, set `error` message and return; otherwise call `onSubmit(text.trim())`, clear `text` and `error`
- Validation message: `<p className="text-red-600 text-base" role="alert">` — only rendered when `error` is non-empty
- Submit button: `"Share with Neighbors"`, `bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base rounded-xl px-6 py-3`, `minHeight: '48px'`, `transition-colors duration-200`
- Render `<ShareArea onSubmit={handleSubmit} />` at the bottom of `CommunityPage`

**References:** Design §6 (Post submission), Design §8 (Share Area Wording), Design §9 (Tailwind — share area), Design §10 (Accessibility — share area)

---

## Task 10: Add isRead field to mock data

**File:** `neighborcircle/src/data/mockForumData.js`

Add `isRead` to every post in `MOCK_POSTS` to initialize realistic session state.

- Add `isRead: false` to approximately half the posts (spread across all four sections) to simulate unread messages
- Add `isRead: true` to the remaining posts to simulate already-seen messages
- Add a comment at the top of the file documenting the `isRead` field and its session-only persistence
- Do not change any other post fields

**References:** Requirements §14, Design §4 (Post typedef)

---

## Task 11: Lift posts state to App.jsx and derive unread counts

**File:** `neighborcircle/src/App.jsx`

Move `posts` state out of `CommunityPage` and into `App.jsx` so both `CommunityPage` and `DashboardPage` share the same source of truth.

- Import `MOCK_POSTS` from `'./data/mockForumData'`
- Add `const [posts, setPosts] = useState(MOCK_POSTS)` to `App.jsx`
- Define `SECTION_ORDER = ['all', 'groups', 'oneOnOne', 'general']` in App.jsx (or import from a shared constant)
- Derive `unreadBySection` inline: `SECTION_ORDER.reduce((acc, id) => { acc[id] = posts.filter(p => p.section === id && !p.isRead).length; return acc; }, {})`
- Define `handleMarkRead(postId)`: `setPosts(prev => prev.map(p => p.id === postId ? { ...p, isRead: true } : p))`
- Define `handleAddPost(newPost)`: `setPosts(prev => [newPost, ...prev])`
- Pass `posts`, `onMarkRead={handleMarkRead}`, `onAddPost={handleAddPost}` to `AppLayout` (which forwards them to `CommunityPage`)
- Pass `unreadBySection` to `AppLayout` (which forwards it to `DashboardPage`)

**References:** Design §7 (State lifting), Requirements §17

---

## Task 12: Update AppLayout to forward posts props

**File:** `neighborcircle/src/components/AppLayout.jsx`

Forward the new posts-related props from App.jsx down to the correct page components.

- Add `posts`, `onMarkRead`, `onAddPost`, `unreadBySection` to the `AppLayout` props signature
- In `renderContent()`, update the `'community'` case:
  `case 'community': return <CommunityPage user={user} onNavigate={onNavigate} posts={posts} onMarkRead={onMarkRead} onAddPost={onAddPost} />;`
- In `renderContent()`, update the `'dashboard'` case:
  `case 'dashboard': return <DashboardPage user={user} onNavigate={onNavigate} unreadBySection={unreadBySection} />;`
- Do not modify any other part of AppLayout

**References:** Design §7 (File Structure — files to modify)

---

## Task 13: Update CommunityPage to use lifted posts state and mark-read

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Replace internal `posts` useState with the lifted props, add `onRead` to `PostCard`, and wire `IntersectionObserver`.

- Remove `const [posts, setPosts] = useState(MOCK_POSTS)` from `CommunityPage`
- Add `posts`, `onMarkRead`, `onAddPost` to the `CommunityPage` props signature
- Update `handleSubmit(text)` to call `onAddPost(newPost)` instead of `setPosts`; new post must include `isRead: true`
- Derive `unreadBySection` inside `CommunityPage` for the tab counts:
  `const unreadBySection = SECTION_ORDER.reduce((acc, id) => { acc[id] = posts.filter(p => p.section === id && !p.isRead).length; return acc; }, {})`
- Pass `unreadBySection` to `<SectionTabs>`
- Update `SectionTabs` to accept `unreadBySection` and render count inline in each tab label:
  `label = unreadBySection[id] > 0 ? \`${SECTIONS[id].label} (${unreadBySection[id]})\` : SECTIONS[id].label`
- Pass `onRead={() => onMarkRead(post.id)}` to each `<PostCard>`
- In `PostCard`, add a `useEffect` with `IntersectionObserver` (threshold 0.5) that calls `onRead()` once when the card becomes visible, then disconnects the observer
- `PostCard` should also call `onRead()` on first reaction toggle if not already read

**References:** Requirements §14–16, Design §6 (Marking a post as read, Unread count derivation)

---

## Task 14: Add unread/read visual indicators to PostCard

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Update `PostCard` to visually distinguish unread from read posts.

- `PostCard` receives `post` (which now includes `isRead`) and `onRead`
- Unread card (`!post.isRead`): add `border-l-4 border-l-amber-400` to the article className
- Unread chip: render `<span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5 rounded-full">● New</span>` next to the author name
- Read card (`post.isRead`): no left border accent; render `<span className="text-blue-400 text-xs">✓ Seen</span>` next to the timestamp
- Both indicators must not rely on color alone — the text label ("New" / "Seen") carries the meaning
- Keep all existing PostCard content and layout unchanged

**References:** Requirements §15, Design §9 (Tailwind — unread/read indicators)

---

## Task 15: Update ActivityNotificationsCard on DashboardPage

**File:** `neighborcircle/src/pages/DashboardPage.jsx`

Replace the static placeholder in `ActivityNotificationsCard` with live unread counts from `unreadBySection`.

- Add `unreadBySection` to `DashboardPage` props signature
- Pass `unreadBySection` down to `<ActivityNotificationsCard unreadBySection={unreadBySection} />`
- In `ActivityNotificationsCard`, replace the static "No new notifications" text with dynamic content:
  - Filter sections with count > 0 and render one line per section:
    - "All Community" → "new updates in All Community"
    - "Small Groups" → "new messages in Small Groups"
    - "One-on-One" → "new notes in One-on-One"
    - "General" → "new messages in General"
    - Format: `"{count} {label}"` e.g. "2 new updates in All Community"
  - If all counts are zero, render: "You are all caught up! Nothing new since your last visit."
- Use warm language only — no "unread", "notification", or urgent wording
- Keep the existing blue card styling (`bg-blue-50 border-blue-200`)

**References:** Requirements §17, Design §7 (State lifting)

---

## Task 9: Accessibility pass and visual polish

**File:** `neighborcircle/src/pages/CommunityPage.jsx`

Review and finalize accessibility attributes and visual consistency.

- Confirm `role="tablist"` on tabs container and `role="tab"` + `aria-selected` on each tab button
- Confirm `role="alert"` on validation message
- Confirm `aria-pressed` on all reaction buttons
- Confirm all emoji are wrapped in `<span aria-hidden="true">`
- Confirm `<ul>` / `<li>` structure for post list and reply lists
- Confirm `<article>` on each post card
- Confirm `<section aria-label="Share with your neighbors">` on share area
- Confirm all interactive elements have visible focus rings (`focus:ring-2 focus:ring-amber-400`)
- Confirm all `transition-*` classes use `duration-200` or slower — no fast animations
- Confirm no technical vocabulary ("compose", "thread", "channel", "feed") appears in any visible UI text
- Confirm `user?.firstName || 'Neighbor'` fallback is used in `handleSubmit`
- Confirm `SafeSpaceCard` renders on every section (no conditional wrapping)
- Confirm `PassiveParticipationNote` renders on every section (inside `SectionHelperText`, no conditional wrapping)
- Confirm reaction state is per-`PostCard` — no shared reaction state at page level
- Confirm styling uses only the existing amber/orange palette — no new color system introduced
