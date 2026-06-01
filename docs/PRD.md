# MashCode Product Requirements Document

## Problem Statement

Competitive programmers need a faster and more exciting way to practice under pressure than solving static archived problems alone. Existing platforms are strong for contests and practice, but the head-to-head experience is not the primary loop. Reused public problems also make fair ranked 1v1 play difficult because users can memorize or search solutions.

MashCode should provide a ranked online 1v1 coding experience where both players solve the same fresh problem in real time. The platform needs reliable judging, a trusted rating system, a separate practice area, and an admin-controlled problem pipeline that can eventually use AI to generate a high-volume supply of unique problems.

## Solution

MashCode will be an online 1v1 coding platform with ranked matchmaking, live coding matches, practice problems, user profiles, a public leaderboard, and a role-based admin dashboard.

Users can practice without rating impact or enter ranked matchmaking to play a 15-minute 1v1 match. A match pairs users by global rating, shows a ready screen, reveals the same unused ranked problem to both players, and declares the first accepted submission as the winner. If neither solves, the result is decided by progress, earliest best submission, or draw.

Problems are managed through a lifecycle that supports manual creation and AI-generated candidates. AI-generated problems should be automatically verified before reaching the review queue, but ranked publication remains controlled by humans. Practice and ranked problem pools are separate so ranked play stays fresh.

## User Stories

