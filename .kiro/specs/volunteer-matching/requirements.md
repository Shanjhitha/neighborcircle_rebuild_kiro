# Requirements Document

## Introduction

The Volunteer Matching & Support System is a feature within NeighborCircle that connects older adults seeking companionship or practical help with volunteers who are willing to offer their time and skills. The page allows seniors to browse available volunteers, request support, and receive warm, reassuring feedback throughout the process. Volunteers can view and respond to requests.

A core purpose of this feature is to reduce loneliness and provide emotional comfort — not just practical assistance. Every interaction is designed to feel human, gentle, and encouraging. The experience is intentionally simple, with minimal steps, minimal choices at any one time, and no technical language, so that seniors with low digital confidence can use it without anxiety or confusion.

## Glossary

- **Volunteer_Page**: The main page of the volunteer matching feature, visible to both seniors and volunteers.
- **Senior**: An older adult user of NeighborCircle seeking companionship, emotional support, or practical help.
- **Volunteer**: A user who has registered to offer time, companionship, or practical help to seniors.
- **Volunteer_Card**: A UI component displaying a volunteer's name, photo, short bio, and available support types.
- **Support_Request**: A message or request submitted by a Senior to a specific Volunteer.
- **Request_Form**: The form used by a Senior to submit a Support_Request.
- **Filter_Panel**: A UI component allowing users to filter volunteers by support type or availability.
- **Confirmation_Message**: A warm, emotionally reassuring message shown to the Senior after a Support_Request is submitted.
- **Volunteer_Profile**: A detailed view of a single Volunteer's information.
- **Support_Type**: A category of help offered by a Volunteer (e.g., "Friendly Chat", "Grocery Help", "Tech Help", "Errands").
- **Availability_Status**: An indicator on a Volunteer_Card showing whether a Volunteer is currently available.
- **Emotional_Anchor**: A short, warm phrase displayed at key moments to reassure the Senior they are not alone and that help is nearby.
- **System**: The NeighborCircle Volunteer Matching & Support System.

---

## Requirements

### Requirement 1: Display Volunteer Listings

**User Story:** As a Senior, I want to see a list of available volunteers, so that I can find someone who can help or keep me company and feel less alone.

#### Acceptance Criteria

1. THE Volunteer_Page SHALL display a list of Volunteer_Cards when the page loads.
2. WHEN the Volunteer_Page loads, THE System SHALL display each volunteer's name, photo, short bio, Support_Type(s), and Availability_Status on each Volunteer_Card.
3. WHEN a Volunteer has no current availability, THE Volunteer_Card SHALL display a clearly labeled "Not Available Right Now" indicator alongside the volunteer's name, so the Senior is never left wondering.
4. THE Volunteer_Card SHALL use large readable text (minimum 18px font size), a warm color scheme, and a friendly photo to make each volunteer feel approachable and human.
5. THE Volunteer_Page SHALL display a warm, emotionally welcoming heading such as "Meet Your Neighbors — People Who Care" to immediately reassure the Senior they are in a safe, supportive space.
6. THE Volunteer_Page SHALL display no more than six Volunteer_Cards at a time by default, to avoid overwhelming the Senior with too many choices.
7. THE Volunteer_Page SHALL display an Emotional_Anchor phrase near the top of the page, such as "You don't have to do this alone — we're here with you", to reinforce emotional support from the moment the page opens.

---

### Requirement 2: Filter Volunteers by Support Type

**User Story:** As a Senior, I want to filter volunteers by the type of help they offer, so that I can quickly find someone who matches what I need without feeling overwhelmed by too many options.

#### Acceptance Criteria

1. THE Filter_Panel SHALL display no more than four clearly labeled filter options at a time, each corresponding to a Support_Type (e.g., "Friendly Chat", "Grocery Help", "Tech Help", "Errands"), to keep the decision simple.
2. WHEN a Senior selects a Support_Type filter, THE Volunteer_Page SHALL update the displayed Volunteer_Cards to show only volunteers offering that Support_Type.
3. WHEN no volunteers match the selected filter, THE Volunteer_Page SHALL display a warm, reassuring message such as "No one is available for this right now — but we're working on it. Please check back soon."
4. WHEN a Senior clears or resets the filter, THE Volunteer_Page SHALL restore the full list of Volunteer_Cards.
5. THE Filter_Panel SHALL use large, clearly labeled buttons with a minimum touch target size of 44x44px and plain language labels (no abbreviations or jargon) to support seniors with limited dexterity and low technical confidence.
6. THE Filter_Panel SHALL allow only one filter to be active at a time, so the Senior is never managing multiple selections simultaneously.

---

### Requirement 3: View Volunteer Profile

**User Story:** As a Senior, I want to read more about a volunteer before reaching out, so that I feel comfortable, safe, and emotionally ready before making contact.

