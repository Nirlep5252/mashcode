import os

from dotenv import load_dotenv

load_dotenv()


# Github credentials
GITHUB_CLIENT_ID: str = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET: str = os.getenv("GITHUB_CLIENT_SECRET")

# URLs and stuff
HOME_URL: str = os.getenv("HOME_URL")
API_URL: str = HOME_URL + "/api"

# Database credentials
DB_URL: str = os.getenv("DB_URL")
