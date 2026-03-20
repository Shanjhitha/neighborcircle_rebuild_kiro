# Requirements Document

## Introduction

This document defines the requirements for the NeighborCircle **AppLayout** and **DashboardPage** feature. The AppLayout provides a consistent shell — left sidebar navigation, top-right profile badge, and a main content area — that wraps every authenticated page. The DashboardPage replaces the current MVP placeholder and becomes the primary landing experience after login. It surfaces daily emotional check-ins, mood tracking, journaling, medication reminders, and contextual support pathways, all designed for older adults who may have low technical confidence. All state is local (React useState); no backend or routing library is used in this phase.

---

## Glossary

- **AppLayout**: The shared page shell component that renders the sidebar, profile badge, dropdown menu, and main content slot.
- **Sidebar**: The left-hand navigation panel containing primary navigation links and tech support contact information.
- **ProfileBadge**: The circular badge in the top-right corner displaying the authenticated user's initials.
- **DropdownMenu**: The menu that appears when the user activates the ProfileBadge, containing Profile, Settings, Help, and Sign Out actions.
- **DashboardPage**: The main landing page rendered inside AppLayout after a successful login.
- **WelcomeCard**: The header card on the DashboardPage displaying a personalised greeting and the user's ProfileBadge.
- **CheckInCard**: The interactive card on the DashboardPage where the user selects their current mood.
- **MoodOption**: One of five selectable mood states: Great (1), Good (2), Okay (3), Low (4), Very Low (5).
- **SupportPrompt**: The contextual set of action buttons shown after the user selects MoodOption 4 or 5.
- **CrisisPrompt**: The extended set of action buttons shown additionally when the user selects MoodOption 5.
- **ProfessionalSupportPanel**: The panel shown when the user selects "Professional support" from the CrisisPrompt, offering Phone, Video, and Chat contact modes.
- **WeeklyMoodTracker**: Internal (non-visible) state that records one MoodOption per calendar day within the current ISO week.
- **FollowUpPrompt**: A gentle support nudge shown when the WeeklyMoodTracker records MoodOption 4 or 5 on three or more distinct days in the current week.
- **JournalCard**: The weekly text-entry card where the user can write a free-form journal entry saved in local state.
- **MedicationReminderCard**: The sticky-note-style card where the user can add and remove named medication reminders in local state.
- **DateTimeCard**: The card displaying the current date and a live clock updated every second.
- **WeatherCard**: The card displaying a static or mock weather summary and location for MVP.
- **CheckInNudgeCard**: A reminder card prompting the user to complete their daily check-in if they have not yet done so today.
- **TodaysReminderCard**: A card displaying a static or simple local-state daily reminder message.
- **StaticPanel**: A placeholder full-page panel rendered inside AppLayout for Settings and Help, containing a heading and a brief "coming soon" message.
- **onSignOut**: A prop callback passed to AppLayout that, when called, returns the application to the Login page.
- **currentPage**: The useState variable in App.jsx that controls which top-level page is rendered.

---

## Requirements

### Requirement 1: AppLayout Shell

**User Story:** As an authenticated user, I want a consistent page shell with navigation and my profile badge visible on every page, so that I can move between sections without confusion.

#### Acceptance Criteria

