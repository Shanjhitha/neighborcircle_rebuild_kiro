# User Profile — Requirements

## Feature Summary

The Profile page is a personal space inside NeighborCircle where each user builds and maintains their own profile. It serves two purposes: guiding a first-time user through a warm, conversational setup experience, and giving any returning user a place to view and update their information at any time.

The profile is not a cold database form. It is designed to feel like building a personal portfolio — a place to share who you are, what you enjoy, and how you like to connect with others. The information collected supports friend matching, volunteer matching, and community participation across the app.

---

## Problem Being Solved

Without a profile, NeighborCircle cannot make meaningful friend or volunteer suggestions. Users are currently anonymous beyond their login name. There is no way to express interests, preferences, or availability — which means the matching features cannot work well, and the community experience feels impersonal.

The Profile page solves this by giving every user a voice: a place to say who they are, what matters to them, and how they want to be part of the community.

---

## User Goals

1. Complete a first-time profile setup that feels welcoming and easy, not overwhelming
2. Share personal details in a conversational, low-pressure way
3. Upload a profile picture, or rely on a friendly initials fallback
4. Express interests, preferences, and connection style to support better matching
5. Optionally indicate willingness to volunteer — without feeling pressured
6. Return to the profile at any time to update or add information
7. See their profile reflected across the app (Friends Match, Volunteer Match, Dashboard)

---

## Glossary

- **ProfilePage**: The authenticated page at the "Profile" nav link, showing the user's current profile in view mode or edit mode
- **ProfileForm**: The form used for both first-time setup and subsequent editing — the same component in both cases
- **Profile_State**: The React useState object holding all profile fields for the current user
- **Display_Name**: The name the user wants to be called — not necessarily their legal name
- **Volunteer_Flag**: A boolean field on the profile indicating whether the user has opted into the volunteer pool
- **Initials_Avatar**: A circular badge showing the user's initials, used when no profile picture is uploaded
- **Interest_Tags**: Multi-select tags representing the user's hobbies and enjoyment areas
- **Connect_Preference**: The user's preferred way of connecting with others (e.g. phone call, walking together)
- **Custom_Answer**: A free-text value entered by the user when none of the preset options fit

---

## Requirements

### Requirement 1: First-Time Setup Detection

**User Story:** As a first-time user, I want to be gently guided to complete my profile after signing in, so that I can get the most out of NeighborCircle right away.

#### Acceptance Criteria

1. WHEN a user signs in and the Profile_State contains no saved profile data, THE ProfilePage SHALL display a welcoming setup prompt inviting the user to complete their profile
2. WHEN a user signs in and the Profile_State contains existing profile data, THE ProfilePage SHALL display the user's saved profile in view mode with an option to edit
3. WHEN a first-time user begins setup, THE ProfileForm SHALL use the same form component used for editing — no separate form exists
4. THE ProfilePage SHALL use warm, welcoming language for the setup prompt — such as "Let's get to know you a little better" — and SHALL NOT use clinical or transactional language
5. FOR MVP, the first-time setup flow SHALL live entirely inside the Profile page — a warm reminder may be surfaced on the Dashboard in a later phase but is not required now


---

### Requirement 2: Profile Form — Structure and Navigation

**User Story:** As a user, I want the profile form to feel manageable and unhurried, so that I don't feel overwhelmed by a long list of questions.

#### Acceptance Criteria

1. THE ProfileForm SHALL present questions in a logical, conversational order that flows naturally from personal identity to interests to connection preferences to volunteering
2. THE ProfileForm SHALL allow the user to save their profile at any point — even if only some questions have been answered
3. WHEN a user saves a partial profile, THE ProfileForm SHALL accept the save without displaying messages about unanswered optional questions
4. THE ProfileForm SHALL include a clearly visible save button using warm, affirming language such as "Save My Profile" or "Save Changes"
5. WHEN a user is editing an existing profile, THE ProfileForm SHALL pre-populate all fields with the user's previously saved answers
6. IF a user navigates away from the ProfileForm without saving, THEN THE ProfilePage SHALL return to the previously saved profile state without data loss
7. WHEN a saved profile contains only partial data, THE ProfilePage SHALL display the saved profile in view mode in a way that looks complete and intentional — with warm fallback text where appropriate and blank sections omitted entirely rather than shown as empty fields

