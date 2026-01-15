from functools import lru_cache
from pathlib import Path
import os
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
PROMPTS_DIR = BASE_DIR / "prompts"

class Settings(BaseModel):
    llm_api_url: str | None = os.getenv("LLM_API_URL")
    llm_api_key: str | None = os.getenv("LLM_API_KEY")
    llm_model: str | None = os.getenv("LLM_MODEL")

@lru_cache
def get_settings() -> Settings:
    return Settings()
