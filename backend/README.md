# Steps to run the backend

1. Install poetry.
2. Run `poetry shell` to activate the virtual environment.
3. Run `poetry install` to install the dependencies.
4. Run `uvicorn main:app --reload --root-path /api`.

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