---

### Requirement 3: Profile Picture

**User Story:** As a user, I want to add a photo of myself, so that my profile feels personal and recognisable to others.

#### Acceptance Criteria

1. THE ProfileForm SHALL include an optional profile picture upload field with a gentle helper note: "A photo is welcome, but not required."
2. WHEN a user uploads an image file, THE ProfilePage SHALL display the uploaded image as the user's profile picture
3. WHEN no profile picture has been uploaded, THE ProfilePage SHALL display an Initials_Avatar derived from the user's Display_Name
4. WHEN the Display_Name contains two or more words, THE Initials_Avatar SHALL display the first letter of the first word and the first letter of the last word
5. WHEN the Display_Name contains only one word, THE Initials_Avatar SHALL display the first letter of that word
6. THE Initials_Avatar SHALL use the amber colour palette consistent with the rest of the NeighborCircle interface
7. WHERE a profile picture has been uploaded, THE ProfileForm SHALL allow the user to remove it and return to the Initials_Avatar fallback
8. FOR MVP, THE ProfileForm SHALL NOT require photo cropping — the uploaded image SHALL be used as-is

---

### Requirement 4: Question 1 — Display Name

**User Story:** As a user, I want to tell the app what to call me, so that the experience feels personal and warm.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a text input asking "What would you like us to call you?"
2. THE Display_Name field SHALL be the only required field on the ProfileForm
3. IF a user attempts to save the ProfileForm with an empty Display_Name, THEN THE ProfileForm SHALL display a gentle, friendly prompt such as "We'd love to know what to call you — just a first name is fine!"
4. THE ProfileForm SHALL NOT display harsh validation language
5. WHEN viewing the profile or the app header, THE ProfilePage SHALL use Display_Name consistently as the user-facing name

---

### Requirement 5: Question 2 — Age

**User Story:** As a user, I want to share my age, so that I can be matched with people in a similar stage of life.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a numeric input asking "How old are you?"
2. THE age field SHALL be optional
3. IF a user enters a value that is not a whole number between 18 and 120, THEN THE ProfileForm SHALL display a gentle prompt such as "That doesn't look quite right — please enter your age as a number"
4. WHEN age is not provided, THE ProfilePage SHALL omit the age field from view mode entirely — no placeholder text such as "Not provided" SHALL be shown

---

### Requirement 6: Question 3 — Location

**User Story:** As a user, I want to share my town or city, so that I can be matched with people nearby.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a text input asking "What town or city are you in?"
2. THE location field SHALL be optional
3. WHEN a location is saved, THE Profile_State SHALL store it as a plain text string for use in Friends Match and Volunteer Match proximity grouping
4. FOR MVP, THE ProfileForm SHALL NOT attempt geocoding or location validation


---

### Requirement 7: Question 4 — Gender

**User Story:** As a user, I want to describe my gender in a way that feels right to me, so that I feel seen and respected.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "How do you describe your gender?"
2. THE ProfileForm SHALL offer the following preset options: Woman, Man, Non-binary, Prefer not to say
3. THE ProfileForm SHALL include a "Something else" option that reveals a free-text Custom_Answer field
4. THE gender field SHALL be optional
5. THE "Something else" Custom_Answer field SHALL be optional and non-blocking — the user may leave it blank
6. THE ProfileForm SHALL NOT use clinical or bureaucratic language for this question

---

### Requirement 8: Question 5 — Languages

**User Story:** As a user, I want to share what languages I speak, so that I can connect with people I can communicate with comfortably.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "What languages do you speak or feel comfortable using?"
2. THE ProfileForm SHALL offer preset language options as visually spacious, easy-to-tap selectable tags including at minimum: English, Spanish, French, Mandarin, Cantonese, Portuguese, Italian, Polish, Arabic, Other
3. THE ProfileForm SHALL allow the user to select multiple languages
4. THE ProfileForm SHALL include an "Other" option that reveals a free-text Custom_Answer field
5. WHEN a Custom_Answer is added, THE ProfileForm SHALL display it as a selected chip or tag alongside the preset options
6. THE ProfileForm SHALL allow the user to remove a custom tag after adding it
7. THE languages field SHALL be optional

---

