Speakeasy — Architecture

1. Technical Direction

Speakeasy should use a modern full-stack TypeScript architecture while remaining simple enough for a single developer to understand and maintain.

Initial stack:

* Next.js
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma ORM
* Secure authentication
* PWA support

A separate Express backend is not required.

Next.js should handle the application frontend and server-side functionality.

2. Database

Speakeasy requires PostgreSQL for registered-user persistence.

The database provider should use a free-tier PostgreSQL service during development.

Neon is the preferred initial option because the application only requires standard PostgreSQL functionality.

Supabase may be considered if there is a clear technical benefit.

The application should not depend unnecessarily on provider-specific database functionality.

3. ORM

Prisma should be used for database access.

Benefits:

* Type-safe database queries
* Clear schema
* Migration system
* Good integration with TypeScript
* Easy local development

Prisma 7 requires a driver adapter at runtime. The client connects through the Neon serverless driver via `@prisma/adapter-neon`, using the pooled `DATABASE_URL` (see `prisma.config.ts` for CLI/migration connections).

The generated client is written to `src/generated/prisma` and is gitignored; it is regenerated on install (`postinstall: prisma generate`).

4. Authentication

Authentication uses Auth.js (NextAuth v5) with the Prisma adapter.

The credentials provider provides email/password authentication.

Passwords must be securely hashed using the hashing mechanism provided by the authentication stack.

The application must never store plaintext passwords.

Google OAuth may be added if it does not significantly complicate the initial implementation.

Authentication should be isolated from practice logic so that guest mode can operate without authentication.

5. Guest Storage

Guest users should use browser-local persistence.

The local storage structure should contain only the information necessary to reproduce guest progress.

Potential guest data:

* Completed topic IDs
* Practice dates
* Ratings
* Guest settings
* A migration identifier/version if necessary

Preparation notes should remain in application state and do not need to be persisted.

Guest local data must be designed so it can later be migrated to the registered user’s account.

6. Guest Migration

After successful registration:

1. Read guest data.
2. Validate it.
3. Send eligible practice data to the server.
4. Associate practices with the new user.
5. Avoid duplicate records.
6. Apply relevant settings.
7. Clear migrated local data.

The migration process should be idempotent where practical.

If migration is interrupted, retrying should not create duplicate practice records.

7. Data Model

Initial conceptual schema:

User

User
- id
- email
- password/authentication fields
- createdAt
- updatedAt

UserSettings

UserSettings
- userId
- preparationDuration
- speakingDuration
- selectedCategories
- selectedDifficulties
- updatedAt

Topic

Topic
- id
- prompt
- category
- difficulty

Practice

Practice
- id
- userId
- topicId
- practicedAt
- rating

The exact Prisma schema may differ if implementation requires it.

8. Topic Selection

The topic bank is a shared TypeScript module (src/lib/topics.ts).

It is the single source of truth for topics, categories, and difficulty levels.

The bank currently contains 442 topics across 13 categories and three difficulty levels (easy/medium/challenge).

The module is bundled client-side so guest mode can select topics without a server connection, and the same module is reused when seeding the database.

Topic selection should be handled by a dedicated piece of application logic (src/lib/topicSelection.ts) rather than being embedded directly inside the UI.

The selector should:

1. Retrieve the user’s topic preferences.
2. Determine the eligible topic pool.
3. Exclude topics already completed by the user.
4. Randomly choose from remaining topics.
5. If the remaining pool is empty, reset the available pool.
6. Return the selected topic.

For guests, completed topic IDs come from local storage.

For registered users, completed topic IDs come from database-backed practice history.

The UI wheel is responsible for animation and presentation, not for deciding the business rules of topic selection.

9. Streak Calculation

Streak calculation should be based on completed practice dates rather than storing a manually incremented streak number as the primary source of truth.

This avoids inconsistencies if practices are migrated, deleted, synchronized, or created on multiple devices.

The application can calculate:

* Current streak
* Longest streak
* Whether today is completed

from the user’s practice history.

10. Calendar

The calendar should use practice dates to determine completed days.

Multiple practices on the same date count as one completed day for streak purposes.

11. Practice Flow State

The practice flow can be modeled as a finite set of stages:

IDLE
  ↓
TOPIC_SELECTED
  ↓
PREPARING
  ↓
SPEAKING
  ↓
REFLECTION
  ↓
COMPLETED

The user may transition:

PREPARING → SPEAKING

before the preparation timer finishes.

The user may transition:

SPEAKING → REFLECTION

before the speaking timer finishes.

The final transition:

REFLECTION → COMPLETED

persists the practice.

12. Temporary Notes

Preparation notes should be held in client-side state.

They should:

* Be available during the speaking stage if the design allows
* Not be sent to the database
* Be cleared when the practice ends

13. PWA

The application should provide:

* Web app manifest
* Appropriate icons
* Installable behavior
* Responsive mobile-first layout
* Appropriate viewport configuration
* Service worker functionality where appropriate

Offline support should be limited to what can be reliably supported without making the architecture unnecessarily complex.

Guest practice should remain usable without requiring an account.

14. UI Architecture

The UI should be component-based.

Potential major components:

Home
├── Header
├── StreakDisplay
├── CalendarButton
├── SettingsButton
└── TopicWheel
Practice
├── TopicDisplay
├── PreparationTimer
├── Notes
├── SpeakingTimer
└── PracticeControls
Reflection
└── RatingSelector
Calendar
└── PracticeCalendar
Settings
├── DurationSettings
├── CategorySettings
└── DifficultySettings

These are conceptual components. They should be split further only when there is a clear reason.

15. API / Server Logic

Server-side functionality should handle:

* Authentication
* User creation
* User settings
* Practice creation
* Practice history retrieval
* Guest migration
* Topic data where appropriate

Client-side functionality should handle:

* Timers
* Wheel animation
* Temporary notes
* Immediate UI state
* Guest-local state

16. Security

The application should:

* Validate all server inputs
* Never trust client-provided user IDs
* Derive authenticated user identity from the session
* Secure password handling
* Protect authenticated server actions
* Prevent users from reading or modifying another user’s practices
* Validate guest migration payloads
* Avoid storing unnecessary personal information

17. Maintainability

Keep business logic separate from visual components where practical.

Do not place topic selection, streak calculation, or migration logic directly inside large UI components.

Prefer small, testable functions.

Avoid unnecessary abstractions until they solve an actual problem.

18. Architecture Documentation Rule

Whenever a technical architecture decision changes, update this document.

The architecture document should describe the current implementation rather than outdated plans.