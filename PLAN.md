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

* Establish Speakeasy visual identity
* Add warm neutral color palette
* Establish typography
* Create responsive page shell
* Create header/navigation
* Create initial home screen
* Create topic wheel visual component
* Ensure mobile-first layout

Phase 2 — Topic System

* Define topic data structure
* Define categories
* Define difficulty levels
* Create initial topic bank
* Implement random topic selection
* Implement unused-topic filtering
* Implement topic pool reset when all topics are completed
* Connect topic selection to wheel animation

The initial topic bank should contain a large number of high-quality topics rather than a small placeholder collection.

Phase 3 — Core Practice Flow

* Implement topic selection screen/state
* Implement preparation stage
* Implement preparation countdown
* Implement optional notes
* Allow starting speaking before preparation ends
* Implement speaking timer
* Allow early speaking completion
* Implement reflection stage
* Implement self-rating
* Persist completed practice for guest users locally
* Update local progress after completion

Phase 4 — Guest Experience

* Define guest storage format
* Store completed topic IDs locally
* Store practice dates locally
* Store ratings locally
* Calculate guest streak
* Display guest streak
* Display guest calendar
* Handle local storage versioning if needed

Phase 5 — Database

* Set up PostgreSQL database
* Configure Prisma
* Create Prisma schema
* Create migrations
* Seed topic data
* Create database access layer
* Test database connection

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