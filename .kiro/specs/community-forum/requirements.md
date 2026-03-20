# Requirements Document

## Introduction

The Community Forum is a warm, welcoming space within NeighborCircle where older adults can read, share, and connect with their neighbors at their own pace. It replaces the current PlaceholderPage for the `community` route in AppLayout.

The forum is organized into four sections — All Community, Small Groups, One-on-One, and General — and is designed around passive participation: users can browse and read without any pressure to post or react. A Safe Space Reminder card appears below the section tabs on every view, reassuring users that the forum is a kind, supportive environment. All post and reply data is mock/static for this phase.

The design follows NeighborCircle's warm amber/orange palette, uses large readable text, generous spacing, large touch targets, and friendly non-technical language throughout. The tone is that of a calm, welcoming digital neighborhood — not a fast social feed or chat application.

---

## Glossary

- **Forum**: The Community Forum page rendered at `currentPage === 'community'` inside AppLayout.
- **Section**: One of the four top-level areas of the Forum: All Community, Small Groups, One-on-One, General.
- **Section_Helper_Text**: A short descriptive sentence displayed below the Section_Tabs that describes the active Section in plain, friendly language.
- **Post**: A top-level message displayed within a Section, containing an author name, timestamp, body text, optional reaction counts, and a read/unread state.
- **Reply**: A response to a Post, displayed beneath it, containing an author name, timestamp, and body text.
- **Safe_Space_Card**: A reassuring banner/card displayed below the Section_Tabs and above the post list on every Section view.
- **Section_Tab**: A navigational button that switches the active Section displayed in the Forum.
- **Reaction**: A simple emoji-based supportive acknowledgement a user can add to a Post. Reactions are UI-only in this phase.
- **Compose_Area**: The optional text input area that allows a user to write and submit a new Post, positioned below the post list.
- **Passive_Participation_Note**: A gentle line of microcopy reassuring users they are welcome to read without posting.
- **Mock_Data**: Static, hardcoded post and reply content used in place of a real backend.
- **Forum_Page**: The top-level React component (`CommunityPage`) rendered by AppLayout for the `community` route.
- **Read_State**: A boolean flag (`isRead`) on each Post indicating whether the current user has seen it during the current session.
- **Unread_Indicator**: A gentle visual element on a Post card that signals the post has not yet been seen (e.g., a left border, a small "New" chip, or an unread dot).
- **Seen_Indicator**: A subtle visual element on a Post card confirming the post has been read (e.g., a small "Seen" label or a soft blue tick).
- **Section_Unread_Count**: The number of unread Posts in a given Section, displayed next to the Section_Tab label.
- **Unread_Count_Source**: The single `posts` state array in `CommunityPage`, which is the authoritative source for all unread counts — used by both the Forum tabs and the Dashboard Activity Notifications card.

---

## Requirements

### Requirement 1: Forum Page Structure

**User Story:** As an older adult, I want to open the Community Forum and immediately feel welcomed and oriented, so that I know where I am and feel safe to explore.

#### Acceptance Criteria

1. THE Forum_Page SHALL render within the existing AppLayout without modifying AppLayout, receiving `user` and `onNavigate` props consistent with other page components.
2. THE Forum_Page SHALL display four Section_Tabs at the top of the page.
3. THE Forum_Page SHALL display the Section_Helper_Text immediately below the Section_Tabs, updating to match the active Section.
4. THE Forum_Page SHALL display the Safe_Space_Card below the Section_Helper_Text and above the post list on every Section view.
5. THE Forum_Page SHALL display the post list below the Safe_Space_Card.
6. THE Forum_Page SHALL display the Compose_Area below the post list.
7. THE Forum_Page SHALL display one active Section at a time, defaulting to "All Community" on first render.
8. WHEN a user activates a Section_Tab, THE Forum_Page SHALL update the displayed Section, Section_Helper_Text, and post list to match the selected Section without a full page reload.
9. THE Forum_Page SHALL use a minimum body font size of 16px and a minimum heading font size of 20px throughout.
10. THE Forum_Page SHALL use the amber/orange color palette consistent with the rest of NeighborCircle (amber-50 backgrounds, amber-700/800 headings, white cards with amber borders).
11. THE Forum_Page SHALL use generous spacing between all sections and cards to maintain a calm, readable layout — no dense or cluttered arrangements.
12. THE Forum_Page SHALL NOT use technical social-media vocabulary such as "thread", "channel", "feed", "notification stream", or "DM" anywhere in visible UI text.

