# User Profile — Implementation Tasks

## Task Overview

Implementation follows a bottom-up order: data first, then scaffold, then form fields, then view, then polish. Each task is self-contained and builds on the previous.

---

## Task 1: Create `profileOptions.js`

**File:** `neighborcircle/src/data/profileOptions.js`

Create the data file exporting all preset option arrays used by `ProfileForm` tag selectors.

Export the following named constants:

- `LANGUAGE_OPTIONS`
- `INTEREST_OPTIONS`
- `CONNECTION_STYLE_OPTIONS`
- `TIME_SPENDING_OPTIONS`
- `CONNECT_PREFERENCE_OPTIONS`
- `CULTURAL_PREFS_OPTIONS`
- `HELPING_INTERESTS_OPTIONS`
- `AVAILABILITY_OPTIONS`

Each export is a plain `string[]` array. Values match the options defined in the design document Section 4.

**Acceptance Criteria:**
- [ ] File exists at `neighborcircle/src/data/profileOptions.js`
- [ ] All 8 named exports are present and correctly spelled
- [ ] No default export — named exports only
- [ ] No logic, no components — data only

---

## Task 2: Scaffold `ProfilePage.jsx` with constants and state

**File:** `neighborcircle/src/pages/ProfilePage.jsx`

Create the page file with all constants, the `EMPTY_PROFILE` object, the `getInitials` helper, and the top-level `ProfilePage` component with its local state wired up.

**Constants and helpers to define (all inline, no imports from shared utils):**

```js
const EMPTY_PROFILE = { /* all fields as defined in design Section 3 */ };

function getInitials(name) {
  // returns 1–2 uppercase chars from displayName
  // single word → first char; two+ words → first[0] + last[0]
}
```

**`ProfilePage` component:**

```jsx
export default function ProfilePage({ profileData, setProfileData, user }) {
  const [mode, setMode] = useState('view');       // 'view' | 'edit'
  const [draft, setDraft] = useState(null);       // working copy during edit only
  const [showBanner, setShowBanner] = useState(false);
  const [displayNameError, setDisplayNameError] = useState(false);

  // Render logic:
  // profileData === null → setup state (edit mode with first-time welcome wrapper)
  // mode === 'edit'      → ProfileForm
  // mode === 'view'      → ProfileView
}
```

**Mode entry points:**
- `handleBeginSetup`: sets `draft = { ...EMPTY_PROFILE }`, sets `mode = 'edit'`
- `handleEdit`: sets `draft = { ...profileData }`, sets `mode = 'edit'`
- `handleCancel`: sets `mode = 'view'`, sets `draft = null` — profileData untouched
- `handleSave(draft)`: validates, derives `volunteerFlag`, merges, calls `setProfileData`, returns to view, shows banner

**Acceptance Criteria:**
- [ ] `ProfilePage.jsx` exists and exports a default component
- [ ] `EMPTY_PROFILE` contains all fields from design Section 3
- [ ] `getInitials` handles single-word and multi-word names correctly
- [ ] `mode`, `draft`, `showBanner`, `displayNameError` are all local state
- [ ] `handleSave` derives `volunteerFlag = draft.volunteerAnswer === 'yes'` — never reads `draft.volunteerFlag`
- [ ] `handleCancel` discards draft without touching `profileData`
- [ ] Component renders without errors (placeholder output is fine at this stage)

---

## Task 3: Wire `AppLayout` profile case

**File:** `neighborcircle/src/components/AppLayout.jsx`

Add the `profile` case to `AppLayout`'s `renderContent` switch (or equivalent conditional), and pass `profileData` and `setProfileData` through as props.

**Changes to `AppLayout`:**

1. Accept `profileData` and `setProfileData` as props
2. In `renderContent`, add:
   ```jsx
   case 'profile':
     return <ProfilePage profileData={profileData} setProfileData={setProfileData} user={user} />;
   ```
3. Import `ProfilePage` at the top of the file

**Changes to `App.jsx`:**

1. Add `const [profileData, setProfileData] = useState(null);`
2. Pass `profileData={profileData}` and `setProfileData={setProfileData}` to `<AppLayout>`

**Header initials update in `AppLayout`:**

Update the initials badge in the header to prefer `profileData?.displayName` when available:

```js
const avatarName = profileData?.displayName
  ? profileData.displayName
  : `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();