### Requirement 9: Question 6 — Interests

**User Story:** As a user, I want to share what I enjoy, so that I can be matched with people who like similar things.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "What kinds of things do you enjoy?"
2. THE ProfileForm SHALL offer Interest_Tags as visually spacious, easy-to-tap selectable options drawn from the shared interest pool: Gardening, Reading, Walking, Cooking, Music, Crafts, Birdwatching, Puzzles, Travel memories, Family stories, Faith & spirituality, Card games
3. THE ProfileForm SHALL allow the user to select multiple Interest_Tags
4. THE ProfileForm SHALL include an "Add your own" option that allows the user to type a Custom_Answer interest
5. WHEN a Custom_Answer interest is added, THE ProfileForm SHALL display it as a selected chip or tag alongside the preset options
6. THE ProfileForm SHALL allow the user to remove a custom tag after adding it
7. THE interests field SHALL be optional

---

### Requirement 10: Question 7 — Connection Style

**User Story:** As a user, I want to share what kinds of conversations or activities make me feel connected, so that others know how to relate to me.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "What kinds of conversations or activities make you feel connected?"
2. THE ProfileForm SHALL offer preset options as visually spacious, easy-to-tap selectable tags including: Sharing stories, Talking about family, Discussing faith or values, Talking about hobbies, Learning something new, Helping others, Gentle humour, Quiet companionship
3. THE ProfileForm SHALL allow the user to select multiple options
4. THE ProfileForm SHALL include an "Add your own" option for a Custom_Answer
5. WHEN a Custom_Answer is added, THE ProfileForm SHALL display it as a selected chip or tag alongside the preset options
6. THE ProfileForm SHALL allow the user to remove a custom tag after adding it
7. THE connection style field SHALL be optional

---

### Requirement 11: Question 8 — How You Spend Your Time

**User Story:** As a user, I want to share how I usually spend my time, so that others can picture what my days are like.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "How do you usually like to spend your time?"
2. THE ProfileForm SHALL offer preset options as visually spacious, easy-to-tap selectable tags including: At home, In the garden, Out for walks, At community events, With family, Reading or watching TV, Attending faith services, Doing creative things
3. THE ProfileForm SHALL allow the user to select multiple options
4. THE ProfileForm SHALL include an "Add your own" option for a Custom_Answer
5. WHEN a Custom_Answer is added, THE ProfileForm SHALL display it as a selected chip or tag alongside the preset options
6. THE ProfileForm SHALL allow the user to remove a custom tag after adding it
7. THE time-spending field SHALL be optional

---

### Requirement 12: Question 9 — Connect Preference

**User Story:** As a user, I want to share how I prefer to connect with people, so that new friends know the best way to reach out to me.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "How do you prefer to connect with people?"
2. THE ProfileForm SHALL offer the following preset options as visually spacious, easy-to-tap selectable choices: Phone call, Walking together, Tea or a chat, Book club, Community events, Video call
3. THE ProfileForm SHALL allow the user to select one or more options
4. THE ProfileForm SHALL include an "Other" option that reveals a Custom_Answer field
5. WHEN a Connect_Preference is saved, THE Profile_State SHALL store all selected preferences for use in Friends Match profile cards
6. WHEN multiple Connect_Preferences are saved, THE Friends Match system SHALL display the first preference or a short joined summary on profile cards — avoiding overcrowding
7. THE connect preference field SHALL be optional


---

### Requirement 13: Question 10 — Cultural and Personal Preferences

**User Story:** As a user, I want to share any cultural, faith-based, or personal preferences that matter to me when meeting others, so that I feel comfortable and respected in my connections.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "Are there any cultural, faith-based, or personal preferences that matter to you when meeting others?"
2. THE ProfileForm SHALL offer preset options as visually spacious, easy-to-tap selectable tags including: Faith is important to me, I prefer to connect with people of a similar background, I value shared cultural traditions, I am open to meeting anyone, I'd rather not say
3. THE ProfileForm SHALL include an "Add your own" option for a Custom_Answer
4. WHEN a Custom_Answer is added, THE ProfileForm SHALL display it as a selected chip or tag alongside the preset options
5. THE ProfileForm SHALL allow the user to remove a custom tag after adding it
6. THE cultural preferences field SHALL be optional and presented with particular sensitivity — using language that is inclusive and non-judgmental
7. WHEN viewing the profile in view mode, THE ProfilePage SHALL only display the cultural preferences section if the user answered it — the section SHALL be omitted entirely if left blank
8. THE ProfilePage SHALL NOT overemphasise this section visually