---

### Requirement 2: Section Helper Text

**User Story:** As an older adult, I want a short description of each section so I know what kind of conversations to expect before I start reading.

#### Acceptance Criteria

1. THE Section_Helper_Text SHALL be displayed immediately below the Section_Tabs on every Section view.
2. THE Section_Helper_Text SHALL update when the active Section changes.
3. THE Section_Helper_Text for each Section SHALL be:
   - All Community → "Announcements and important updates for everyone."
   - Small Groups → "Clubs, hobby circles, and personal groups."
   - One-on-One → "Private conversations between two people."
   - General → "Friendly everyday sharing with the community."
4. THE Section_Helper_Text SHALL use a minimum font size of 16px and a warm, subdued color (e.g., amber-700 or gray-600) that is clearly readable but does not compete with the section heading.
5. THE Section_Helper_Text SHALL NOT include any interactive elements.

---

### Requirement 3: Safe Space Reminder Card

**User Story:** As an older adult who may feel anxious about online spaces, I want a visible, reassuring message that this forum is safe and kind, so that I feel comfortable reading and participating.

#### Acceptance Criteria

1. THE Safe_Space_Card SHALL be displayed below the Section_Helper_Text and above the post list on every Section view.
2. THE Safe_Space_Card SHALL display a short, warm, friendly message reassuring users that the Community Forum is a safe, kind, and supportive neighborhood space.
3. THE Safe_Space_Card SHALL remain visible regardless of which Section is active — switching sections SHALL NOT hide or remove it.
4. THE Safe_Space_Card SHALL use warm, non-technical language with no jargon.
5. THE Safe_Space_Card SHALL use a visually distinct but gentle background (e.g., amber-100 with an amber-300 border) to draw soft attention without alarming the user.
6. THE Safe_Space_Card SHALL NOT include any interactive elements — it is purely informational.

---

### Requirement 4: Passive Participation Support

**User Story:** As an older adult who is not ready to post or react, I want to feel welcome just reading, so that I do not feel pressured or excluded.

#### Acceptance Criteria

1. THE Forum_Page SHALL display a Passive_Participation_Note — a gentle line of microcopy reassuring users they are welcome to read without posting.
2. THE Passive_Participation_Note SHALL use warm, friendly language, for example: "You are welcome to read and stay connected, even if you do not feel like posting today."
3. THE Passive_Participation_Note SHALL be displayed in a visually unobtrusive position (e.g., below the Safe_Space_Card or above the Compose_Area) so it is visible but does not dominate the page.
4. THE Passive_Participation_Note SHALL use a minimum font size of 15px and a subdued color (e.g., gray-500 or amber-600 italic) that is readable but gentle.
5. THE Forum_Page SHALL NOT display any prompts, nudges, or calls-to-action that pressure the user to post or react.

---

### Requirement 5: Section Navigation

**User Story:** As an older adult, I want to switch between forum sections easily, so that I can find conversations that interest me without getting confused.

#### Acceptance Criteria

