# User Profile — Technical Design

---

## 1. Overview

The Profile feature adds a personal space to NeighborCircle where each user builds and maintains their own profile. It lives at `neighborcircle/src/pages/ProfilePage.jsx` and is rendered by `AppLayout` when `currentPage === 'profile'`.

All state is local `useState`. No backend, no routing, no context. `profileData` lives in `App.jsx` and is passed as props to `ProfilePage`, following the same pattern used by `posts` for `CommunityPage` and `friends` for `FriendsPage`.

The page has two modes: **view mode** (warm portfolio layout) and **edit mode** (conversational form). A first-time user with no saved profile sees a welcoming setup prompt that opens the same form used for editing.

---

## 2. File Structure

```
neighborcircle/src/
  App.jsx                          ← profileData state + setProfileData live here
  pages/
    ProfilePage.jsx                ← page + ALL inline sub-components
  data/
    profileOptions.js              ← all preset option arrays (tag choices, etc.)
  components/
    AppLayout.jsx                  ← wired: case 'profile' → <ProfilePage .../>
```

All sub-components are inline inside `ProfilePage.jsx`, matching the pattern used by `FriendsPage.jsx` and `DashboardPage.jsx`. No separate component files per feature.

`profileOptions.js` is a dedicated data file exporting all preset option arrays. This keeps `ProfilePage.jsx` clean and makes options easy to update independently.

---

## 3. Data Model

The `ProfileData` object is stored in `App.jsx` as `useState(null)`. `null` means no profile has been saved yet (first-time user). A non-null object means a profile exists.

```js
// EMPTY_PROFILE — used as the base when initialising a new draft
const EMPTY_PROFILE = {
  // Identity
  displayName:           '',     // string — the only required field
  age:                   '',     // string (numeric input value) | '' = not provided
  location:              '',     // string | '' = not provided
  gender:                '',     // 'Woman' | 'Man' | 'Non-binary' | 'Prefer not to say' | 'Something else' | ''
  genderCustom:          '',     // string — free text when gender === 'Something else'

  // Communication
  languages:             [],     // string[] — preset + custom values
  languagesCustom:       [],     // string[] — custom-only entries (subset of languages)

  // Interests & lifestyle
  interests:             [],     // string[] — preset + custom
  interestsCustom:       [],     // string[] — custom-only entries
  connectionStyle:       [],     // string[] — preset + custom
  connectionStyleCustom: [],
  timeSpending:          [],     // string[] — preset + custom
  timeSpendingCustom:    [],

  // Connection
  connectPreference:         [],  // string[] — preset + custom
  connectPreferenceCustom:   [],
  culturalPrefs:             [],  // string[] — preset + custom
  culturalPrefsCustom:       [],

  // Bio
  bio:                   '',     // string, max 500 chars

  // Volunteer
  volunteerAnswer:       '',     // 'yes' | 'no' | '' = unanswered
  helpingInterests:      [],     // string[] — shown only if volunteerAnswer === 'yes'
  helpingInterestsCustom: [],
  availability:          [],     // string[] — shown only if volunteerAnswer === 'yes'

  // Photo
  photo:                 null,   // string (dataURL) | null

  // Derived on save — never stored separately in a conflicting way
  volunteerFlag:         false,  // boolean: true iff volunteerAnswer === 'yes'
};
```

**Note on `*Custom` arrays:** Each multi-select field has a parallel `*Custom` array tracking which values were user-entered (vs preset). This allows `TagSelector` to render custom chips with × removal while keeping the main array as the single source of truth for stored values.

**`volunteerFlag` rule:** Always derived on save as `draft.volunteerAnswer === 'yes'`. Never read from draft directly. Never tracked separately.

---

## 4. Options Data (`profileOptions.js`)

All preset option arrays live in `neighborcircle/src/data/profileOptions.js` and are imported into `ProfilePage.jsx`.