---

### Requirement 14: Question 11 — Bio

**User Story:** As a user, I want to write a short note about myself in my own words, so that others can get a real sense of who I am.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a free-text area asking "Is there anything you'd like your neighbours to know about you?"
2. THE bio field SHALL be optional
3. THE ProfileForm SHALL include a gentle placeholder such as "A few words about yourself — whatever feels right"
4. THE bio field SHALL accept up to 500 characters
5. WHEN the user is within 50 characters of the limit, THE ProfileForm SHALL display a soft remaining-character count such as "50 characters left" — the character count SHALL NOT be shown at all times

---

### Requirement 15: Question 12 — Volunteer Interest

**User Story:** As a user, I want to indicate whether I am open to helping others as a volunteer, so that I can be included in or excluded from the volunteer pool based on my own choice.

#### Acceptance Criteria

1. THE ProfileForm SHALL include a question asking "Would you be open to helping others as a volunteer?"
2. THE ProfileForm SHALL offer two clear options: "Yes, I'd love to help" and "Not right now"
3. THE ProfileForm SHALL NOT use language that makes volunteering feel obligatory or that frames declining as a negative choice
4. WHEN a user selects "Yes, I'd love to help", THE ProfileForm SHALL reveal additional optional fields for helping interests and availability — these SHALL feel like a natural continuation, not a separate form
5. THE helping interests field SHALL offer preset options as visually spacious, easy-to-tap selectable tags including: Friendly conversation, Helping with errands, Sharing a skill or hobby, Accompanying someone to appointments, Offering a listening ear, Cooking or sharing a meal
6. THE availability field SHALL offer preset options as visually spacious, easy-to-tap selectable tags including: Weekday mornings, Weekday afternoons, Weekday evenings, Weekends, Flexible
7. THE helping interests and availability fields SHALL both be optional for MVP
8. WHEN a user selects "Not right now", THE ProfileForm SHALL accept this gracefully and SHALL NOT display any follow-up prompts about volunteering
9. THE volunteer question field SHALL be optional — a user who does not answer it SHALL NOT be added to the volunteer pool

---

### Requirement 16: Volunteer Eligibility Logic

**User Story:** As the system, I need to correctly include or exclude users from the volunteer pool based on their stated preference, so that Volunteer Match only surfaces willing volunteers.

#### Acceptance Criteria

1. WHEN a user saves a profile with the volunteer answer set to "Yes, I'd love to help", THE Profile_State SHALL set the Volunteer_Flag to true
2. WHEN a user saves a profile with the volunteer answer set to "Not right now", THE Profile_State SHALL set the Volunteer_Flag to false
3. WHEN a user saves a profile without answering the volunteer question, THE Profile_State SHALL set the Volunteer_Flag to false
4. WHILE the Volunteer_Flag is true, THE Profile_State SHALL include the user in the set of profiles available to the Volunteer Match system
5. WHILE the Volunteer_Flag is false, THE Profile_State SHALL exclude the user from the set of profiles available to the Volunteer Match system
6. WHEN a user changes their volunteer answer from "Yes" to "Not right now" and saves, THE Profile_State SHALL immediately update the Volunteer_Flag to false
7. WHEN a user changes their volunteer answer from "Not right now" to "Yes" and saves, THE Profile_State SHALL immediately update the Volunteer_Flag to true
8. THE Volunteer_Flag SHALL be derived solely from the saved volunteer answer — it SHALL NOT be tracked separately in a conflicting way

---

### Requirement 17: Profile Editing

**User Story:** As a returning user, I want to update my profile at any time, so that my information stays current and reflects who I am today.

#### Acceptance Criteria

1. THE ProfilePage SHALL display an "Edit My Profile" button when viewing a saved profile
2. WHEN a user activates the edit button, THE ProfilePage SHALL display the ProfileForm pre-populated with all previously saved values
3. WHEN a user saves edits, THE Profile_State SHALL update only the fields that were changed — all other fields SHALL retain their previous values
4. WHEN a user saves edits, THE ProfilePage SHALL return to view mode and display the updated profile
5. WHEN a user saves edits, THE ProfilePage SHALL display a short, warm confirmation banner or inline success message such as "Your profile has been updated" — visible but not disruptive

