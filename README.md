# mashcode

competitive programming platform, focused on fun 1v1s.

## how to run?

1. run postgres database server (preferred locally)

2. create an `.env` file lookin like this:

   ```env
   DB_URL="<POSTGRES DATABASE URL>"

   GITHUB_CLIENT_ID="GET CLIENT ID FROM NIRLEP"
   GITHUB_CLIENT_SECRET="GET CLIENT ID FROM NIRLEP"
   ```

3. install dependencies

   ```bash
   bun i
   ```

4. run

   ```bash
   bun run dev
   ```