1. THE Forum_Page SHALL render Section_Tabs as large, clearly labeled buttons with a minimum height of 48px and minimum padding sufficient for comfortable touch interaction.
2. WHEN a Section_Tab is active, THE Forum_Page SHALL visually distinguish it from inactive tabs using a filled/highlighted style (e.g., amber-600 background, white text) so the user always knows which section they are viewing.
3. WHEN a Section_Tab is inactive, THE Forum_Page SHALL display it in a subdued style (e.g., white background, amber-700 text, amber border) that is still clearly readable.
4. THE Section_Tab SHALL have an `aria-selected` attribute set to `"true"` when active and `"false"` when inactive.
5. THE Section_Tab SHALL be keyboard-focusable and activatable via the Enter or Space key.
6. WHEN a Section_Tab is focused via keyboard, THE Forum_Page SHALL display a visible focus ring around the tab.
7. ANY hover or transition effect on Section_Tabs SHALL be subtle and slow (e.g., `transition-colors duration-200` or slower) — no fast or jarring animations.

---

### Requirement 6: Post Display

**User Story:** As an older adult, I want to read posts from my neighbors in a clear, easy-to-read format, so that I can follow conversations without strain.

#### Acceptance Criteria

1. THE Forum_Page SHALL display a list of Posts for the active Section sourced from Mock_Data.
2. EACH Post SHALL display the author's name, a relative or friendly timestamp (e.g., "2 hours ago", "Yesterday"), the post body text, and a reaction summary.
3. THE Post body text SHALL use a minimum font size of 16px.
4. THE Post author name SHALL use a minimum font size of 16px and be visually emphasized (e.g., font-semibold).
5. EACH Post SHALL be displayed in a white card with rounded corners and a soft shadow or border, consistent with the NeighborCircle card style.
6. THE Forum_Page SHALL display at least 3 Posts per Section in Mock_Data to demonstrate a realistic, populated community.
7. IF a Section has no Posts in Mock_Data, THEN THE Forum_Page SHALL display a friendly, encouraging empty-state message (e.g., "No messages here yet. Feel free to say hello when you are ready!") rather than a blank area.
8. Post cards SHALL have generous internal padding (minimum 16px) and vertical spacing between cards (minimum 16px) to maintain a calm, readable layout.

---

### Requirement 7: Reply Display

**User Story:** As an older adult, I want to read replies to posts, so that I can follow the full conversation.

#### Acceptance Criteria

1. EACH Post SHALL display its associated Replies beneath the post body, indented or visually nested to indicate they are responses.
2. EACH Reply SHALL display the author's name, a friendly timestamp, and the reply body text.
3. THE Reply body text SHALL use a minimum font size of 15px.
4. THE Forum_Page SHALL display at least 1 Reply on at least 2 Posts across the Mock_Data to demonstrate realistic conversation threads.
5. WHEN a Post has no Replies, THE Forum_Page SHALL display nothing in the reply area for that Post.

---

### Requirement 8: Reactions

**User Story:** As an older adult, I want to acknowledge a post I liked with a simple, friendly gesture, so that I can participate without having to write anything.

#### Acceptance Criteria

1. EACH Post SHALL display the following five Reaction options as clearly labeled emoji buttons:
   - ❤️ Care
   - 😊 Smile
   - 🙏 Support
   - 🎉 Celebrate
   - 🌷 Thinking of you
2. THE Reaction button SHALL have a minimum height of 48px and a minimum width of 48px to meet touch target requirements.
3. WHEN a user activates a Reaction button, THE Forum_Page SHALL visually indicate the reaction has been acknowledged (e.g., button highlight, count increment) using local component state.
4. WHEN a user activates a Reaction button a second time, THE Forum_Page SHALL toggle the reaction off and decrement the count (idempotent toggle).
5. THE Reaction button SHALL have a descriptive `aria-label` (e.g., "React with Care") so screen reader users understand the action.
6. THE Reaction interaction SHALL NOT require a backend call — all state changes are local to the component for this phase.
7. WHEN a Reaction button is focused via keyboard, THE Forum_Page SHALL display a visible focus ring.
8. ANY hover or transition effect on Reaction buttons SHALL be subtle and slow — no fast or jarring animations.
9. THE Reaction labels SHALL use warm, supportive language only — no thumbs-down, dislike, or negative reactions SHALL be included.

---