---

### Requirement 18: Friends Match Data Feed

**User Story:** As the system, I need the profile data to be available to Friends Match, so that suggestions can be based on real user preferences.

#### Acceptance Criteria

1. WHEN a profile is saved, THE Profile_State SHALL make the following fields available to the Friends Match system: Display_Name, age, location, gender, Interest_Tags, Connect_Preference, bio
2. FOR MVP, THE Friends Match system SHALL read directly from the same local Profile_State object — no backend or cross-user persistence is required
3. THE Friends Match system SHALL use the user's Interest_Tags to calculate shared interests with suggested profiles
4. THE Friends Match system SHALL use the user's location to group suggested profiles by proximity
5. THE Friends Match system SHALL use the user's Connect_Preference to display on outgoing profile cards

---

### Requirement 19: Volunteer Match Data Feed

**User Story:** As the system, I need the profile data to be available to Volunteer Match, so that volunteer requests can be matched to willing and available helpers.

#### Acceptance Criteria

1. WHEN a profile is saved with Volunteer_Flag set to true, THE Profile_State SHALL make the following fields available to the Volunteer Match system: Display_Name, location, helping interests, availability
2. WHEN a profile is saved with Volunteer_Flag set to false, THE Volunteer Match system SHALL NOT include the user in its volunteer pool
3. FOR MVP, THE Volunteer Match system SHALL read directly from the same local Profile_State object — no backend or cross-user persistence is required
4. THE Volunteer Match system SHALL use the user's helping interests to match them to relevant volunteer requests
5. THE Volunteer Match system SHALL use the user's availability to surface relevant opportunities


---

### Requirement 20: Accessibility and Senior-Friendly Design

**User Story:** As an older adult with varying levels of technical confidence, I want the profile experience to be easy to use and free of confusing interactions, so that I can complete my profile without frustration.

#### Acceptance Criteria

1. THE ProfileForm SHALL use large, readable fonts consistent with the rest of the NeighborCircle interface (minimum 16px body text, minimum 20px headings)
2. THE ProfileForm SHALL use large touch targets for all interactive elements — minimum 48px height — including tags, toggles, upload controls, and save/edit buttons
3. THE ProfileForm SHALL use the warm amber and orange colour palette consistent with the authenticated layout
4. ALL interactive elements on the ProfileForm SHALL be keyboard navigable
5. ALL inputs and controls on the ProfileForm SHALL have clear, descriptive labels that are visually present — not screen-reader-only
6. ALL inputs and controls on the ProfileForm SHALL have aria-labels for assistive technology
7. THE ProfileForm SHALL provide clear, immediate feedback after every action — saving, uploading a photo, selecting a tag
8. THE ProfileForm SHALL NOT use time pressure, auto-advancing steps, or interactions that require speed or precision
9. THE ProfileForm SHALL use friendly, reassuring language throughout — no technical terms, no harsh validation, no intimidating instructions

---

### Requirement 21: View Mode and Edit Mode

**User Story:** As a user, I want the Profile page to have a clear view mode and edit mode, so that I can see my saved profile and update it whenever I like.

#### Acceptance Criteria

1. THE ProfilePage SHALL support two distinct modes: view mode and edit mode
2. WHILE in view mode, THE ProfilePage SHALL display the user's saved profile as a warm summary or portfolio layout
3. WHILE in edit mode, THE ProfilePage SHALL display the ProfileForm in a conversational layout for entering or updating answers
4. WHEN a user switches between view mode and edit mode, THE ProfilePage SHALL transition in a way that feels natural and unhurried
5. WHEN a user saves from edit mode, THE ProfilePage SHALL return to view mode automatically

---

### Requirement 22: View Mode Sections

**User Story:** As a user, I want my saved profile to be organised into warm, named sections, so that it feels like a real personal portfolio rather than a list of form fields.

#### Acceptance Criteria

