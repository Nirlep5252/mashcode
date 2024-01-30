import os

from dotenv import load_dotenv

load_dotenv()


# Github credentials
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
assert GITHUB_CLIENT_ID is not None, "Please set `GITHUB_CLIENT_ID` in the `.env` file."
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
assert (
    GITHUB_CLIENT_SECRET is not None
), "Please set `GITHUB_CLIENT_SECRET` in the `.env` file."

# URLs and stuff
HOME_URL = os.getenv("HOME_URL")
assert HOME_URL is not None, "Please set `HOME_URL` in the `.env` file."
API_URL = HOME_URL + "/api"

# Database credentials
DB_URL = os.getenv("DB_URL")
assert DB_URL is not None, "Please set `DB_URL` in the `.env` file."