### Requirement 9: Compose a Post (Optional Participation)

**User Story:** As an older adult who feels ready to share something, I want a simple, low-pressure way to write a message, so that I can contribute to the community when I choose to.

#### Acceptance Criteria

1. THE Forum_Page SHALL display a Compose_Area below the post list for the active Section.
2. THE Compose_Area SHALL include a clearly labeled text input using gentle, friendly placeholder text (e.g., "Would you like to share something with your neighbors today?").
3. THE Compose_Area text input SHALL have a minimum height of 48px and be clearly labeled with a visible label or descriptive placeholder.
4. THE Compose_Area SHALL include a clearly labeled submit button using warm language (e.g., "Share with Neighbors") with a minimum height of 48px.
5. WHEN the Compose_Area text input is empty and the submit button is activated, THE Forum_Page SHALL display a gentle, friendly inline message (e.g., "Please write something before sharing — we would love to hear from you!") rather than silently failing.
6. WHEN a user submits a non-empty post via the Compose_Area, THE Forum_Page SHALL prepend the new Post to the top of the active Section's post list using local component state, displaying the author name as the logged-in user's first name and a timestamp of "Just now".
7. WHEN a post is successfully submitted, THE Forum_Page SHALL clear the Compose_Area text input.
8. THE Compose_Area SHALL be visually unobtrusive — it should not dominate the page or pressure the user to post.
9. THE Compose_Area SHALL NOT use technical vocabulary such as "post", "thread", "channel", or "submit" in visible UI labels — prefer warm alternatives like "Share", "Share with Neighbors", or "Say hello".
10. THE Compose_Area text input SHALL be keyboard-accessible and support standard text input interactions.

---

### Requirement 10: Small Groups Extensibility

**User Story:** As a developer, I want the Small Groups section to be designed with future user-created groups in mind, so that adding that feature later does not require a full redesign.

#### Acceptance Criteria

1. THE Mock_Data structure for the Small Groups Section SHALL use a `groupName` field on each Post to indicate which group the post belongs to (e.g., "Book Club", "Garden Circle", "Walking Group").
2. THE Forum_Page SHALL display the `groupName` label on each Small Groups Post card in a visually distinct but unobtrusive style (e.g., a small amber badge or italic label).
3. THE Small Groups Section SHALL be implemented in a way that a future group-filter or group-list UI can be added without restructuring the existing component tree.
4. THE data shape for Small Groups Posts SHALL be documented in a comment within the mock data file to guide future backend integration.

---

### Requirement 11: Mock Data Quality

**User Story:** As an older adult, I want the forum to feel like a real, active neighborhood community, so that I feel motivated to read and participate.

#### Acceptance Criteria

1. THE Mock_Data SHALL contain Posts and Replies with realistic, warm, senior-appropriate content (e.g., sharing recipes, asking about local events, offering help, sharing a memory).
2. THE Mock_Data SHALL include at least 3 Posts across each of the four Sections.
3. THE Mock_Data SHALL use fictional but realistic author names appropriate for the NeighborCircle community (e.g., "Margaret T.", "Harold B.", "Dorothy K.").
4. THE Mock_Data SHALL NOT include any content that is political, controversial, or potentially distressing.
5. THE Mock_Data SHALL use friendly, warm, conversational language consistent with the NeighborCircle tone — not social-media style shorthand or jargon.
6. THE Mock_Data for Small Groups Posts SHALL include a `groupName` field on each post.

---

### Requirement 12: Accessibility

**User Story:** As an older adult with limited mobility or vision, I want the Community Forum to be easy to use with a keyboard or screen reader, so that I am not excluded from participating.

#### Acceptance Criteria