const initials = getInitials(avatarName); // inline helper, same logic as ProfilePage
```

**Acceptance Criteria:**
- [ ] Navigating to "Profile" in the sidebar renders `ProfilePage`
- [ ] `profileData` and `setProfileData` flow from `App.jsx` → `AppLayout` → `ProfilePage`
- [ ] Header initials badge uses `profileData.displayName` when a profile exists
- [ ] No existing pages are broken

---

## Task 4: Implement `InitialsAvatar` and `PhotoUploader`

**File:** `neighborcircle/src/pages/ProfilePage.jsx` (inline sub-components)

### `InitialsAvatar`

```jsx
function InitialsAvatar({ name, size = 'md' }) {
  // size variants: sm (w-10 h-10 text-base), md (w-16 h-16 text-xl), lg (w-24 h-24 text-3xl)
  // amber gradient background, white text, rounded-full
  // derives initials via getInitials(name)
}
```

### `PhotoUploader`

```jsx
function PhotoUploader({ photo, name, onChange, onRemove }) {
  // Hidden <input type="file" accept="image/*" ref={fileInputRef}>
  // FileReader.readAsDataURL on file select → calls onChange(dataURL)
  // If photo is set: show circular image preview (object-cover, rounded-full)
  // If photo is null: show InitialsAvatar
  // "Choose a photo" button triggers file input
  // "Remove photo" link (only shown when photo is set) calls onRemove()
  // Helper note: "A photo is welcome, but not required."
  // FileReader error: silently ignore, photo stays null
}
```

**Acceptance Criteria:**
- [ ] `InitialsAvatar` renders correct initials for single-word and multi-word names
- [ ] `InitialsAvatar` uses amber gradient background
- [ ] `InitialsAvatar` supports `sm`, `md`, `lg` size variants
- [ ] `PhotoUploader` shows `InitialsAvatar` when `photo` is null
- [ ] `PhotoUploader` shows image preview when `photo` is a dataURL
- [ ] "Choose a photo" button opens file picker
- [ ] "Remove photo" link appears only when a photo is set
- [ ] FileReader failure is silently ignored

---

## Task 5: Implement `ProfileForm` basic fields

**File:** `neighborcircle/src/pages/ProfilePage.jsx` (inline sub-component)

Implement `ProfileForm` with the identity and text-based questions. Tag selector questions come in Task 6.

**Questions to implement in this task:**

1. Photo upload — `PhotoUploader` at top of form
2. Display Name — text input, required, warm validation message on empty save
3. Age — number input, optional, validate only if entered (whole number 18–120)
4. Location — text input, optional
5. Gender — single-select buttons (Woman / Man / Non-binary / Prefer not to say / Something else); "Something else" reveals a free-text input (optional, non-blocking)
6. Bio — `<textarea>`, optional, `maxLength={500}`, character countdown shown only when ≤50 remaining
7. Volunteer Answer — two large buttons: "Yes, I'd love to help" / "Not right now" (volunteer sub-fields come in Task 7)
8. Save button — "Save My Profile" (first-time) or "Save Changes" (editing)
9. Cancel link — "Cancel" (only shown when editing an existing profile, not on first-time setup)

**Form structure:**
```jsx
function ProfileForm({ draft, setDraft, onSave, onCancel, isFirstTime, displayNameError, setDisplayNameError }) {
  // isFirstTime: boolean — controls whether cancel link is shown and save button label
  // Each field calls setDraft(prev => ({ ...prev, field: value }))
}
```

**Acceptance Criteria:**
- [ ] All 7 question fields render correctly
- [ ] Display Name shows warm inline error when save is attempted with empty value
- [ ] Age validates only when a value is entered; empty age is accepted
- [ ] "Something else" gender option reveals a free-text input
- [ ] Bio character countdown appears only when ≤50 characters remain
- [ ] Save button label is "Save My Profile" on first-time setup, "Save Changes" on edit
- [ ] Cancel link is hidden on first-time setup, visible when editing
- [ ] All fields update `draft` correctly via `setDraft`

---

## Task 6: Implement `TagSelector` and custom tag flows

**File:** `neighborcircle/src/pages/ProfilePage.jsx` (inline sub-component)

Implement the reusable `TagSelector` component and wire it into `ProfileForm` for all multi-select questions.

### `TagSelector` component

```jsx
function TagSelector({ label, options, selected, customValues, onChange, allowCustom }) {
  const [customInput, setCustomInput] = useState('');

  // Preset chips: toggle selected state on click
  // Selected chips (preset or custom): show × button to deselect/remove
  // "Add your own" text input + "Add" button (only when allowCustom is true)
  // Adding a custom value: trim, skip if empty or already in selected, add to both selected and customValues
  // Removing a custom value: remove from both selected and customValues
  // onChange(newSelected, newCustomValues) called on every change
}
```

**Wire into `ProfileForm` for these questions:**

| Question | Options constant | `allowCustom` |
|---|---|---|
| Languages | `LANGUAGE_OPTIONS` | true |
| Interests | `INTEREST_OPTIONS` | true |
| Connection Style | `CONNECTION_STYLE_OPTIONS` | true |
| Time Spending | `TIME_SPENDING_OPTIONS` | true |
| Connect Preference | `CONNECT_PREFERENCE_OPTIONS` | true |
| Cultural Preferences | `CULTURAL_PREFS_OPTIONS` | true |

Each `TagSelector` updates both the main array field and the `*Custom` array field in `draft`.

**Acceptance Criteria:**
- [ ] Preset chips toggle on/off correctly
- [ ] Selected chips show × and can be deselected
- [ ] Custom values can be added via text input + Add button
- [ ] Custom chips show × and can be removed (removes from both `selected` and `customValues`)
- [ ] Duplicate custom values are silently ignored
- [ ] Empty custom input is silently ignored
- [ ] All 6 multi-select questions in `ProfileForm` use `TagSelector`
- [ ] `draft` updates correctly for both main array and `*Custom` array on every change

---

## Task 7: Implement volunteer opt-in reveal logic

**File:** `neighborcircle/src/pages/ProfilePage.jsx` (inline sub-component)

Implement `VolunteerSubFields` and wire the conditional reveal into `ProfileForm`.

### `VolunteerSubFields`

```jsx
function VolunteerSubFields({ draft, setDraft }) {
  // Renders two TagSelectors:
  // 1. Helping Interests — HELPING_INTERESTS_OPTIONS, allowCustom: false
  // 2. Availability — AVAILABILITY_OPTIONS, allowCustom: false
  // Both are optional
  // Feels like a natural continuation of the form, not a separate section
}
```

**Reveal logic in `ProfileForm`:**

```jsx
{draft.volunteerAnswer === 'yes' && (
  <VolunteerSubFields draft={draft} setDraft={setDraft} />
)}
```

**Volunteer answer buttons:**
- "Yes, I'd love to help" → sets `draft.volunteerAnswer = 'yes'`
- "Not right now" → sets `draft.volunteerAnswer = 'no'`, also clears `helpingInterests`, `helpingInterestsCustom`, `availability`

**Acceptance Criteria:**
- [ ] `VolunteerSubFields` renders only when `draft.volunteerAnswer === 'yes'`
- [ ] `VolunteerSubFields` is hidden when `draft.volunteerAnswer` is `'no'` or `''`
- [ ] Selecting "Not right now" clears helping interests and availability from draft
- [ ] Helping interests and availability both use `TagSelector`
- [ ] Both sub-fields are optional — no validation required
- [ ] The reveal feels like a natural continuation, not a jarring new section

---

## Task 8: Implement save / cancel / edit mode flow

**File:** `neighborcircle/src/pages/ProfilePage.jsx`

Wire the full mode transition flow in `ProfilePage` and implement `SetupPrompt` and `SuccessBanner`.

### `SetupPrompt`

```jsx
function SetupPrompt({ onBegin }) {
  // Warm welcome card
  // Heading: "Let's get to know you a little better"
  // Body: friendly 1–2 sentence invitation
  // Single CTA button: "Let's get started" → calls onBegin()
  // Amber/orange styling, large text, generous padding
}
```

### `SuccessBanner`

```jsx
function SuccessBanner() {
  // "Your profile has been updated"
  // role="status" for screen readers
  // Soft amber/warm styling, non-disruptive
  // Positioned at top of page content area
}
```

**Full `ProfilePage` render logic:**

```jsx
// profileData === null → show SetupPrompt (edit mode with first-time wrapper)
// mode === 'edit' && profileData === null → show ProfileForm (isFirstTime=true) after SetupPrompt CTA
// mode === 'edit' && profileData !== null → show ProfileForm (isFirstTime=false)
// mode === 'view' → show ProfileView + optional SuccessBanner
```

**`handleSave` full implementation:**
1. Validate `displayName` — if empty, set `displayNameError = true`, return early
2. Derive `volunteerFlag = draft.volunteerAnswer === 'yes'`
3. Merge: `{ ...(profileData ?? EMPTY_PROFILE), ...draft, volunteerFlag }`
4. Call `setProfileData(updated)`
5. Set `mode = 'view'`, `draft = null`, `displayNameError = false`
6. Set `showBanner = true`, `setTimeout(() => setShowBanner(false), 3000)`

**Acceptance Criteria:**
- [ ] First-time user sees `SetupPrompt` on Profile page
- [ ] Clicking "Let's get started" opens `ProfileForm` in first-time mode
- [ ] Saving a valid profile calls `setProfileData` and returns to view mode
- [ ] `SuccessBanner` appears after save and auto-dismisses after 3 seconds
- [ ] Cancelling from edit mode returns to view mode with no changes to `profileData`
- [ ] `volunteerFlag` is always derived from `volunteerAnswer`, never from draft directly
- [ ] `displayNameError` is cleared on successful save

---

## Task 9: Implement `ProfileView` portfolio layout

**File:** `neighborcircle/src/pages/ProfilePage.jsx` (inline sub-components)

Implement the full view mode: `ProfileView`, `ProfileHeader`, `SectionCard`, and `TagGroup`.

### `SectionCard`

```jsx
function SectionCard({ title, children }) {
  // White card with amber left border or soft amber shadow
  // Warm section title (text-xl, amber-800)
  // Rounded corners, generous padding
}
```

### `TagGroup`

```jsx
function TagGroup({ label, values }) {
  // Only renders when values.length > 0
  // Label in muted text, values as read-only amber chips
}
```

### `ProfileHeader`

```jsx
function ProfileHeader({ profileData, onEdit }) {
  // Large InitialsAvatar (size='lg') or photo if set
  // displayName in large text (text-2xl+)
  // Location and age shown inline if present
  // "Edit My Profile" button — amber, large touch target
}
```

### `ProfileView`

```jsx
function ProfileView({ profileData, onEdit }) {
  // Section visibility logic using hasValue()
  // Renders only non-empty sections
  // Section order: About Me → Things I Enjoy → How I Like to Connect → Helping Others
}
```

**Section contents:**

| Section | Fields | Notes |
|---|---|---|
| About Me | displayName, age, location, gender+genderCustom, languages, bio | Omit each field if empty |
| Things I Enjoy | interests, connectionStyle, timeSpending | Omit section if all empty |
| How I Like to Connect | connectPreference, culturalPrefs | Omit section if all empty; omit culturalPrefs if empty |
| Helping Others | helpingInterests, availability | Only shown if `volunteerFlag === true` |

**`hasValue` helper:**
```js
function hasValue(v) {
  if (Array.isArray(v)) return v.length > 0;
  return v !== null && v !== undefined && String(v).trim().length > 0;
}
```

**Acceptance Criteria:**
- [ ] `ProfileView` renders all four sections when all fields are populated
- [ ] Empty sections are omitted entirely — no blank headings or placeholders
- [ ] `TagGroup` only renders when its `values` array is non-empty
- [ ] `ProfileHeader` shows photo if set, `InitialsAvatar` if not
- [ ] "Edit My Profile" button is visible and triggers edit mode
- [ ] `Helping Others` section only appears when `volunteerFlag === true`
- [ ] Cultural preferences are omitted from view if the field is empty
- [ ] No "N/A", "Not provided", or empty field labels appear anywhere in view mode

---

## Task 10: Final accessibility and polish pass

**File:** `neighborcircle/src/pages/ProfilePage.jsx`, `neighborcircle/src/components/AppLayout.jsx`

Review and polish the full implementation for accessibility, senior-friendly UX, and visual consistency.

**Checklist:**

### Accessibility
- [ ] All form inputs have visible `<label>` elements (not screen-reader-only)
- [ ] All inputs have `id` attributes matching their `<label htmlFor>`
- [ ] All tag chips are keyboard accessible (Tab to focus, Space/Enter to toggle)
- [ ] "Add your own" input and Add button are keyboard accessible
- [ ] Save, Edit, Cancel, "Choose a photo", and "Remove photo" all have clear focus styles (`focus:ring-2 focus:ring-amber-400`)
- [ ] `SuccessBanner` has `role="status"` for screen reader announcement
- [ ] `SetupPrompt` CTA button has descriptive `aria-label`
- [ ] Photo upload `<input type="file">` has an accessible label

### Senior-friendly UX
- [ ] All body text is `text-lg` minimum
- [ ] All section headings are `text-xl` minimum
- [ ] All interactive elements (buttons, chips, inputs) have minimum 48px touch target height
- [ ] No time pressure, no auto-advancing, no interactions requiring speed or precision
- [ ] Validation messages use warm amber tone — no red, no harsh language
- [ ] "Save My Profile" / "Save Changes" button is large and prominent

### Visual consistency
- [ ] Amber/orange palette used throughout — no purple introduced
- [ ] `InitialsAvatar` uses amber gradient consistent with `FriendsPage` avatar style
- [ ] `SectionCard` styling is warm and readable, consistent with `DashboardPage` card style
- [ ] `SuccessBanner` is non-disruptive and visually calm
- [ ] Hover and focus states are subtle and consistent with the rest of the app

### Integration smoke check
- [ ] Navigating to Profile from sidebar works
- [ ] Saving a profile updates the header initials badge in `AppLayout`
- [ ] `volunteerFlag` correctly gates the Helping Others section in view mode
- [ ] No console errors or React warnings