```js
// neighborcircle/src/data/profileOptions.js

export const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'Mandarin', 'Cantonese',
  'Portuguese', 'Italian', 'Polish', 'Arabic', 'Other',
];

export const INTEREST_OPTIONS = [
  'Gardening', 'Reading', 'Walking', 'Cooking', 'Music',
  'Crafts', 'Birdwatching', 'Puzzles', 'Travel memories',
  'Family stories', 'Faith & spirituality', 'Card games',
];

export const CONNECTION_STYLE_OPTIONS = [
  'Sharing stories', 'Talking about family', 'Discussing faith or values',
  'Talking about hobbies', 'Learning something new', 'Helping others',
  'Gentle humour', 'Quiet companionship',
];

export const TIME_SPENDING_OPTIONS = [
  'At home', 'In the garden', 'Out for walks', 'At community events',
  'With family', 'Reading or watching TV', 'Attending faith services',
  'Doing creative things',
];

export const CONNECT_PREFERENCE_OPTIONS = [
  'Phone call', 'Walking together', 'Tea or a chat',
  'Book club', 'Community events', 'Video call',
];

export const CULTURAL_PREFS_OPTIONS = [
  'Faith is important to me',
  'I prefer to connect with people of a similar background',
  'I value shared cultural traditions',
  'I am open to meeting anyone',
  "I'd rather not say",
];

export const HELPING_INTERESTS_OPTIONS = [
  'Friendly conversation', 'Helping with errands', 'Sharing a skill or hobby',
  'Accompanying someone to appointments', 'Offering a listening ear',
  'Cooking or sharing a meal',
];

export const AVAILABILITY_OPTIONS = [
  'Weekday mornings', 'Weekday afternoons', 'Weekday evenings',
  'Weekends', 'Flexible',
];
```

---

## 5. Component Architecture

All components are inline inside `ProfilePage.jsx`. No separate files.

### Component Tree

```
App
  └── AppLayout (currentPage, onNavigate, user, profileData, setProfileData)
        └── ProfilePage (profileData, setProfileData, user)
              ├── SetupPrompt              ← shown when profileData is null
              ├── SuccessBanner            ← shown briefly after save
              ├── ProfileView              ← shown in view mode
              │     ├── ProfileHeader      ← avatar/photo + displayName + edit button
              │     ├── SectionCard        ← reusable warm section wrapper
              │     └── TagGroup           ← reusable read-only tag list
              └── ProfileForm              ← shown in edit mode
                    ├── PhotoUploader      ← optional photo upload + preview
                    ├── InitialsAvatar     ← fallback when no photo
                    ├── TagSelector        ← multi-select with custom entry
                    └── VolunteerSubFields ← conditional helping interests + availability
```

### Sub-component Interfaces

**SetupPrompt**
```jsx
// Props: { onBegin: Function }
// Renders a warm welcome card with a single CTA: "Let's get started"
```

**ProfileView**
```jsx
// Props: { profileData: ProfileData, onEdit: Function }
// Renders named sections; omits any section where all fields are empty
```

**ProfileForm**
```jsx
// Props: { draft: ProfileData, setDraft: Function, onSave: Function, onCancel: Function }
// Single form used for both first-time setup and editing
// Questions rendered in order per Section 10
```

**SectionCard**
```jsx
// Props: { title: string, children: ReactNode }
// Warm amber-bordered card wrapping a named view-mode section
```

**TagGroup**
```jsx
// Props: { label: string, values: string[] }
// Read-only display of a list of tags in view mode
// Only rendered when values.length > 0
```

**TagSelector**
```jsx
// Props:
{
  label: string,        // question label text
  options: string[],    // preset chip options (from profileOptions.js)
  selected: string[],   // currently selected values
  onChange: Function,   // (newSelected: string[], newCustom: string[]) => void
  customValues: string[], // currently custom-entered values
  allowCustom: boolean, // show "Add your own" input
}
// Preset chips toggle on/off
// Selected chips show × to deselect
// Custom chips also show × to remove
// "Add your own" text input + Add button when allowCustom is true
```

**PhotoUploader**
```jsx
// Props: { photo: string | null, onChange: Function, onRemove: Function }
// file input → FileReader → dataURL stored in draft.photo
// Shows uploaded image preview or InitialsAvatar fallback
// Helper note: "A photo is welcome, but not required."
```

**InitialsAvatar**
```jsx
// Props: { name: string, size?: 'sm' | 'md' | 'lg' }
// Circular amber badge showing 1–2 uppercase initials
// Derived via getInitials(name)
```

**SuccessBanner**
```jsx
// Props: { visible: boolean }
// "Your profile has been updated" — auto-dismissed after 3s
// Warm amber/green tone, non-disruptive
```

---

## 6. Page Modes and Rendering Logic

`ProfilePage` manages a `mode` local state with three possible states:

| mode | Condition | Renders |
|---|---|---|
| `'setup'` | `profileData === null` | `SetupPrompt` |
| `'view'` | `profileData !== null && mode === 'view'` | `ProfileView` |
| `'edit'` | `mode === 'edit'` | `ProfileForm` |

```jsx
// ProfilePage render logic
if (profileData === null) {
  return <SetupPrompt onBegin={() => { setDraft({ ...EMPTY_PROFILE }); setMode('edit'); }} />;
}
if (mode === 'edit') {
  return <ProfileForm draft={draft} setDraft={setDraft} onSave={handleSave} onCancel={handleCancel} />;
}
return (
  <>
    {showBanner && <SuccessBanner />}
    <ProfileView profileData={profileData} onEdit={handleEdit} />
  </>
);
```