1. THE Forum_Page SHALL support full keyboard navigation: all interactive elements (Section_Tabs, Reaction buttons, Compose_Area inputs and submit button) SHALL be reachable and operable via Tab, Enter, and Space keys.
2. THE Forum_Page SHALL provide visible focus indicators on all interactive elements when focused via keyboard.
3. ALL images or decorative icons used in the Forum_Page SHALL have appropriate `alt` text or `aria-hidden="true"` if purely decorative.
4. THE Compose_Area text input SHALL have an associated `<label>` element or `aria-label` attribute.
5. THE Forum_Page SHALL maintain a color contrast ratio of at least 4.5:1 between body text and its background, consistent with WCAG AA guidance.
6. THE Forum_Page SHALL NOT use any timed interactions, auto-dismissing messages, or animations that cannot be paused — no time pressure SHALL be placed on the user.
7. THE Forum_Page SHALL use semantic HTML elements (`<section>`, `<article>`, `<button>`, `<label>`) where appropriate to support assistive technologies.
8. ALL hover and transition animations SHALL be subtle and slow — no fast, flashing, or jarring motion.

---

### Requirement 13: Integration with AppLayout

**User Story:** As a developer, I want the Community Forum to integrate cleanly into the existing AppLayout, so that navigation and the shared header work correctly without regressions.

#### Acceptance Criteria

1. THE Forum_Page SHALL be rendered by AppLayout when `currentPage === 'community'`, replacing the existing PlaceholderPage for that route.
2. THE Forum_Page SHALL accept `user` and `onNavigate` as props, consistent with the interface used by DashboardPage.
3. THE AppLayout SHALL NOT be modified to accommodate the Forum_Page beyond replacing the PlaceholderPage render call for the `'community'` case.
4. WHEN the user navigates away from the Community Forum via the sidebar and returns, THE Forum_Page SHALL reset to the default "All Community" section view.

---

### Requirement 14: Post Read / Unread State

**User Story:** As an older adult, I want to easily see which posts are new since I last visited, so that I can find fresh messages without having to re-read everything.

#### Acceptance Criteria

1. EACH Post SHALL carry an `isRead` boolean field. Posts in Mock_Data SHALL initialize some posts as unread (`isRead: false`) and some as already read (`isRead: true`) to demonstrate realistic session state.
2. WHEN a Post enters the visible viewport (via `IntersectionObserver`) or is interacted with (reaction or share), THE Forum_Page SHALL mark that Post as read by setting `isRead: true` in the `posts` state.
3. ONCE a Post is marked as read during a session, it SHALL remain read for the duration of that session — navigating away and returning to the Forum SHALL NOT reset read state.
4. Posts submitted via the Compose_Area SHALL initialize as `isRead: true` — the author has already seen their own message.
5. THE Forum_Page SHALL NOT use any timed auto-read mechanism — read state SHALL only change through viewport visibility or user interaction.

---

### Requirement 15: Unread Post Visual Indicators

**User Story:** As an older adult, I want unread posts to stand out gently so I can spot new messages at a glance, without feeling overwhelmed.

#### Acceptance Criteria

1. EACH unread Post card (`isRead: false`) SHALL display at least one gentle visual indicator distinguishing it from read posts. Acceptable indicators include: a left border accent (e.g., `border-l-4 border-amber-400`), a small "New" chip, or an unread dot.
2. EACH read Post card (`isRead: true`) SHALL display a subtle seen indicator. Acceptable indicators include: a small "Seen" label or a soft blue tick (e.g., `✓ Seen` in `text-blue-400 text-xs`).
3. Unread and read indicators SHALL use gentle, non-alarming styling — no red badges, no urgent colors, no flashing.
4. Unread indicators SHALL NOT use color alone to convey state — a text label or shape change must accompany any color difference.
5. ALL indicator text SHALL use a minimum font size of 12px and remain clearly readable against the card background.

---

### Requirement 16: Section-Level Unread Counts

**User Story:** As an older adult, I want to see at a glance how many new messages are in each section, so that I can decide where to look first.

#### Acceptance Criteria

