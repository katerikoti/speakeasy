Speakeasy

Speakeasy is a web app for practicing speaking skills through short, structured daily speaking exercises.

The user receives a random speaking topic, gets a configurable amount of preparation time, makes optional notes, and then speaks about the topic for a configurable amount of time. After finishing, they rate how the practice felt.

The app is designed to make speaking practice simple enough to do every day.

Core Flow

Spin → Prepare → Speak → Reflect → Done

1. The user opens Speakeasy.
2. The user spins the topic wheel.
3. Speakeasy selects a random unused topic.
4. The user gets preparation time and can make optional notes.
5. The user starts speaking when ready.
6. A speaking timer runs for the configured duration.
7. The user can finish speaking early.
8. The user gives themselves a simple rating.
9. The practice is recorded as completed.
10. The user’s streak and calendar update.

Guest Mode

Speakeasy can be used without registration.

Guest users can complete practices normally. Their practice progress is stored locally on the device.

After completing a practice, guests may be encouraged to create an account so their progress can be saved permanently and synchronized across devices.

When a guest creates an account, their existing local practice history and progress should be migrated to their new account.

Registered Users

Registered users can:

* Keep their practice history
* Maintain their streak across devices
* View their practice calendar
* Configure preparation duration
* Configure speaking duration
* Select preferred topic categories
* Configure other available practice preferences

Topics

Speakeasy contains a large collection of speaking topics covering many areas of life.

Topics should be:

* Accessible without specialist knowledge
* Interesting enough to require thought
* Open-ended enough to support extended speaking
* Suitable for speaking practice rather than one-word answers

Topic categories include areas such as:

* Everyday Life
* Personal
* Opinions
* Society
* Technology
* Work & Career
* Communication
* Relationships
* Travel & Culture
* Creativity
* Hypothetical
* Situational
* Fun & Random

Topics may also have difficulty levels.

Topic Selection Rule

Speakeasy should prioritize topics the user has not previously completed.

The wheel still visually spins every time, but the selected topic should come from the user’s unused topic pool.

When the user has completed every available topic in their current pool, the pool resets and previously completed topics may begin appearing again.

Design Direction

The visual style should be:

* Warm
* Elegant
* Calm
* Minimal
* Slightly playful

The primary visual direction uses warm beige and neutral tones.

Suggested palette:

* Parchment — #EDEDE9
* Bone — #D6CCC2
* Linen — #F5EBE0
* Almond Cream — #E3D5CA
* Almond Silk — #D5BDAF

The wheel may use different shades from this same palette to visually separate its sections.

Avoid introducing a rainbow or unrelated bright color palette.

V1 Goals

V1 should provide a complete, usable speaking-practice experience including:

* Guest mode
* User registration and login
* Topic wheel
* Large topic collection
* Topic categories
* Topic difficulty
* Preparation timer
* Optional preparation notes
* Speaking timer
* Early start and early finish controls
* Self-rating
* Practice streak
* Practice calendar
* User settings
* Guest-to-account progress migration
* PWA functionality

Development Philosophy

Speakeasy should remain simple and focused.

The application should prioritize the quality of the core speaking-practice experience over adding large numbers of secondary features.

Product decisions should be documented in the project documentation so that the documentation remains the source of truth throughout development.