**handleEdit:**
```js
function handleEdit() {
  setDraft({ ...profileData }); // copy current saved data into draft
  setMode('edit');
}
```

**handleCancel:**
```js
function handleCancel() {
  setMode('view');
  setDraft(null);
  // profileData in App.jsx is never touched
}
```

---

## 7. Form State Strategy

`ProfilePage` maintains a `draft` local state — a working copy of the profile used only during editing. `profileData` (in App.jsx) is never mutated until the user explicitly saves.

```js
// ProfilePage local state
const [mode, setMode] = useState('view');       // 'view' | 'edit'
const [draft, setDraft] = useState(null);       // working copy during edit
const [showBanner, setShowBanner] = useState(false);
```

**Draft initialisation:**
- First-time setup: `setDraft({ ...EMPTY_PROFILE })`
- Editing existing profile: `setDraft({ ...profileData })`

**Draft updates:** Each form field calls `setDraft(prev => ({ ...prev, fieldName: newValue }))`. Multi-select fields update both the main array and the `*Custom` array together.

**Save flow:**
```js
function handleSave(draft) {
  // 1. Validate displayName
  if (!draft.displayName?.trim()) {
    setDisplayNameError(true);
    return;
  }

  // 2. Derive volunteerFlag
  const volunteerFlag = draft.volunteerAnswer === 'yes';

  // 3. Merge into profileData
  const updated = {
    ...(profileData ?? EMPTY_PROFILE),
    ...draft,
    volunteerFlag,
  };

  // 4. Persist
  setProfileData(updated);

  // 5. Return to view mode
  setMode('view');
  setDraft(null);

  // 6. Show success banner for 3s
  setShowBanner(true);
  setTimeout(() => setShowBanner(false), 3000);
}
```

---

## 8. Validation Strategy

Only `displayName` is required. All other fields are optional.

| Field | Rule | Message |
|---|---|---|
| `displayName` | Non-empty after trim | "We'd love to know what to call you — just a first name is fine!" |
| `age` | If entered: whole number in [18, 120] | "That doesn't look quite right — please enter your age as a number" |
| `bio` | Max 500 chars (enforced via `maxLength`) | Character countdown shown when ≤50 remaining |

**Validation principles:**
- No red error styling — use soft amber/orange inline prompts
- Validation only fires on save attempt, not on every keystroke
- Age is only validated if a value has been entered (empty = skip validation)
- No blocking modals or disruptive alerts
- Warm, friendly language throughout — never "required fields missing" or "invalid"

---

## 9. Photo Upload Strategy

Photo upload is optional. No cropping required for MVP.

**Flow:**
1. User clicks the upload area or a "Choose a photo" button
2. A hidden `<input type="file" accept="image/*">` is triggered
3. `FileReader.readAsDataURL(file)` converts the image to a base64 data URL
4. The data URL is stored in `draft.photo`
5. The preview renders the image in a circular crop using `object-cover` CSS

**Fallback:** When `draft.photo` is `null`, `InitialsAvatar` is shown instead.

**Remove photo:** A "Remove photo" link sets `draft.photo = null`, returning to the initials fallback.

**Error handling:** If `FileReader` fails, silently ignore — photo remains `null`. No error shown to user.

**MVP constraint:** No server upload, no cropping, no size validation. The data URL is stored in local state only.

---

## 10. Portfolio View Design

The view mode presents the saved profile as a warm personal portfolio, not a form dump.

### Section Visibility Logic

```js
function hasValue(v) {
  if (Array.isArray(v)) return v.length > 0;
  return v !== null && v !== undefined && String(v).trim().length > 0;
}

const showAboutMe = true; // always shown if profile exists (displayName is required)
const showThingsIEnjoy = hasValue(profileData.interests)
  || hasValue(profileData.connectionStyle)
  || hasValue(profileData.timeSpending);
const showHowIConnect = hasValue(profileData.connectPreference)
  || hasValue(profileData.culturalPrefs);
const showHelpingOthers = profileData.volunteerFlag === true;
```

### Section Contents

| Section | Fields | Omit field if |
|---|---|---|
| About Me | displayName, age, location, gender + genderCustom, languages, bio | field is empty |
| Things I Enjoy | interests, connectionStyle, timeSpending | array is empty |
| How I Like to Connect | connectPreference, culturalPrefs | array is empty |
| Helping Others | helpingInterests, availability | `volunteerFlag` is false (whole section hidden) |

### Layout

