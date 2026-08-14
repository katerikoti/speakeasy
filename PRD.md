Speakeasy — Product Requirements Document

1. Product Overview

Speakeasy is a speaking-practice web application designed to help users improve their ability to speak clearly, confidently, and spontaneously.

The application provides a simple daily exercise:

Spin → Prepare → Speak → Reflect

The experience should be quick enough to use every day while still providing enough structure to make the practice meaningful.

2. Problem

People can improve their speaking skills through deliberate practice, but practicing alone can be difficult because they may not know:

* What to talk about
* How long to prepare
* How long to speak
* Whether they are practicing consistently
* How to make the practice a daily habit

Speakeasy solves this by providing a structured speaking challenge with minimal friction.

3. Target User

The primary target user is someone who wants to improve their:

* Public speaking
* Communication skills
* Confidence while speaking
* Ability to organize thoughts quickly
* Ability to speak without excessive filler words
* Ability to discuss unfamiliar or unexpected subjects

The app should not require professional speaking knowledge.

4. Product Principles

Simple

The user should be able to open the application and begin practicing immediately.

Low friction

Registration should not be required to use the core experience.

Daily

The application should encourage consistent daily practice through a streak and calendar.

Varied

Users should encounter many different topics instead of repeatedly receiving the same subjects.

Flexible

Registered users should be able to configure practice duration and topic preferences.

Focused

V1 should concentrate on the speaking exercise itself rather than becoming a large productivity platform.

5. Core User Experience

5.1 Home Screen

The home screen is the primary entry point.

It should be visually simple.

The main element is the topic wheel.

The upper navigation should provide access to:

* Calendar
* Settings
* Current streak

The exact navigation arrangement may be refined during UI implementation.

The primary action is the wheel.

The user should not need to navigate through a dashboard before starting a practice.

5.2 Starting a Practice

The user spins the wheel.

The wheel animates and selects a topic.

The selected topic is displayed clearly.

The application then begins the preparation stage.

5.3 Topic Selection

Each topic has at minimum:

* Unique ID
* Question/prompt
* Category
* Difficulty

The topic bank should contain a large number of carefully selected topics.

Topics should cover different areas of life and should not be overly simple or overly specialized.

Topic categories

The initial category system should include:

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

The category list may be refined during implementation if there is a clear product reason.

Topic difficulty

Topics may have:

* Easy
* Medium
* Challenge

Difficulty should reflect how much thought or structure the topic generally requires.

5.4 Topic Repetition

Speakeasy should prioritize unused topics.

When selecting a topic:

1. Determine the user’s available topic pool.
2. Remove topics the user has already completed.
3. Randomly select from the remaining topics.
4. Animate the wheel and reveal the selected topic.
5. If no unused topics remain, reset the pool and allow topics to repeat.

The wheel should visually spin on every practice.

Registered users

Previously completed topics are determined from their stored practice history.

Guest users

Previously completed topics are tracked locally on the device.

5.5 Preparation Stage

After selecting a topic, the user enters preparation.

The topic remains clearly visible.

The user can optionally write notes.

Notes are temporary and are not required to be saved permanently.

The preparation timer uses the user’s configured preparation duration.

The user may start speaking before the preparation timer reaches zero.

The user should be able to skip preparation if their settings allow immediate practice or if the UI provides an explicit start action.

5.6 Speaking Stage

Before speaking begins, a short get-ready countdown (3, 2, 1) is shown on the screen.

The countdown appears after preparation finishes or when the user chooses to start early.

The topic remains accessible while speaking.

The user starts the speaking timer when ready.

The speaking duration is configurable.

Initial useful durations should include:

* 0.5 minutes
* 1 minute
* 2 minutes
* 3 minutes
* 5 minutes

The user can finish early.

When the timer reaches zero, the speaking stage ends automatically.

No recording functionality is required for V1.

5.7 Reflection Stage

After speaking, the user gives themselves a simple rating.

The rating can use an intuitive visual scale, such as:

* Emoji-based rating
* 1–5 slider

The exact UI can be decided during implementation.

The rating should be quick and optional if appropriate.

5.8 Practice Completion

Completing the reflection stage records the practice as completed.

The practice should include:

* User
* Practice date/time
* Topic
* Rating

Preparation notes are not saved.

For registered users the practice is saved to their account in the database, so their history, streak, and calendar persist across devices and browsers.

The completed practice contributes to the user’s streak and calendar.

5.9 About Page

The application includes a public about page (at /about) that can be shared as a link to introduce new or prospective users.

The about page:

* Explains what the application is in a short paragraph
* Summarizes the practice flow (Spin, Prepare, Speak, Reflect)
* Provides a button to open the application
* Provides device-appropriate instructions for adding the application to the home screen
* Notes that no account is required to start and that guest progress can be kept with a later registration

The about page is public and does not require authentication.

6. Guest Experience

Guest users can use the full core practice flow without creating an account.

Guest data is stored locally.

Guest users should be able to see their current practice progress (such as their streak) during the current device/session.