#### Acceptance Criteria

1. WHEN a Senior selects a Volunteer_Card, THE System SHALL display the Volunteer_Profile with the volunteer's full name, photo, bio, Support_Type(s), Availability_Status, and a short personal note written in a warm, friendly tone.
2. THE Volunteer_Profile SHALL include a clearly labeled "Ask for Help" button as the single primary action, so the Senior always knows what to do next.
3. THE Volunteer_Profile SHALL include a clearly labeled "Go Back" button that returns the Senior to the Volunteer_Page without losing their previous filter selection, so no progress is lost.
4. THE Volunteer_Profile SHALL use plain, friendly, non-technical language throughout, and SHALL NOT use any terms that require prior digital experience to understand.
5. THE Volunteer_Profile SHALL include a short reassuring phrase near the volunteer's photo, such as "This person is here to help — reaching out is a great first step", to reduce hesitation and encourage connection.

---

### Requirement 4: Submit a Support Request

**User Story:** As a Senior, I want to send a message to a volunteer asking for help, so that I can get the support I need without feeling overwhelmed, judged, or confused.

#### Acceptance Criteria

1. WHEN a Senior selects "Ask for Help" on a Volunteer_Profile, THE System SHALL display the Request_Form with no more than one input field visible at a time, to minimize cognitive load.
2. THE Request_Form SHALL include a single, clearly labeled text area with warm placeholder text such as "Tell us a little about what you'd like help with — there's no wrong answer."
3. THE Request_Form SHALL include a clearly labeled "Send My Request" button as the only primary action, styled prominently so the Senior always knows what to do next.
4. THE Request_Form SHALL include a clearly labeled "Cancel" button that returns the Senior to the Volunteer_Profile without submitting, and SHALL NOT ask for confirmation before cancelling, to avoid adding extra steps.
5. WHEN a Senior submits the Request_Form with an empty message, THE System SHALL display a gentle, non-alarming inline message such as "Just write a few words so your volunteer knows how to help — anything is fine."
6. WHEN a Senior successfully submits a Support_Request, THE System SHALL display a Confirmation_Message such as "Your request has been sent. [Volunteer Name] will be in touch soon — you're not alone, and help is on the way."
7. THE Request_Form SHALL NOT impose a time limit on the Senior for completing or submitting the form.
8. THE Request_Form SHALL use large input fields and buttons with a minimum touch target size of 44x44px.
9. THE Confirmation_Message SHALL remain visible on screen for at least 5 seconds and SHALL include an Emotional_Anchor phrase to leave the Senior feeling reassured, not anxious, after submitting.

---

### Requirement 5: Volunteer Views Incoming Requests

**User Story:** As a Volunteer, I want to see requests from seniors who need help, so that I can respond quickly and offer meaningful support.

#### Acceptance Criteria

1. WHEN a Volunteer views the Volunteer_Page, THE System SHALL display a clearly labeled "Requests for You" section listing all pending Support_Requests directed at that Volunteer.
2. THE Support_Request listing SHALL display the Senior's first name, the date the request was submitted, and the message content.
3. WHEN no pending Support_Requests exist, THE System SHALL display a warm, encouraging message such as "No new requests right now — thank you for being here. Your presence means a lot."
4. WHEN a Volunteer selects a Support_Request, THE System SHALL display the full request details and a single clearly labeled "I'll Help" button as the primary action.
5. WHEN a Volunteer accepts a Support_Request by selecting "I'll Help", THE System SHALL update the request status and display a confirmation message to the Volunteer such as "Wonderful — thank you. The senior will be notified that help is coming."
6. WHEN a Volunteer accepts a Support_Request, THE System SHALL send a notification to the Senior with a warm message such as "[Volunteer Name] has seen your request and is ready to help — you're in good hands."

---

### Requirement 6: Accessible and Senior-Friendly UI

**User Story:** As a Senior with low technical confidence, I want the volunteer page to be easy to read and use, so that I don't feel confused, pressured, or left behind.

#### Acceptance Criteria

1. THE Volunteer_Page SHALL support full keyboard navigation, allowing all interactive elements to be reached and activated using the Tab and Enter keys.
2. THE Volunteer_Page SHALL maintain a color contrast ratio of at least 4.5:1 between text and background colors on all components.
3. THE Volunteer_Page SHALL NOT rely solely on color to convey information — all status indicators SHALL include a visible text label.
4. ALL buttons and interactive elements on the Volunteer_Page SHALL have descriptive accessible labels (aria-label or visible text) written in plain, friendly language that clearly describes their action without technical terms.
5. WHEN a Senior completes any action (submitting a request, applying a filter, navigating back), THE System SHALL display clear, immediate, and warm feedback confirming the action was successful, so the Senior never wonders if something went wrong.
6. THE Volunteer_Page SHALL use a minimum font size of 18px for body text and 24px for headings throughout all components.
7. THE Volunteer_Page SHALL use warm colors (yellow, orange, soft red tones) consistent with NeighborCircle's design guidelines for all primary UI elements.
8. THE Volunteer_Page SHALL present no more than one primary action per screen at any time, so the Senior always has a clear, single next step and never faces decision fatigue.
9. THE Volunteer_Page SHALL NOT use technical error codes, system terminology, or jargon in any message shown to a Senior — all language SHALL be conversational, warm, and human.

