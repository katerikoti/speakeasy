Speakeasy — OpenCode Agent Instructions

Project

You are working on Speakeasy, a speaking-practice PWA.

Before making implementation decisions, read:

* README.md
* PRD.md
* ARCHITECTURE.md
* PLAN.md

These files describe the current project requirements and architecture.

Source of Truth

The project documentation is the source of truth.

Do not rely on assumptions from the original prompt if the current documentation says otherwise.

If documentation conflicts with another project file, identify the conflict and resolve it deliberately rather than silently choosing one.

Product Scope

Keep V1 focused on the core speaking-practice experience.

Do not introduce major features that are not specified in the current PRD.

Do not add unnecessary complexity simply because a feature could theoretically be useful.

Before Coding

Before starting a significant feature:

1. Read the relevant documentation.
2. Check the current implementation.
3. Identify existing patterns.
4. Plan the smallest reasonable implementation.
5. Implement incrementally.
6. Test the result.

Do not rewrite large parts of the application without a clear reason.

Code Quality

Prefer:

* TypeScript
* Clear naming
* Small reusable functions
* Strong typing
* Simple architecture
* Accessible HTML
* Responsive design
* Server-side validation
* Secure authentication practices

Avoid:

* Unnecessary abstractions
* Duplicated business logic
* Giant components
* Hardcoded user-specific data
* Client-side trust of sensitive values
* Storing unnecessary personal information

Business Logic

Keep important business logic separate from visual components where practical.

This includes:

* Topic selection
* Topic repetition rules
* Streak calculation
* Guest migration
* Practice persistence
* Settings validation

The UI should present and control these systems rather than contain all of their business rules.

Topic System

The topic system must follow the documented unused-topic behavior.

The user should receive a random topic from the currently available unused pool.

Once all eligible topics have been completed, the pool may reset.

Do not implement a simple unrestricted random selection that can repeatedly return recently used topics.

Guest Mode

Guest mode must remain usable without registration.

Do not add authentication requirements to the core practice flow.

Guest progress must be stored locally and designed so it can be migrated to a registered account.

Authentication

Never store plaintext passwords.

Never trust a client-provided user ID for authorization.

Authenticated operations must determine the current user from the authenticated session.

Users must only be able to access their own practices and settings.

Temporary Notes

Preparation notes are temporary.

Do not add database persistence for preparation notes unless the PRD is explicitly changed.

Timers

Timers must remain reliable when:

* The browser tab loses focus
* The component re-renders
* The user starts early
* The user finishes early
* The timer reaches zero

Do not implement timers solely by assuming that a repeated interval callback will always execute exactly on schedule.

Design

Follow the current visual direction:

* Warm
* Elegant
* Calm
* Minimal
* Slightly playful

Primary palette:

* #EDEDE9
* #D6CCC2
* #F5EBE0
* #E3D5CA
* #D5BDAF

The wheel may use different shades from the same neutral palette.

Do not introduce unrelated bright colors unless the design requirements are explicitly changed.

The application should be mobile-first.

Dependencies

Do not add a dependency without a reason.

Before adding a significant dependency:

* Check whether the functionality can reasonably be implemented with the existing stack.
* Consider maintenance and bundle size.
* Use established libraries for security-sensitive functionality rather than implementing cryptography or authentication primitives manually.

Database

Use Prisma for database access.

Keep database logic organized and type-safe.

Do not expose database credentials to the client.

Use environment variables for secrets and connection strings.

Testing

After implementing a meaningful feature:

* Run the relevant tests if available.
* Run TypeScript checks.
* Run linting where configured.
* Test the feature manually when appropriate.

Fix errors before moving to unrelated features.

Documentation Updates

This is mandatory.

Whenever a product, UX, scope, technical, or implementation decision is made or changed during development:

* Update PRD.md if product requirements or behavior changed.
* Update PLAN.md if the development plan or task status changed.
* Update ARCHITECTURE.md if technical architecture changed.
* Update AGENTS.md if project-wide development-agent rules changed.

Do not leave documentation outdated.

If a decision is made during a conversation with the developer, incorporate it into the appropriate documentation before continuing with implementation when practical.

Significant Changes

If you discover that a requirement is technically problematic, ambiguous, or likely to create unnecessary complexity:

1. Explain the issue.
2. Propose a solution.
3. Do not silently change the product requirement.

For small implementation details, use reasonable engineering judgment.

For product-level decisions, ask before changing direction.

Commits

Speakeasy is its own git repository at coding/speakeasy, separate from the workspace repo that previously tracked all coding projects.

All Speakeasy commits belong in this project's repository. Never commit unrelated workspace changes.

Keep changes logically grouped.

Prefer small, meaningful commits rather than one huge commit containing unrelated changes.

Commit messages should clearly describe the change.

General Rule

Build the simplest robust version that satisfies the documented requirements.

Do not over-engineer Speakeasy.