1. EACH Section_Tab SHALL display the count of unread Posts in that Section next to the section label (e.g., "All Community (2)", "Small Groups (1)").
2. WHEN the count for a Section is zero, THE Section_Tab SHALL display the label without a count (e.g., "General" not "General (0)").
3. WHEN a Post is marked as read, THE Section_Unread_Count for that Post's Section SHALL decrease by exactly 1 immediately.
4. Section_Unread_Counts SHALL be derived from the same `posts` state array used to render the post list — no separate counter state SHALL be maintained.
5. Section_Unread_Counts SHALL use warm, calm styling — no red badges or urgent visual treatment.

---

### Requirement 17: Dashboard Activity Notifications Synchronization

**User Story:** As an older adult, I want my Dashboard to show me a friendly summary of unread forum activity, so that I know what is waiting for me without having to open the forum first.

#### Acceptance Criteria

1. THE Dashboard Activity Notifications card SHALL display unread counts sourced from the same `posts` state used by the Community Forum — there SHALL be one source of truth.
2. THE Dashboard Activity Notifications card SHALL display a friendly summary for each Section that has unread posts, for example: "2 new updates in All Community" or "1 new message in Small Groups".
3. WHEN a Section has zero unread posts, THE Dashboard Activity Notifications card SHALL NOT display a line for that Section.
4. WHEN all Sections have zero unread posts, THE Dashboard Activity Notifications card SHALL display a warm message such as "You are all caught up! Nothing new since your last visit."
5. THE Dashboard Activity Notifications card SHALL use warm, calm language — no "unread", "notification", or urgent wording in visible UI text. Prefer "new updates", "new messages", or "new notes".
6. THE Dashboard Activity Notifications card SHALL NOT display a count or summary for posts the user has already read.
7. WHEN the user marks posts as read in the Community Forum, THE Dashboard Activity Notifications card SHALL update to reflect the new counts on the next Dashboard render.

---

## Correctness Properties

### Property 1: Active Section Invariant
FOR ALL Section_Tab activations, THE Forum_Page SHALL display Posts belonging only to the selected Section — no Posts from other Sections SHALL appear in the active view.

### Property 2: Section Helper Text Sync
FOR ALL Section_Tab activations, THE Section_Helper_Text SHALL update to match the newly active Section — the helper text SHALL never display text belonging to a different Section than the one currently active.

### Property 3: Safe Space Card Persistence
FOR ALL Section_Tab activations, THE Safe_Space_Card SHALL remain visible below the Section_Helper_Text — switching sections SHALL never hide or remove it.

### Property 4: Reaction Toggle Invariant
WHEN a user activates a Reaction on a Post, THE reaction count SHALL increase by exactly 1. WHEN the same Reaction is activated again on the same Post, THE reaction count SHALL decrease by exactly 1 and return to its previous value.

### Property 5: Compose Round-Trip
WHEN a user submits a non-empty post via the Compose_Area, THE new Post SHALL appear at the top of the active Section's post list AND the Compose_Area SHALL be empty — these two outcomes SHALL always occur together, never independently.

### Property 6: Empty Compose Guard
FOR ALL submit attempts where the Compose_Area text input is empty or contains only whitespace, THE Forum_Page SHALL display a validation message AND SHALL NOT add any new Post to the post list.

### Property 7: Mock Data Completeness
FOR ALL four Sections, THE Mock_Data SHALL contain at least 3 Posts, ensuring no Section renders an empty-state on initial load.

### Property 8: Read State Monotonicity
FOR ALL Posts, once `isRead` is set to `true` during a session, it SHALL never revert to `false` — read state is append-only within a session.

### Property 9: Unread Count Accuracy
FOR ALL Sections, THE Section_Unread_Count SHALL equal exactly the number of Posts in that Section where `isRead === false` — the count SHALL never be higher or lower than the actual unread post count.

### Property 10: Dashboard Count Consistency
AT ALL TIMES, the unread counts displayed in the Dashboard Activity Notifications card SHALL equal the Section_Unread_Counts derived from the same `posts` state — the two views SHALL never show different numbers for the same Section.