1. WHILE in view mode, THE ProfilePage SHALL organise the profile into the following named sections:
   - About Me — containing Display_Name, age, location, gender, languages, and bio
   - Things I Enjoy — containing interests, connection style, and how the user spends their time
   - How I Like to Connect — containing Connect_Preference, and cultural preferences if answered
   - Helping Others — containing helping interests and availability, shown only if Volunteer_Flag is true
2. WHEN a section contains no answered fields, THE ProfilePage SHALL omit that section entirely rather than displaying it with blank placeholders
3. WHEN the cultural preferences field was not answered, THE ProfilePage SHALL omit the cultural preferences content from the "How I Like to Connect" section
4. THE ProfilePage SHALL NOT display empty technical-looking fields in view mode

---

### Requirement 23: Volunteer Profile Eligibility

**User Story:** As the system, I want a user's volunteer eligibility to flow naturally from their saved profile, so that they do not need to re-enter personal details in a separate volunteer form.

#### Acceptance Criteria

1. WHEN a user has opted into volunteering, THE Profile_State SHALL make the user's profile eligible to appear in Volunteer Match without requiring the user to re-enter core personal details elsewhere
2. THE Volunteer Match system SHALL be able to read Display_Name, location, helping interests, and availability directly from the saved Profile_State
3. WHEN a user's Volunteer_Flag is true, THE Volunteer Match system SHALL treat the saved Profile_State as the authoritative source for that user's volunteer profile

---

## Correctness Properties

The following properties describe invariants and round-trip behaviours that must hold at all times. These are intended to guide property-based testing.

### PROP-1: Volunteer Flag Invariant
For any saved profile, the Volunteer_Flag must equal true if and only if the user explicitly selected "Yes, I'd love to help" as their volunteer answer. Any other answer — including no answer — must result in Volunteer_Flag being false.

```
∀ profile: profile.volunteerFlag === true ↔ profile.volunteerAnswer === 'yes'
```

### PROP-2: Volunteer Pool Membership Invariant
A user must be included in the volunteer pool if and only if their Volunteer_Flag is true. Toggling the volunteer answer from yes to no and saving must remove the user from the pool. Toggling back must re-add them.

```
∀ profile: inVolunteerPool(profile) ↔ profile.volunteerFlag === true
```

### PROP-3: Profile Round-Trip (Save → Read)
For any set of valid profile field values, saving the profile and then reading it back must produce an object that is equivalent to what was saved. No fields should be lost, mutated, or defaulted unexpectedly.

```
∀ input: readProfile(saveProfile(input)) ≡ input
```

### PROP-4: Partial Edit Preserves Unchanged Fields
When a user edits a subset of profile fields and saves, all fields not included in the edit must retain their previous values exactly.

```
∀ profile, edit: save(profile, edit)[field] === profile[field]  for all field ∉ edit
```

### PROP-5: Initials Derivation — Non-Empty Output
For any non-empty Display_Name string, the Initials_Avatar derivation function must return a non-empty string of one or two uppercase characters.

```
∀ name (non-empty string): initials(name).length >= 1 ∧ initials(name) === initials(name).toUpperCase()
```

### PROP-6: Initials Derivation — Two-Word Names
For any Display_Name containing exactly two or more words separated by whitespace, the initials must be the first character of the first word and the first character of the last word.

```
∀ name with words [w1, ..., wN] (N >= 2): initials(name) === (w1[0] + wN[0]).toUpperCase()
```

### PROP-7: Multi-Select Tag Invariant
For any multi-select field (interests, languages, connection style, etc.), the count of stored selected values must equal the count of tags the user selected. Selecting then deselecting a tag must return the field to its previous state.

```
∀ selections: storedTags(field).length === selectedCount(field)
∀ tag: deselect(select(field, tag)) ≡ field  (idempotence of toggle)
```

### PROP-8: Custom Answer Round-Trip
For any Custom_Answer entered by the user in a free-text option, saving and reading back the profile must return the exact same string — no trimming beyond leading/trailing whitespace, no transformation.

```
∀ customValue: readProfile(saveProfile({ customField: customValue })).customField === customValue.trim()
```

### PROP-9: First-Time vs. Edit Mode Detection
The ProfilePage must deterministically show setup mode when profile data is absent and view/edit mode when profile data is present. This must hold for any possible profile state value.

