# Steps to run the backend

1. Install poetry.
2. Run `poetry shell` to activate the virtual environment.
3. Run `poetry install --no-root` to install the dependencies.
4. Create `.env` with the following:

   ```
   HOME_URL="http://localhost:5173"
   DB_URL=""
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   ```

5. Run `uvicorn main:app --reload --root-path /api`.

## Suggestions

- Use `ruff` vscode extension to maintain good code quality.
- Recommended settings:

  ```json
  "[python]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "charliermarsh.ruff",
      "editor.codeActionsOnSave": {
      "source.fixAll": "always",
      "source.organizeImports": "always"
      }
  },
  ```