- Each section is wrapped in a `SectionCard` with a warm title
- Tags are rendered as read-only amber chips via `TagGroup`
- `ProfileHeader` at the top shows the avatar/photo, `displayName`, and "Edit My Profile" button
- Empty sections are omitted entirely — no blank placeholders, no "Not provided" text

---

## 11. Volunteer Integration Design

When `volunteerFlag === true`, the user's profile is eligible to appear in Volunteer Match.

**Data available to Volunteer Match from `profileData`:**
- `displayName`
- `location`
- `helpingInterests`
- `availability`

**How Volunteer Match reads it:**
- `App.jsx` passes `profileData` as a prop to `AppLayout`, which passes it to `VolunteerPage`
- `VolunteerPage` checks `profileData?.volunteerFlag === true` to determine eligibility
- No re-entry of personal details required — the saved profile is the authoritative source

**Volunteer flag derivation (always on save):**
```js
const volunteerFlag = draft.volunteerAnswer === 'yes';
```

This is the only place `volunteerFlag` is set. It is never read from `draft.volunteerFlag` directly.

---

## 12. Friends Match Integration Design

Friends Match reads from `profileData` to power suggestions and display.

**Data available to Friends Match from `profileData`:**
- `displayName` — shown on profile cards
- `age` — used for life-stage grouping
- `location` — used for proximity grouping
- `gender` — available for filtering
- `interests` — used to calculate shared interest overlap
- `connectPreference` — displayed on outgoing profile cards (first value or short joined summary)
- `bio` — shown on expanded profile cards

**How Friends Match reads it:**
- `App.jsx` passes `profileData` as a prop to `AppLayout`, which passes it to `FriendsPage`
- `FriendsPage` reads `profileData` to personalise suggestions and display the user's own connect preference on cards

**Connect preference display rule:** When multiple preferences are saved, `FriendsPage` displays the first one or a short joined summary (e.g. "Phone call · Tea or a chat") — avoiding overcrowding on cards.

---

## 13. Accessibility Considerations

- All form inputs have visible `<label>` elements — not screen-reader-only
- All inputs and interactive elements have `aria-label` or `aria-labelledby`
- All touch targets are minimum 48px height (tags, buttons, upload controls)
- Keyboard navigation: all interactive elements are reachable via Tab; tags toggle on Space/Enter
- No time pressure, no auto-advancing steps, no interactions requiring speed
- Colour is never the only indicator — text labels accompany all states
- Validation prompts are inline and non-blocking — no modal dialogs
- Success banner is announced via `role="status"` for screen readers
- Large readable fonts: minimum `text-base` (16px) for body, `text-xl` for section headings
- Warm amber palette maintained throughout — no purple introduced as a dominant colour

---

## 14. Styling Guidance

- Warm amber/orange palette consistent with the rest of NeighborCircle
- `SectionCard`: white background, amber left border or soft amber shadow, rounded corners
- `TagSelector` chips: amber background when selected (`bg-amber-100 border-amber-400`), neutral when unselected (`bg-gray-100 border-gray-300`)
- `InitialsAvatar`: amber gradient background (`from-amber-400 to-orange-400`), white text
- `SuccessBanner`: soft amber/green tone (`bg-amber-50 border-amber-300`), warm message
- `SetupPrompt`: large warm card, amber accent, friendly heading (`text-2xl`), single CTA button
- Save button: `bg-amber-500 hover:bg-amber-600 text-white`, large (`py-3 px-6 text-lg`)
- Edit button: `bg-amber-100 hover:bg-amber-200 text-amber-800`, large touch target
- All body text: `text-lg` minimum; section headings: `text-xl` minimum; page heading: `text-2xl`
- Validation prompts: `text-amber-700` soft inline text, no red
- Photo upload area: dashed amber border, rounded, large click target

---

## 15. Phase 2 Deferrals

The following are explicitly out of scope for MVP and deferred to a later phase:

- **Dashboard setup reminder:** A warm nudge on the Dashboard for users who haven't completed their profile. MVP keeps setup entirely inside the Profile page.
- **Photo cropping:** MVP uses the uploaded image as-is. Cropping UI is deferred.
- **Photo size validation:** No file size or dimension checks in MVP.
- **Geocoding / location validation:** Location is stored as plain text. No geocoding, map integration, or validation.
- **Backend persistence:** All state is local `useState`. No server, no database, no cross-session persistence.
- **Cross-user profile visibility:** Profiles are not shared between users in MVP. Friends Match and Volunteer Match use mock data alongside the local profile.
- **Profile completeness indicator:** No progress bar or "X% complete" display in MVP.
- **Notification when profile is viewed:** No read receipts or view counts.
- **Admin moderation of profiles:** No content moderation in MVP.
- **Profile privacy settings:** No visibility controls (public/private) in MVP.