Calendar and settings are registered-user features. Guests do not see the calendar or settings.

After completing a practice, the application may encourage registration.

The encouragement appears only after the guest's first completed practice. Guests who already have past practices recorded on the device are not shown the prompt again.

The registration message should explain the benefit clearly, for example:

* Keep your streak
* Save your practice history
* Access your progress from other devices

Registration should never be required before the first practice.

7. Guest-to-Account Migration

Only the guest's most recent practice is carried over to their account when they register.

When a guest creates an account:

1. Read the locally stored guest practice history.
2. Create the user's account.
3. Transfer only the most recently completed guest practice to the user's account.
4. Ignore all older guest practices; they are not migrated.
5. Display the user's history/streak based on the transferred practice.

A guest who completed one practice before registering should therefore have that practice count toward their account history and streak. A guest with several past practices keeps their local guest history on the device, but only the latest practice appears in the account.

Migration must be idempotent and avoid creating duplicate practices.

8. Registered User Settings

Registered users should be able to configure:

Preparation duration

The user can select their preferred preparation duration.

Initial useful durations include 0.5, 1, 2, and 3 minutes.

Speaking duration

The user can select their preferred speaking duration.

Categories

The user can select which topic categories they want included in their topic pool.

Difficulty

Users can select which difficulty levels they want included in their topic pool.

Settings should have sensible defaults so users can begin immediately without configuring anything.

9. Calendar

The calendar shows which days the user completed at least one practice.

The week starts on Monday.

Selecting a completed day shows the topics practiced on that day.

The calendar is available to registered users only.

Guests do not see the calendar.

The primary purpose is habit tracking.

Completed days show the topic prompts practiced that day, so the calendar doubles as a light practice history.

When a topic has a saved rating, the rating is shown with the topic in the day detail.

A completed day should be visually distinguishable from an uncompleted day.

10. Streak

A streak represents consecutive days on which the user completed at least one practice.

The streak should update when a practice is completed.

The application should correctly handle:

* First practice
* Consecutive days
* Missed days
* Returning after a missed day
* Multiple practices on one day
* Guest-to-account migration

A user should not gain multiple streak days by completing multiple practices on the same calendar day.

11. Data Requirements

The minimum persistent data model should include:

User

* ID
* Email
* Password hash or authentication identifier
* Created timestamp
* Settings

Practice

* ID
* User ID
* Topic ID or topic reference
* Practice date/time
* Rating

Topic

* ID
* Prompt/question
* Category
* Difficulty

Temporary preparation notes should not be stored in the database.

12. Authentication

Email/password authentication should be supported.

Google authentication may also be implemented if it can be added without creating unnecessary complexity or delaying the core V1 experience.

Authentication implementation must follow secure password-handling practices.

Passwords must never be stored as plaintext.

13. PWA

Speakeasy should be installable as a Progressive Web App.

The application should work well on:

* Mobile phones
* Tablets
* Desktop browsers

The design should be mobile-first because daily speaking practice is likely to happen on a phone.

On larger screens the content containers widen and the text scales up so the interface fills the available space instead of staying in a narrow mobile column.

14. Visual Design

The application should use a warm neutral visual identity.

Primary colors:

* #EDEDE9
* #D6CCC2
* #F5EBE0
* #E3D5CA
* #D5BDAF

The wheel can use multiple shades from this palette.

The interface should feel:

* Calm
* Elegant
* Warm
* Clean
* Approachable

Avoid excessive decoration, visual clutter, gradients, or unrelated bright colors unless a later design decision explicitly changes this direction.

15. V1 Scope

Included

* Home screen
* Topic wheel
* Topic bank
* Topic categories
* Topic difficulty
* Random unused-topic selection
* Preparation timer
* Temporary notes
* Speaking timer
* Early start
* Early finish
* Self-rating
* Practice completion
* Streak
* Calendar
* Settings
* Guest mode
* Registration/login
* Guest-to-account migration
* Database persistence
* PWA support

Not Required for V1

The following should not be implemented unless explicitly added to the requirements later:

* Audio recording
* Complex analytics
* Social features
* Public profiles
* Leaderboards
* Messaging
* Payments
* Subscription system
* Complex achievement systems
* AI-powered features
* Large administrative interfaces

16. Product Documentation Rule

The PRD is a living document.

Whenever a product decision, UX decision, feature decision, scope decision, or user-flow decision changes during development, the PRD must be updated to reflect the new decision.

The current PRD represents the current intended product behavior and should be treated as a source of truth.

Changes should not be made silently.

17. Success Criteria

V1 is successful if a new user can:

1. Open Speakeasy without registering.
2. Spin the wheel.
3. Receive an appropriate speaking topic.
4. Prepare with optional notes.
5. Speak for the configured duration.
6. Finish early if desired.
7. Rate the practice.
8. See that the day was completed.
9. Repeat the process on another day.
10. Register later and retain their previous progress.

The experience should feel simple enough that a user would realistically want to practice every day.