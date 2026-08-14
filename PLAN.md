Speakeasy — Development Plan

This is a living development plan.

Tasks should be completed in small, understandable increments.

Do not implement large unrelated features together.

Phase 0 — Project Foundation

* Create Next.js project — done
* Configure TypeScript — done
* Configure Tailwind CSS — done
* Establish project folder structure — done
* Add basic linting/formatting — done (ESLint)
* Create initial README — done
* Create documentation files — done
* Confirm development server works — done

Phase 1 — Visual Foundation

* Establish Speakeasy visual identity — done
* Add warm neutral color palette — done
* Establish typography — done (Geist sans + Lora display)
* Create responsive page shell — done (mobile-first; containers widen to md:max-w-2xl with larger headings on desktop)
* Create header/navigation — done (streak + sign in for guests; name text, sign-out icon, calendar/settings links for authenticated users only)
* Create initial home screen — done
* Create topic wheel visual component — done (30 alternating light/dark neutral slices for a multi-part look)
* Reveal topic after spin — done (wheel is replaced by the topic card; a small "Spin again" button reopens the wheel)
* Ensure mobile-first layout — done

Phase 2 — Topic System

* Define topic data structure — done (src/lib/topics.ts)
* Define categories — done (13 categories)
* Define difficulty levels — done (easy/medium/challenge)
* Create initial topic bank — done (442 topics)
* Implement random topic selection — done (src/lib/topicSelection.ts)
* Implement unused-topic filtering — done
* Implement topic pool reset when all topics are completed — done
* Connect topic selection to wheel animation — done (deterministic segment landing)

The initial topic bank should contain a large number of high-quality topics rather than a small placeholder collection.

Phase 3 — Core Practice Flow

* Implement topic selection screen/state — done
* Implement preparation stage — done
* Implement preparation countdown — done (wall-clock timestamp based)
* Implement optional notes — done (client state only, not persisted)
* Allow starting speaking before preparation ends — done
* Add get-ready countdown before speaking — done (3, 2, 1, wall-clock based, cannot be skipped)
* Implement speaking timer — done (wall-clock timestamp based)
* Allow early speaking completion — done
* Implement reflection stage — done
* Implement self-rating — done (optional 1–5 scale)
* Persist completed practice for guest users locally — done (src/lib/guestStorage.ts)
* Update local progress after completion — done (completed topic feeds unused-topic filtering)

Phase 4 — Guest Experience

* Define guest storage format — done (versioned, src/lib/guestStorage.ts)
* Store completed topic IDs locally — done (derived from practices)
* Store practice dates locally — done
* Store ratings locally — done
* Calculate guest streak — done (src/lib/streak.ts, derived from dates)
* Display guest streak — done (header pill)
* Display guest calendar — removed (calendar is now a registered-user feature; /calendar is protected with requireUserId)
* Handle local storage versioning if needed — done (version: 1)
* Encourage registration after first completed practice — done (modal shown only to guests, only when local history contains exactly the just-completed practice; dismissible)
* Provide public about page — done (/about, landing-style page with sticky nav, hero + wheel, about/how-it-works/how-to-install sections, footer, open-app button, install guide, no auth required)

Phase 5 — Database

* Set up PostgreSQL database — done (Neon free tier, pooled DATABASE_URL)
* Configure Prisma — done (Prisma 7, prisma.config.ts, Neon driver adapter)
* Create Prisma schema — done (users/accounts/sessions/topics/practices/settings)
* Create migrations — done (prisma/migrations/20260813113726_init)
* Seed topic data — done (prisma/seed.ts, 442 topics)
* Create database access layer — done (src/lib/db.ts, src/lib/db/practices.ts)
* Test database connection — done

Phase 6 — Authentication

