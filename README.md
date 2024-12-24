# MashCode - Compile & Conquer

MashCode is a fun 1v1 competitive programming platform.

## Very Early Preview

<https://github.com/Nirlep5252/mashcode/assets/70529587/66958f6d-43ce-40fa-85d1-230bdde9ad21>

## Current Features

- Rating-based LIVE matchmaking.
- Supports 30 languages.
- Dynamic flex layout during match and practice sessions.
- CSES set 300 questions that are already available for practice.

## Upcoming features

<!-- - A public profile page. -->

- A problemsetter dashboard.
- Viewing previous submissions and code.
- Friends.
- Private unrated matches between friends.
- Multiple problems per match.
- Interactive problems.
- Time limit per match.
- Seasons and ranks (for rating).
- Difficulty of questions.

## Run Locally

Make sure you have the [Nix package manager](https://nixos.org/download.html) installed.

1. Clone the project

   ```bash
     git clone https://github.com/nirlep5252/mashcode
     cd mashcode
   ```

2. Create `.env` file in the `backend` directory using the `.env.example` file.

   ```bash
     cp backend/.env.example backend/.env
     # Make sure you fill the missing github credentials
   ```

3. Enable nix shell.

   ```bash
     nix develop --no-pure-eval
   ```

4. Run the project.

   ```bash
     devenv up
   ```