---

### Requirement 7: Empty and Error States

**User Story:** As a Senior, I want to see helpful, kind messages when something goes wrong or nothing is available, so that I don't feel lost, blamed, or anxious.

#### Acceptance Criteria

1. WHEN the Volunteer_Page loads and no volunteers are available, THE System SHALL display a warm, reassuring message such as "Our neighbors are busy right now — please check back soon. You matter to us and we'll have someone here for you."
2. IF a Support_Request fails to submit, THEN THE System SHALL display a gentle, non-alarming error message such as "Something didn't go through — please try again. Your message is still here waiting for you." without clearing the Senior's typed message.
3. IF the Volunteer_Page fails to load volunteer data, THEN THE System SHALL display a friendly fallback message such as "We're having a little trouble loading right now — please try again in a moment" and a clearly labeled "Try Again" button.
4. THE System SHALL preserve the Senior's typed message in the Request_Form if a submission error occurs, so the Senior does not need to retype it.
5. ALL error and empty-state messages shown to a Senior SHALL include an Emotional_Anchor phrase to ensure the Senior feels supported rather than frustrated or abandoned, even when something goes wrong.

---

### Requirement 8: Reducing Loneliness Through Ongoing Emotional Presence

**User Story:** As a Senior, I want the volunteer page to feel warm and human at every step, so that simply using it makes me feel less alone — even before a volunteer responds.

#### Acceptance Criteria

1. THE Volunteer_Page SHALL display at least one Emotional_Anchor phrase at each major stage of the Senior's journey (browsing, viewing a profile, submitting a request, receiving confirmation), so the Senior feels accompanied throughout.
2. THE System SHALL use the Senior's first name in all Confirmation_Messages and notifications where the name is available, to make interactions feel personal rather than automated.
3. THE Volunteer_Page SHALL NOT display any countdown timers, urgency indicators, or language that implies the Senior must act quickly, as these create anxiety and undermine emotional safety.
4. WHEN a Senior has not yet submitted any Support_Request, THE Volunteer_Page SHALL display an encouraging prompt such as "It's easy to reach out — just pick someone and say hello. We'll guide you through it."
5. THE System SHALL use inclusive, dignity-preserving language in all Senior-facing text — avoiding phrases that imply dependency, helplessness, or age-related limitation.

---

## Data & State Considerations

This section outlines the data each component needs, how state is tracked, and how UI state should persist across navigation. All state is managed client-side using React `useState`, consistent with the current tech stack.

### Component Data Needs

| Component | Data Required |
|---|---|
| Volunteer_Page | List of all volunteers (id, name, photo, bio, supportTypes, availabilityStatus) |
| Volunteer_Card | name, photo, bio, supportTypes, availabilityStatus, requestStatus for current Senior |
| Filter_Panel | List of available Support_Types; currently active filter |
| Volunteer_Profile | Full volunteer object; requestStatus for current Senior |
| Request_Form | volunteerId, Senior's typed message (draft), submission status |
| Requests for You (Volunteer view) | List of Support_Requests directed at the logged-in Volunteer (senderName, date, message, status) |

### Request State Tracking

Each Support_Request has one of three states:

- `not_requested` — the Senior has not yet contacted this volunteer
- `requested` — the Senior has submitted a request; awaiting volunteer response
- `accepted` — the Volunteer has accepted the request ("I'll Help")

The Volunteer_Card and Volunteer_Profile use `requestStatus` to reflect this — e.g., disabling the "Ask for Help" button and showing "Request Sent" when status is `requested` or `accepted`.

### How Filters Affect Displayed Data

- The active filter is stored in a `activeFilter` state variable (string or `null` for "show all").
- The displayed volunteer list is derived by filtering the full volunteer array against `activeFilter`.
- No data is re-fetched when a filter changes — filtering happens on the already-loaded list.
- When `activeFilter` is `null`, all volunteers are shown (up to the 6-card default limit).

### UI State Persistence

- `activeFilter` is preserved in component state so that when a Senior navigates back from a Volunteer_Profile, the same filter is still applied.
- The Senior's in-progress message in the Request_Form is held in local state and is NOT cleared on submission errors, consistent with Requirement 7.
- No filter or form state is persisted to localStorage or a backend — a full page reload resets to the default view. This is intentional to keep the implementation simple.
