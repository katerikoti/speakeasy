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

Authentication uses Auth.js (NextAuth v5, `next-auth` 5.0.0-beta) with the Prisma adapter.

The credentials provider provides email/password authentication.

Sessions use the JWT strategy (required for credentials sign-in). The user id is written into the session via the `session` callback from the token `sub` claim, and `src/lib/session.ts` exposes `requireUserId()` for server-side route protection. Authenticated operations always derive the user id from the session, never from the client.

The Auth.js config sets `trustHost: true` so session lookups work across tabs and hosts in all environments, and an explicit 30-day `session.maxAge`.

Passwords are hashed with bcryptjs (12 rounds) before storage (`src/lib/passwords.ts`) and verified in the credentials `authorize` callback.

Registration is handled by `POST /api/auth/register`, which validates input server-side, creates the user together with their default `UserSettings` in a transaction, and rejects duplicate emails.

The application must never store plaintext passwords.

Google OAuth may be added later if it does not significantly complicate the initial implementation. The Auth.js adapter models (Account, Session, VerificationToken) already exist in the schema to support it.

Authentication is isolated from practice logic so that guest mode can operate without authentication.

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

When a guest registers, only their most recently completed practice is transferred to the account.

Migration runs from the registration form after the new session is established. The client reads the latest guest practice from local storage and submits it to the `migrateLatestPracticeAction` server action, which derives the user from the authenticated session, validates the topic id, rating, and date server-side, and upserts the practice idempotently. Older guest practices are intentionally not migrated.

The migration process is idempotent: re-running it never creates duplicate practice records.

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

The calendar is a registered-user feature.

Guests do not see the calendar or settings in the header.

The `/calendar` route is protected with `requireUserId` and redirects guests to `/login`.

The calendar page is server-rendered: it reads the authenticated user's practices from the database and passes them to the client `PracticeCalendar`, which uses practice dates to determine completed days.

Selecting a completed day shows the topics practiced on that day, including each practice's saved rating when one was given.

Multiple practices on the same date count as one completed day for streak purposes.

11. Practice Flow State

The practice flow can be modeled as a finite set of stages:

IDLE
  ↓
TOPIC_SELECTED
  ↓
PREPARING
  ↓
COUNTDOWN
  ↓
SPEAKING
  ↓
REFLECTION
  ↓
COMPLETED

The user may transition:

PREPARING → COUNTDOWN

before the preparation timer finishes (via the explicit start action).

A 3-second get-ready countdown runs between preparation and speaking.

The countdown uses the same wall-clock-driven tick pattern as the other timers and cannot be skipped.

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

Layout is mobile-first: content containers use a narrow `max-w-md` width on small screens and widen to `max-w-2xl` on desktop, with slightly larger display text, so the interface uses the available space on larger screens while remaining compact on phones.

Offline support should be limited to what can be reliably supported without making the architecture unnecessarily complex.

Guest practice should remain usable without requiring an account.

14. UI Architecture

The UI should be component-based.

Potential major components:

Home
├── Header
├── StreakDisplay
├── CalendarButton (authenticated only)
├── SettingsButton (authenticated only)
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

Practice persistence for registered users is handled by the `savePracticeAction` server action (`src/app/actions.ts`), which derives the user from the authenticated session, validates the topic id and rating server-side, and upserts the practice idempotently. Completed practices are written to the database, and the home route reads the user's practice history server-side so streak, topic selection, and the calendar are all backed by the account rather than local storage.

The home route (`src/app/page.tsx`) reads the current user's settings and practice history and passes them to the client `HomeClient`; guests receive defaults and empty history and keep using local storage.

User settings are managed through a `/settings` page (server-rendered, protected by `requireUserId`). The settings form posts to the `updateSettingsAction` server action (`src/app/actions.ts`), which validates input server-side against the allowed duration options and the valid category/difficulty lists, persists the `UserSettings` row, and revalidates the route.

Settings flow into the practice flow as a prop: the home route reads the current user’s settings (defaults for guests) and passes them to the client `HomeClient`, which uses them for timer durations and topic-pool preferences.

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