1. THE AppLayout SHALL render a left Sidebar, a top-right ProfileBadge, and a main content area that displays the active page content.
2. THE Sidebar SHALL contain navigation links in the following order: Dashboard, Community Forum, Friends Match, Volunteer Match, Profile.
3. THE Sidebar SHALL display tech support contact information (phone number and email address) at the bottom of the sidebar panel.
4. WHEN a navigation link in the Sidebar is activated, THE AppLayout SHALL update the active page rendered in the main content area.
5. THE ProfileBadge SHALL display the first letter of the user's first name and the first letter of the user's last name as uppercase initials.
6. WHEN the user activates the ProfileBadge, THE DropdownMenu SHALL become visible containing the options: Profile, Settings, Help, and Sign Out.
7. WHEN the DropdownMenu is visible and the user activates the Sign Out option, THE AppLayout SHALL call the onSignOut prop, returning the application to the Login page.
8. WHEN the user activates the Settings option in the DropdownMenu, THE AppLayout SHALL render the Settings StaticPanel in the main content area.
9. WHEN the user activates the Help option in the DropdownMenu, THE AppLayout SHALL render the Help StaticPanel in the main content area.
10. WHEN the DropdownMenu is visible and the user activates an area outside the DropdownMenu, THE AppLayout SHALL close the DropdownMenu.
11. THE AppLayout SHALL support keyboard navigation so that all Sidebar links, the ProfileBadge, and all DropdownMenu items are reachable and activatable using the Tab and Enter keys.
12. THE Sidebar navigation links SHALL each have a minimum touch/click target height of 48px.
13. THE ProfileBadge SHALL have a minimum touch/click target size of 48px × 48px.

---

### Requirement 2: StaticPanel Placeholders (Settings and Help)

**User Story:** As a user, I want Settings and Help pages to exist and be reachable, so that I know where to find them when they are built out.

#### Acceptance Criteria

1. THE Settings StaticPanel SHALL display a heading reading "Settings" and a message indicating the section is coming soon.
2. THE Help StaticPanel SHALL display a heading reading "Help" and a message indicating the section is coming soon.
3. WHILE a StaticPanel is displayed, THE AppLayout SHALL continue to render the Sidebar and ProfileBadge so the user can navigate away.

---

### Requirement 3: WelcomeCard

**User Story:** As an authenticated user, I want to see a personalised greeting at the top of my dashboard, so that the experience feels warm and welcoming.

#### Acceptance Criteria

1. THE WelcomeCard SHALL display the text "Welcome, [FirstName]! This is your Dashboard." where [FirstName] is the authenticated user's first name.
2. THE WelcomeCard SHALL display the user's ProfileBadge on the right side of the card.
3. THE WelcomeCard text SHALL use a font size of at least 20px (equivalent to Tailwind `text-xl` or larger).

---

### Requirement 4: CheckInNudgeCard

**User Story:** As a user, I want a gentle daily reminder to complete my check-in, so that I don't forget to record how I'm feeling.

#### Acceptance Criteria

1. WHEN the user has not yet submitted a MoodOption for the current calendar day, THE CheckInNudgeCard SHALL be visible on the DashboardPage.
2. WHEN the user has submitted a MoodOption for the current calendar day, THE CheckInNudgeCard SHALL not be displayed.
3. THE CheckInNudgeCard SHALL display a friendly, non-technical reminder message encouraging the user to complete their daily check-in.

---

### Requirement 5: DateTimeCard

**User Story:** As a user, I want to see the current date and time on my dashboard, so that I can stay oriented throughout the day.

#### Acceptance Criteria

1. THE DateTimeCard SHALL display the current date in a human-readable format (e.g., "Monday, July 14, 2025").
2. THE DateTimeCard SHALL display a live clock showing the current time, updated every 1 second.
3. WHEN the DateTimeCard is unmounted, THE DateTimeCard SHALL clear the interval timer to prevent memory leaks.

---

### Requirement 6: WeatherCard

**User Story:** As a user, I want to see a weather summary on my dashboard, so that I can plan my day.

#### Acceptance Criteria

1. THE WeatherCard SHALL display a static or mock weather condition (e.g., "Partly Cloudy, 72°F") and a mock location name for the MVP.
2. THE WeatherCard SHALL display a weather icon or emoji alongside the condition text.
3. THE WeatherCard SHALL include a label indicating the data is a sample or placeholder so the user is not misled.

---

### Requirement 7: Daily Check-In (CheckInCard)

**User Story:** As a user, I want to select how I'm feeling each day from a set of clearly labelled mood options, so that I can reflect on my emotional state and receive appropriate support.

#### Acceptance Criteria