```
∀ profileState:
  isEmpty(profileState) → mode === 'setup'
  isNonEmpty(profileState) → mode === 'view'
```

### PROP-10: Volunteer Flag Toggle Idempotence
Setting the volunteer answer to the same value twice and saving must produce the same result as setting it once. The Volunteer_Flag must not change on a redundant save.

```
∀ answer: save(save(profile, {volunteerAnswer: answer}), {volunteerAnswer: answer}) ≡ save(profile, {volunteerAnswer: answer})
```

---

## Expected User Experience

A user signs in for the first time and lands on the Dashboard. They navigate to their Profile page and see a warm welcome message — not a form with asterisks, but a friendly invitation to share a little about themselves.

They work through the questions at their own pace. Each question feels like a conversation: "What would you like us to call you?" "What kinds of things do you enjoy?" They pick from friendly, spacious preset tags, add their own where nothing quite fits, and write a short bio in their own words. When they reach the volunteering question, it feels like a genuine invitation — not an obligation. They choose "Not right now" and the form accepts this gracefully.

They click "Save My Profile" and see a warm confirmation. Their initials appear in the header avatar. Their profile organises itself into warm named sections — About Me, Things I Enjoy, How I Like to Connect. Sections they left blank simply don't appear. Everything looks complete and intentional.

If they ever want to change anything, they return to Profile, click "Edit My Profile", and update whatever they like. You can always come back and add more later.

Everything feels calm, personal, and unhurried.

---

## Success Criteria

- [ ] First-time users see a welcoming setup prompt when no profile data exists
- [ ] Returning users see their saved profile in view mode with an edit option
- [ ] The ProfileForm pre-populates correctly with all previously saved values when editing
- [ ] Display_Name is the only required field; all others are optional and saveable in any state
- [ ] A gentle, friendly prompt appears for the Display_Name field only — no harsh wording anywhere
- [ ] Profile picture upload works and displays the uploaded image; no cropping required for MVP
- [ ] Initials_Avatar displays correctly when no picture is uploaded, including single-word names
- [ ] All 12 profile questions render with correct preset options and custom answer support
- [ ] Preset tag options are visually spacious and easy to tap
- [ ] Custom answers appear as selected chips/tags and can be removed after adding
- [ ] Multi-select tag fields store all selected values correctly
- [ ] Volunteer answer of "Yes" reveals helping interests and availability fields naturally
- [ ] Volunteer answer of "Not right now" is accepted gracefully with no follow-up pressure
- [ ] Volunteer_Flag is correctly set to true only when the user explicitly opts in
- [ ] Volunteer_Flag is correctly set to false when the user opts out or leaves the question unanswered
- [ ] Editing a profile updates only changed fields; all other fields retain their previous values
- [ ] A warm confirmation banner or inline message appears after saving
- [ ] Profile data is accessible to Friends Match from local Profile_State
- [ ] Profile data is accessible to Volunteer Match from local Profile_State when Volunteer_Flag is true
- [ ] Volunteer Match can read Display_Name, location, helping interests, and availability directly from Profile_State
- [ ] View mode organises the profile into warm named sections (About Me, Things I Enjoy, How I Like to Connect, Helping Others)
- [ ] Empty sections are omitted entirely in view mode — no blank placeholders shown
- [ ] Cultural preferences section only appears in view mode if the user answered it
- [ ] Helping Others section only appears in view mode if Volunteer_Flag is true
- [ ] Age is omitted from view mode if not provided — no "Not provided" placeholder
- [ ] All interactive elements meet 48px minimum touch target
- [ ] All labels are visually present — not screen-reader-only
- [ ] All inputs and controls have aria-labels
- [ ] All elements are keyboard navigable
- [ ] Visual style matches the warm amber/orange NeighborCircle palette throughout
- [ ] No harsh, technical, or intimidating language appears anywhere on the page
- [ ] No console errors on any interaction

---

## Out of Scope (Phase 2)

- Backend persistence or database storage of profile data
- Profile visibility controls (public/private settings)
- Profile sharing or linking between users
- Profile photo cropping or editing tools
- Verified identity or age verification
- Profile completeness scoring or progress bars
- Notifications triggered by profile updates
- Admin review of profile content
- Dashboard warm reminder for first-time profile setup