1. As a visitor, I want to understand that MashCode is a ranked 1v1 coding platform, so that I know whether to sign up.
2. As a visitor, I want to view a leaderboard preview, so that I can see the competitive ladder.
3. As a visitor, I want to sign up with email and password, so that I can create an account.
4. As a visitor, I want to sign up with GitHub, so that I can join quickly with my developer identity.
5. As a user, I want to verify my email, so that I can access ranked matchmaking.
6. As a user, I want a permanent username, so that my identity is stable across matches and leaderboards.
7. As a user, I want to edit my display name, profile picture, and bio, so that my profile represents me.
8. As a user, I want to see my dashboard after logging in, so that I can quickly enter ranked or practice.
9. As a user, I want to see my current rating and rank, so that I understand my competitive standing.
10. As a user, I want to see my peak rating and peak rank, so that I can track my best performance.
11. As a user, I want to see wins, losses, draws, win rate, and ranked matches played, so that I can evaluate my progress.
12. As a user, I want to see practice problems solved and accepted submissions, so that practice progress is visible.
13. As a user, I want to see primary languages used, so that my profile reflects how I solve.
14. As a user, I want to see tag and difficulty breakdowns, so that I can identify strengths and weaknesses.
15. As a user, I want to join ranked matchmaking, so that I can play a live 1v1 coding match.
16. As a user, I want matchmaking to prefer similar ratings, so that matches feel fair.
17. As a user, I want matchmaking to widen over time, so that I am not stuck forever in queue.
18. As a user, I want to be routed to practice if ranked inventory is unavailable, so that I still have something useful to do.
19. As a user, I want a ready screen after matchmaking, so that I can confirm I am present before the problem starts.
20. As a user, I want to see my opponent's username, display name, rating, and rank before the match, so that the match feels personal.
21. As a user, I want to send glhf before the match, so that the experience feels lightly social.
22. As a user, I want the problem revealed only after both players are ready, so that neither player gets an unfair head start.
23. As a user, I want a 15-minute match timer, so that ranked matches are fast and focused.
24. As a user, I want both players to receive the same problem, so that the race is fair.
25. As a user, I want to select or switch programming languages after seeing the problem, so that I can choose the right tool for the task.
26. As a user, I want to submit multiple times during a match, so that I can iterate toward an accepted solution.
27. As a user, I want to submit in different languages during the same match, so that a bad initial choice does not ruin the match.
28. As a user, I want to see compile errors, sample failures, and high-level hidden verdicts, so that I can debug without hidden test leakage.
29. As a user, I want to see opponent status, so that the match feels live.
30. As a user, I want opponent status to avoid showing code or hidden failures, so that the match remains fair.
31. As a user, I want the first accepted submission to win, so that the win condition is clear.
32. As a user, I want timeout matches decided by progress when neither player solves, so that effort still matters.
33. As a user, I want draws to be possible, so that genuinely tied matches are handled fairly.
34. As a user, I want rating changes to account for opponent strength, so that wins and draws are meaningful.
35. As a user, I want my first 5 ranked matches to be provisional, so that the system can place me quickly.
36. As a user, I want provisional status to be visible, so that others understand my rating is still settling.
37. As a user, I want leaderboard eligibility only after provisional matches, so that the leaderboard is credible.
38. As a user, I want disconnection grace, so that a refresh or brief network issue does not instantly lose the match.
39. As a user, I want abandoned matches to become forfeits, so that opponents are not trapped.
40. As a user, I want to send nice during a match, so that I can react without distracting chat.
41. As a user, I want to send gg or oops after a match, so that the social layer stays lightweight.
42. As a user, I want reactions to be rate-limited and optional, so that they do not become annoying.
43. As a user, I want to practice problems without matchmaking, so that I can learn at my own pace.
44. As a user, I want practice to have no rating impact, so that experimentation is safe.
45. As a user, I want practice problems to be separate from ranked, so that ranked remains fresh.
46. As a user, I want to upsolve a ranked problem after the match ends, so that I can learn from losses.
47. As a user, I want editorials after solving or after a match ends, so that I can understand the intended approach.
48. As a user, I want my submitted source code to remain private, so that my work is not exposed publicly.
49. As a user, I want match history to be public, so that profiles and ratings are credible.
50. As a user, I want public match history to hide submitted code, so that public transparency does not leak solutions.
51. As a user, I want to report a match, so that suspected cheating can be reviewed.
52. As a user, I want to report a problem, so that broken statements or tests can be fixed.
53. As a user, I want to report a profile, so that abuse can be moderated.
54. As a problem manager, I want to create and edit problems, so that the platform has high-quality content.
55. As a problem manager, I want to manage all problem lifecycle states, so that I can control practice and ranked inventory.
56. As a problem manager, I want to approve or deny problems, so that only suitable problems are published.
57. As a problem manager, I want to retire problems, so that bad or consumed problems stop appearing in ranked.
58. As a problem manager, I want to inspect sample tests, hidden test summaries, checkers, reference solutions, independent solutions, and verification logs, so that review is informed.
59. As a problem manager, I want edits to critical problem data to trigger re-verification, so that published problems remain trustworthy.
60. As a problem manager, I want custom C++ checker support, so that multiple-valid-output problems are possible.
61. As an admin, I want to manage users, so that abuse and account issues can be handled.
62. As an admin, I want to manage problems, so that I can help maintain content quality.
63. As an admin, I want to see active matches and queued users, so that operational issues are visible.
64. As an admin, I want to see judge health, so that execution failures can be detected quickly.
65. As an admin, I want to see ranked inventory by rating band, so that the queue does not run out of fresh problems.
66. As an admin, I want alerts when ranked inventory is low, so that generation or review can be prioritized.
67. As an admin, I want to see suspicious matches and reports, so that cheating can be investigated.
68. As an admin, I want rating rollback and manual adjustment tools, so that cheating damage can be corrected.
69. As an owner, I want to assign and remove admin roles, so that trusted staff can operate the platform.
70. As an owner, I want to assign and remove problem-manager roles, so that content operations can scale.
71. As the system, I want to run submissions in sandboxes, so that malicious code cannot harm infrastructure.
72. As the system, I want to block network access from submitted code, so that submissions cannot cheat or attack services.
73. As the system, I want to enforce CPU, memory, process, filesystem, and wall-time limits, so that judging is reliable.
74. As the system, I want to store submission metadata and private source, so that users and admins can audit results.
75. As the system, I want to normalize verdicts, so that the app can display consistent results.
76. As the system, I want AI to generate candidate problems periodically, so that inventory can scale.
77. As the system, I want admins to trigger manual generation batches, so that low rating bands or tags can be filled.
78. As the system, I want a separate solver context to independently solve generated problems, so that candidates are verified beyond self-checking.
79. As the system, I want wrong or brute-force solutions to fail hidden tests, so that tests are strong enough.
80. As the system, I want generation logs and model versions stored, so that problem provenance is auditable.

## Implementation Decisions