1. THE CheckInCard SHALL display five MoodOptions presented as large buttons, each showing an emoji and a label: Great, Good, Okay, Low, Very Low.
2. THE CheckInCard MoodOption buttons SHALL each have a minimum touch target height of 48px.
3. WHEN the user selects any MoodOption, THE CheckInCard SHALL display a supportive response message acknowledging the selection.
4. WHEN the user selects MoodOption 4 (Low) or MoodOption 5 (Very Low), THE CheckInCard SHALL display the SupportPrompt containing the following action buttons: Community Forum, Friends Match, Volunteer Match, Maybe Later.
5. WHEN the user selects MoodOption 5 (Very Low), THE CheckInCard SHALL additionally display the CrisisPrompt containing the following action buttons: Talk to family, Talk to a friend, Talk to someone you trust, Professional support, Maybe later.
6. WHEN the user activates the "Community Forum" button in the SupportPrompt, THE AppLayout SHALL navigate to the Community Forum page.
7. WHEN the user activates the "Friends Match" button in the SupportPrompt, THE AppLayout SHALL navigate to the Friends Match page.
8. WHEN the user activates the "Volunteer Match" button in the SupportPrompt, THE AppLayout SHALL navigate to the Volunteer Match page.
9. WHEN the user activates "Maybe Later" in the SupportPrompt or CrisisPrompt, THE CheckInCard SHALL dismiss the prompt and return to the post-selection supportive message view.
10. WHEN the user activates "Professional support" in the CrisisPrompt, THE CheckInCard SHALL display the ProfessionalSupportPanel showing three contact mode buttons: Phone, Video, Chat.
11. WHEN the user activates any contact mode button (Phone, Video, or Chat) in the ProfessionalSupportPanel, THE ProfessionalSupportPanel SHALL display the message "A professional will be with you shortly."
12. THE CheckInCard SHALL allow the user to change their MoodOption selection within the same calendar day by re-selecting a different option.
13. IF the user has already submitted a MoodOption for the current calendar day and returns to the DashboardPage, THEN THE CheckInCard SHALL display the previously selected MoodOption and its supportive response message.

---

### Requirement 8: Internal Weekly Mood Tracking (WeeklyMoodTracker)

**User Story:** As the system, I need to track the user's mood selections across the week internally, so that a gentle follow-up prompt can be shown if the user reports low mood on multiple days.

#### Acceptance Criteria

1. THE WeeklyMoodTracker SHALL record the MoodOption selected by the user for each calendar day, stored in local React state.
2. THE WeeklyMoodTracker data SHALL NOT be displayed directly to the user in any visible UI element.
3. WHEN the user selects a MoodOption for a given day, THE WeeklyMoodTracker SHALL update the record for that day, replacing any prior selection for the same day.
4. WHEN the WeeklyMoodTracker records MoodOption 4 or MoodOption 5 on 3 or more distinct calendar days within the current ISO week (Monday–Sunday), THE DashboardPage SHALL display the FollowUpPrompt.
5. THE FollowUpPrompt SHALL display a gentle, non-alarming message encouraging the user to reach out or explore support options.
6. THE FollowUpPrompt SHALL include at least one action button linking to a support resource (e.g., Community Forum or Volunteer Match).
7. WHEN the user dismisses the FollowUpPrompt, THE DashboardPage SHALL not display the FollowUpPrompt again for the remainder of the current calendar day.

---

### Requirement 9: JournalCard

**User Story:** As a user, I want a simple place to write down my thoughts each week, so that I can reflect on my experiences.

#### Acceptance Criteria

1. THE JournalCard SHALL display a text area where the user can type a free-form journal entry.
2. WHEN the user types in the JournalCard text area, THE JournalCard SHALL save the entry text to local React state on each keystroke (controlled input).
3. THE JournalCard SHALL display a label or heading indicating it is a weekly journal.
4. THE JournalCard text area SHALL have a minimum height sufficient to display at least 4 lines of text without scrolling.
5. THE JournalCard text area SHALL have an accessible label associated via `aria-label` or `<label>` element.

---

### Requirement 10: MedicationReminderCard

