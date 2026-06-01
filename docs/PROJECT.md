# MashCode Project Vision

MashCode is an online 1v1 competitive coding platform built around fast ranked matches, fresh problems, and a strong editor-and-judge experience.

The core promise is simple: two users match, receive the same unseen problem, race to solve it, and move up or down through a gamified rating system. Practice exists for learning, but ranked play is the main product loop.

## Product Pillars

1. Fresh ranked problems
   - Ranked problems should be unseen by both players.
   - Each ranked problem is consumed after use and then becomes eligible for practice or post-match upsolving.
   - The long-term goal is an AI-assisted problem generation pipeline that produces problems faster than users consume them.

2. Fair 1v1 competition
   - Both players receive the same problem in each match.
   - The winner is the first player to get an accepted submission.
   - If no one solves before the timer ends, the result is decided by progress, then earliest best submission, then draw.
   - Rating changes are based on result, opponent rating, and rating uncertainty.

3. Trustworthy judging
   - Submissions must run in isolated, disposable sandboxes.
   - User code has no network access and no access to app infrastructure.
   - Problems support normal exact-output judging and Codeforces-style custom C++ checkers.
   - Ranked feedback is intentionally limited to prevent leaking hidden tests.

4. Strong learning loop
   - Users can practice without rating impact.
   - Users can upsolve ranked problems after a match ends.
   - Editorials and explanations can be shown after solving or after a ranked match ends.

5. Admin-controlled quality
   - AI can generate candidate problems automatically.
   - Generated problems must pass automated verification before entering the normal review queue.
   - Admins and problem managers can review, edit, approve, reject, retire, and route problems to ranked or practice.

## Core Actors

- User: plays ranked matches, practices problems, views profiles, and reports issues.
- Problem manager: manages all problem lifecycle actions.
- Admin: manages users and problems, sees operational dashboards, and handles reports.
- Owner: full access, including role management for admins and problem managers.

## Rank Ladder

Users have one global rating. The public rating maps to these ranks:

- Newbie: below 800
- Apprentice: 800 to 999
- Coder: 1000 to 1199
- Specialist: 1200 to 1399
- Strategist: 1400 to 1599
- Mindbender: 1600 to 1799
- Genius: 1800 to 2099
- Prodigy: 2100 to 2399
- Sage: 2400 and above

New users start at 1000 rating as Coder. Their first 5 ranked matches are provisional and do not qualify them for the public leaderboard.

## Product Sections

- Landing: lightweight public entry page with sign in, sign up, leaderboard preview, and ranked 1v1 explanation.
- Dashboard: rating, rank, recent matches, and quick actions.
- Ranked 1v1: matchmaking, ready screen, live match, judging, and result screen.
- Practice: browse, filter, solve, submit, and review non-ranked problems.
- Problems: public detail pages for practice-accessible problems.
- Leaderboard: global rating leaderboard for eligible users.
- Profile: public user identity, stats, match history, and solved history.
- Admin: role-aware dashboard for problems, users, reports, judge health, and generation pipeline status.

## Non-Negotiables

- Do not expose hidden tests to users.
- Do not expose opponent code during or after ranked matches.
- Do not allow user code to access the network or app infrastructure.
- Do not silently reuse ranked problems in v0 when the fresh ranked pool is empty.
- Do not make ranked publication fully automatic without review.
- Do not build invasive anti-cheat such as webcam or screen recording for v0.
- Do not choose frontend libraries in this document. The implementer should decide based on the eventual app stack.