* Implement email registration — done (POST /api/auth/register, server-validated)
* Implement secure password handling — done (bcryptjs, 12 rounds)
* Implement login — done (credentials provider, /login)
* Implement logout — done (signOutAction)
* Implement authenticated session handling — done (JWT strategy, /api/auth/[...nextauth])
* Protect authenticated operations — done (requireUserId from session)
* Add Google authentication if practical without delaying core functionality — deferred (needs Google OAuth credentials)
* Fix session dropping when switching tabs — done (trustHost: true + explicit 30-day session.maxAge)

Phase 7 — Guest-to-Account Migration

* Transfer only the latest guest practice — done (migrateLatestPracticeAction, runs from the registration form after sign-in; server-validated, idempotent upsert)
* Transfer relevant settings — removed (settings defaults are used for new accounts)
* Prevent duplicate practices — done (upsert by practice id)
* Test registration after one completed practice
* Test registration after multiple completed practices
* Test interrupted/repeated migration

Phase 8 — Registered User Experience

* Load registered user’s practice history — done (home route reads DB practices server-side and passes them to HomeClient)
* Store completed practices in database — done (savePracticeAction, server-validated, idempotent upsert; completed stage says "saved to your account")
* Implement registered-user topic filtering — done (completed topic set comes from account history)
* Implement registered-user topic repetition reset — done (topicSelection resets pool from account history)
* Calculate registered streak — done (currentStreak over account practice dates)
* Implement practice calendar — done (server-rendered from DB practice history; completed days show the topics practiced with saved ratings)
* Implement settings — done (/settings page, updateSettingsAction server action, server-validated)
* Implement preparation duration setting — done (0.5/1/2/3 minutes, persisted in UserSettings, fed into the practice flow)
* Implement speaking duration setting — done (0.5/1/2/3/5 minutes, persisted in UserSettings, fed into the practice flow)
* Implement category selection — done (persisted in UserSettings, feeds topic-pool preferences)
* Implement difficulty selection — done (persisted in UserSettings, feeds topic-pool preferences)

Phase 9 — PWA

* Add web app manifest — done (src/app/manifest.ts, standalone, parchment theme)
* Add application icons — done (512px icon.png + 180px apple-icon.png; served as favicon, apple-touch-icon, and manifest icons)
* Configure installable PWA behavior
* Test mobile installation
* Test desktop installation
* Test responsive behavior

Phase 10 — Testing & Polish

* Test guest practice flow
* Test registered practice flow
* Test timers
* Test early-start behavior
* Test early-finish behavior
* Test topic selection
* Test topic repetition reset
* Test streak calculation
* Test calendar
* Test guest migration
* Test authentication
* Test mobile layout
* Test desktop layout
* Test edge cases
* Fix accessibility issues
* Fix visual inconsistencies
* Remove unnecessary code
* Review performance

Phase 11 — Deployment

* Choose production hosting
* Configure production environment variables
* Configure production database
* Run production migrations
* Deploy application
* Test production authentication
* Test production database
* Test PWA installation
* Test guest-to-account migration in production
* Final V1 review

Development Rules

Work Incrementally

Complete one coherent feature at a time.

Do not implement multiple unrelated phases simultaneously.

Keep V1 Focused

Do not introduce features that are not part of the current requirements without discussing the change first.

Verify

After meaningful changes:

* Run the application
* Test the affected feature
* Check for TypeScript errors
* Check for linting/build errors where appropriate

Documentation Must Stay Current

Whenever a product, UX, scope, technical, or implementation decision is made or changed:

1. Update the relevant documentation.
2. Update PRD.md when product behavior or requirements change.
3. Update PLAN.md when the development plan or task status changes.
4. Update ARCHITECTURE.md when technical architecture changes.
5. Update AGENTS.md only when project-wide agent/development rules change.

Documentation must reflect the current state of the project.

The documentation is the source of truth, not the original project prompt.

Do Not Hide Decisions

If implementation reveals that an existing requirement is problematic, stop and explain the issue rather than silently changing the product behavior.

Discuss the proposed change before making a significant product-level change.