**User Story:** As a user, I want to add and remove medication reminders on my dashboard, so that I don't forget to take my medications.

#### Acceptance Criteria

1. THE MedicationReminderCard SHALL display a list of existing medication reminders stored in local React state.
2. THE MedicationReminderCard SHALL provide a text input and an "Add" button so the user can add a new named reminder.
3. WHEN the user enters a non-empty reminder name and activates the "Add" button, THE MedicationReminderCard SHALL append the new reminder to the list and clear the input field.
4. IF the user activates the "Add" button with an empty input field, THEN THE MedicationReminderCard SHALL not add a reminder and SHALL display a brief inline validation message.
5. THE MedicationReminderCard SHALL display a "Remove" button alongside each reminder in the list.
6. WHEN the user activates the "Remove" button for a reminder, THE MedicationReminderCard SHALL remove that reminder from the list.
7. THE MedicationReminderCard "Add" button and each "Remove" button SHALL have a minimum touch target height of 48px.
8. THE MedicationReminderCard input field SHALL have an accessible label.

---

### Requirement 11: TodaysReminderCard

**User Story:** As a user, I want to see a simple daily reminder on my dashboard, so that I stay on top of important tasks.

#### Acceptance Criteria

1. THE TodaysReminderCard SHALL display a daily reminder message.
2. THE TodaysReminderCard reminder message SHALL be either a static string or a value stored in local React state for MVP.
3. THE TodaysReminderCard SHALL display a heading or label identifying the card as "Today's Reminder".

---

### Requirement 12: Accessibility and Senior-Friendly UI

**User Story:** As an older adult with low technical confidence, I want the entire AppLayout and DashboardPage to be easy to read and use, so that I can navigate and interact without frustration.

#### Acceptance Criteria

1. THE AppLayout SHALL use a warm colour palette based on amber and orange tones (Tailwind `amber-*` and `orange-*` classes) as the primary visual theme.
2. THE DashboardPage SHALL use a base font size of at least 16px for all body text.
3. THE DashboardPage SHALL use a font size of at least 20px for all card headings.
4. ALL interactive elements in the AppLayout and DashboardPage SHALL have a minimum touch/click target size of 48px in height.
5. ALL interactive elements SHALL have a visible focus indicator (e.g., Tailwind `focus:ring`) for keyboard navigation.
6. THE AppLayout and DashboardPage SHALL not use animations that flash or move rapidly, to avoid discomfort for users sensitive to motion.
7. ALL images, icons, and emoji used as interactive elements SHALL have descriptive `aria-label` or `alt` attributes.
8. THE DashboardPage SHALL use high-contrast text (minimum 4.5:1 contrast ratio for normal text) against its background colours.
9. THE AppLayout and DashboardPage SHALL use friendly, non-technical language in all visible text, labels, and messages.

---

### Requirement 13: App.jsx Integration

**User Story:** As a developer, I want AppLayout and DashboardPage to integrate cleanly with the existing App.jsx currentPage state pattern, so that no routing library is needed for MVP.

#### Acceptance Criteria

1. THE AppLayout SHALL wrap the Dashboard, Community Forum, Friends Match, Volunteer Match, and Profile pages — and SHALL NOT wrap the LoginPage.
2. THE App.jsx SHALL render LoginPage directly (without AppLayout) when currentPage is 'login'.
3. THE App.jsx SHALL render AppLayout (containing the active authenticated page) when currentPage is any authenticated page value (e.g. 'dashboard', 'community', 'friends', 'volunteer', 'profile').
4. THE App.jsx SHALL pass an onSignOut callback to AppLayout that sets currentPage to 'login'.
5. THE AppLayout SHALL accept a currentPage prop and an onNavigate prop (or equivalent) so that internal sidebar navigation updates the currentPage state in App.jsx.
6. WHEN onSignOut is called from within AppLayout, THE App.jsx SHALL set currentPage to 'login' and render the LoginPage without AppLayout.
7. THE LoginPage onLoginSuccess callback SHALL continue to set currentPage to 'dashboard', preserving existing login behaviour.