- Build one global ranked rating instead of separate ratings by language or problem type.
- Use a Glicko-2 style rating model internally and display a simple integer rating publicly.
- Start users at 1000 rating with the public rank Coder.
- Treat the first 5 ranked matches as provisional.
- Exclude provisional users from the public leaderboard.
- Use this rank ladder: Newbie, Apprentice, Coder, Specialist, Strategist, Mindbender, Genius, Prodigy, Sage.
- Build ranked around one default 15-minute queue for v0.
- Match users by rating proximity, widening over time from plus or minus 100 to plus or minus 500.
- Use a 30-second ready screen before each ranked match.
- Give both ranked players the same problem.
- Select ranked problems from unused approved ranked inventory near the average rating of both players.
- Mark ranked problems as consumed after use by default.
- Do not silently reuse ranked problems when inventory is low or empty.
- Keep practice and ranked pools separate.
- Allow post-match upsolving for consumed ranked problems.
- Determine ranked wins by first accepted submission.
- Determine timeout results by progress, then earliest best submission, then draw.
- Let rating changes consider result, opponent rating, and rating uncertainty only.
- Support disconnect grace for 90 seconds before forfeit.
- Show limited opponent status during matches: connected, disconnected, typing, submitting, running, latest verdict category, progress count when appropriate, and accepted state.
- Do not show opponent code.
- Do not show hidden test inputs, expected outputs, or detailed hidden failures.
- Allow no free-text chat in ranked v0.
- Support only preset reactions: glhf, nice, gg, oops.
- Allow reactions before and after matches, and only nice during matches.
- Support email/password and GitHub authentication.
- Require verified email before ranked matchmaking.
- Use permanent usernames for v0.
- Support editable display name, profile picture, and bio.
- Support public match history but keep submitted code private.
- Store private full source for submissions.
- Do not allow public user-submitted solutions in v0.
- Support the launch language set: C++17, C++20, Python 3, Java 17, JavaScript, TypeScript, Go, Rust, C#, and Kotlin.
- Run all submissions in isolated disposable sandboxes.
- Block network access from submitted code.
- Support exact-output judging and Codeforces-style custom C++ checkers.
- Do not support interactive problems in v0.
- Use problem lifecycle states: generated candidate, auto-verified, needs review, approved for practice, approved for ranked, rejected, and retired.
- Allow problem managers to manage all problems, including ranked and practice approval.
- Require successful automated verification before ranked publication.
- Allow practice or experimental publication with warning when verification fails.
- Use owner, admin, problem manager, and user roles.
- Let owner manage admin and problem-manager assignments.
- Let admin manage users, reports, problems, and operational controls.
- Let problem manager manage problem lifecycle and problem data.
- Use server-side anti-cheat signals rather than invasive browser lockdown.
- Provide admin tools for suspicious match review, reports, rating rollback, and manual adjustment.
- Leave frontend library choices undecided until implementation.

## Testing Decisions

- Tests should focus on external behavior and product rules rather than private implementation details.
- Rating tests should verify expected movement for wins, losses, draws, provisional users, and rating mismatches.
- Rank mapping tests should verify every threshold in the public rank ladder.
- Matchmaking tests should verify widening windows, cap behavior, queue timeout behavior, and inventory-empty behavior.
- Match state tests should verify ready timeout, problem reveal, submissions, accepted win, timeout progress tie-breaks, draws, disconnect grace, and forfeits.
- Problem lifecycle tests should verify status transitions, role permissions, re-verification triggers, ranked eligibility, practice eligibility, and consumed problem behavior.
- Judge contract tests should verify normalized verdicts across accepted, wrong answer, compile error, runtime error, time limit, memory limit, and internal error.
- Sandbox tests should verify resource limits and network blocking at the boundary available to the application.
- Custom checker tests should verify accepted, rejected, malformed output, checker failure, and checker timeout cases.
- Auth and permission tests should verify role access for owner, admin, problem manager, and user.
- Submission privacy tests should verify source visibility rules for submitter, public viewers, problem managers, admins, and owners.
- Admin dashboard tests should verify inventory counts, queue/match visibility, reports, verification failures, and role-specific dashboard visibility.
- AI pipeline tests should verify that candidates only advance when required artifacts exist and verification gates pass.

## Out of Scope

- Username changes.
- Google authentication.
- Public user solutions.
- Team matches.
- Contests.
- Clubs, groups, friends, follows, direct messages, or social feeds.
- Divisions inside ranks.
- Separate ratings by language or problem type.
- Dynamic problem ratings based on solve data.
- Interactive problems.
- Arbitrary custom checker languages beyond C++.
- Webcam, screen recording, or invasive anti-cheat.
- Copy/paste blocking.
- Fully autonomous ranked publication without human review.
- Full marketing site.
- Frontend framework or component-library selection.

## Further Notes

V0 should prioritize the live ranked match, judge, rating, problem lifecycle, and practice loop. The AI problem generation pipeline is a major product pillar, but it should not block the first working version of the platform. The system should be designed so AI-generated candidates can be added cleanly once the core platform is reliable.

The ranked experience depends on problem freshness. Inventory alerts and honest queue behavior are part of the product, not just admin conveniences. If fresh ranked problems are unavailable, the platform should say so and guide users to practice rather than degrading silently.
