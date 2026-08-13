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
* Create responsive page shell — done
* Create header/navigation — done (streak pill, calendar/settings buttons)
* Create initial home screen — done
* Create topic wheel visual component — done (10-segment palette wheel)
* Ensure mobile-first layout — done

Phase 2 — Topic System

* Define topic data structure — done (src/lib/topics.ts)
* Define categories — done (13 categories)
* Define difficulty levels — done (easy/medium/challenge)
* Create initial topic bank — done (130 topics)
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
* Display guest calendar — done (/calendar)
* Handle local storage versioning if needed — done (version: 1)

Phase 5 — Database

* Set up PostgreSQL database — pending (Neon, needs DATABASE_URL)
* Configure Prisma — done (Prisma 7, prisma.config.ts, Neon adapter)
* Create Prisma schema — done (users/accounts/sessions/topics/practices/settings)
* Create migrations — pending (needs DATABASE_URL)
* Seed topic data — pending (seed script ready, prisma/seed.ts)
* Create database access layer — done (src/lib/db.ts, src/lib/db/practices.ts)
* Test database connection — pending (needs DATABASE_URL)

Phase 6 — Authentication

* Implement email registration
* Implement secure password handling
* Implement login
* Implement logout
* Implement authenticated session handling
* Protect authenticated operations
* Add Google authentication if practical without delaying core functionality

Phase 7 — Guest-to-Account Migration

* Define migration payload
* Validate guest data server-side
* Transfer guest practices
* Transfer relevant settings
* Prevent duplicate practices
* Clear migrated guest data
* Test registration after one completed practice
* Test registration after multiple completed practices
* Test interrupted/repeated migration

Phase 8 — Registered User Experience

* Load registered user’s practice history
* Store completed practices in database
* Implement registered-user topic filtering
* Implement registered-user topic repetition reset
* Calculate registered streak
* Implement practice calendar
* Implement settings
* Implement preparation duration setting
* Implement speaking duration setting
* Implement category selection
* Implement difficulty selection if included

Phase 9 — PWA

* Add web app manifest
* Add application icons
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