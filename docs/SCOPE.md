# MashCode Scope

This document defines what belongs in v0 and what should wait. It is intended to prevent scope drift while keeping the project vision intact.

## V0 Goal

Ship a real vertical slice of MashCode:

1. Users can sign up, create a profile, and log in.
2. Users can practice approved problems.
3. Users can enter ranked matchmaking.
4. Two users can play a live 1v1 ranked coding match.
5. Submissions are judged securely.
6. Ratings and ranks update after ranked matches.
7. Admins and problem managers can manage problems.
8. The system can support AI-generated problem candidates, even if the full automated generation pipeline is completed after the core match loop.

The hardest product risk is the live match, judge, and rating loop. V0 should prove that loop before expanding into broader social, contest, or AI-heavy features.

## In Scope For V0

### Authentication And Profiles

- Email/password authentication.
- GitHub authentication.
- Verified email required before ranked matchmaking.
- Permanent unique username set at account creation.
- Editable display name.
- Editable profile picture.
- Editable bio.

### Roles And Permissions

- Owner role.
- Admin role.
- Problem manager role.
- User role.
- Owner can manage admin and problem-manager assignment.
- Admin can manage users, problems, reports, and operational controls.
- Problem manager can create, edit, approve, deny, retire, and otherwise manage all problems.
- User can play, practice, submit, view public areas, and report issues.

### Ranked 1v1

- One global ranked queue.
- 15-minute ranked match timer.
- 30-second ready screen after matchmaking.
- Opponent profile preview with rating and rank.
- Both players receive the same problem.
- Users can choose or switch language after the problem is revealed.
- Users can submit multiple times and in multiple languages.
- Winner is first accepted submission.
- If neither player solves, decide by progress, then earliest best submission, then draw.
- 90-second disconnect grace period.
- Forfeit loss if one player does not reconnect.
- Cancel with no rating change if a player fails to ready in time.

### Matchmaking

- Match by global rating.
- Start search within plus or minus 100 rating.
- Widen by 100 rating every 15 seconds.
- Cap widening at plus or minus 500 rating.
- After 90 seconds, offer practice or continued waiting.
- If ranked problem inventory is empty, ranked queue is unavailable and users are routed to practice.

### Rating And Ranks

- Use a Glicko-2 style internal rating model.
- Display a simple integer rating publicly.
- First 5 ranked matches are provisional.
- Provisional users are not shown on the public leaderboard.
- Rating changes use result, opponent rating, and rating uncertainty.
- Do not include solve speed, language, problem rating, or test progress directly in rating changes.

### Practice

- Separate practice pool from ranked pool.
- Practice submissions do not affect rating.
- Retired or consumed ranked problems can become practice problems.
- Users can upsolve ranked problems after a match ends.
- Practice can show richer feedback than ranked, but source code remains private.

### Problems

- Problem metadata includes title, statement, input format, output format, constraints, sample tests, hidden tests, checker type, tags, difficulty label, rating, time limit, memory limit, allowed languages if restricted, reference solution, editorial notes, source, lifecycle status, ranked eligibility, and practice eligibility.
- Problems can use exact-output judging.
- Problems can use Codeforces-style custom C++ checkers.
- Interactive problems are not supported in v0.
- Problem rating is fixed at approval for v0, with admin adjustment allowed later.

### Judging

- Support C++17, C++20, Python 3, Java 17, JavaScript, TypeScript, Go, Rust, C#, and Kotlin.
- Run submissions in isolated disposable sandboxes.
- Block network access from submitted code.
- Enforce CPU, memory, process, filesystem, and wall-time limits.
- Normalize verdicts: accepted, wrong answer, time limit exceeded, memory limit exceeded, runtime error, compile error, internal error.
- Store full source code privately.
- Show submission source only to the submitter and authorized admins.

### AI Problem Pipeline

- Generate problem statement, sample tests, hidden tests, tags, difficulty estimate, rating estimate, checker when needed, and editorial/reference solution.
- Use a separate solver context to generate an independent solution.
- Run both reference and independent solutions against generated tests.
- Run intentionally wrong or brute-force solutions to verify hidden test strength.
- Validate input/output format and constraints.
- Store generation logs, model versions, verification status, and audit history.
- Periodic generation jobs.
- Manual generation batches by difficulty, rating, or tags.
- Admin dashboard aggregation for review and approval.

### Admin Dashboard

- Ranked problem inventory by rating band.
- Practice problem inventory.
- Generated candidates awaiting review.
- Failed verification count.
- Recent suspicious matches and reports.
- Active ranked matches.
- Queued users.
- Judge health.
- Generation pipeline status.
- Recent approvals and rejections.
- User growth and ranked activity summaries.
- Role-based views for owner, admin, and problem manager.

### Anti-Cheat And Reports

- Limited ranked feedback.
- Similarity detection across recent ranked matches.
- Suspicious timing flags.
- Account, IP, and device abuse signals.
- Post-match reports.
- Problem reports.
- Profile reports.
- Admin review queue.
- Rating rollback and manual adjustment tools for admins.
- No copy/paste blocking in v0.

### Social Match Layer

- No free-text chat during ranked matches.
- Preset reactions only: glhf, nice, gg, oops.
- Reactions are allowed before and after the match.
- During the match, only nice is allowed.
- Reactions must be rate-limited and mutable by user preference.

## Out Of Scope For V0

- Public user-submitted solutions.
- Username changes.
- Google authentication.
- Team matches.
- Contests.
- Clubs, groups, or organizations.
- Friends, follows, direct messages, or social feeds.
- Divisions inside ranks.
- Separate ratings by language or problem type.
- Dynamic problem rating based on user performance.
- Interactive problems.
- Arbitrary checker languages beyond C++ custom checkers.
- Webcam, screen recording, or invasive anti-cheat.
- Full marketing website.
- Frontend library decision.
- Fully autonomous ranked publication without review.

## Later Phases

### Phase 1: Core Platform

Build auth, profiles, problem management, practice, judging, ranked matchmaking, live match state, rating, and admin basics.

### Phase 2: AI Problem Supply

Make generation reliable enough to regularly feed the admin review queue, with verification gates and inventory alerts.

### Phase 3: Quality And Growth

Improve editor experience, profile stats, anti-cheat tooling, problem analytics, editorial quality, and admin operations.

### Phase 4: Expansion

Consider contests, richer social features, achievements, better personalization, and additional problem formats once the core loop is healthy.
