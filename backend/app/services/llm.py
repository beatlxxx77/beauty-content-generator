import json
import urllib.request
from urllib.error import HTTPError, URLError

from app.config import get_settings

MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"
DEFAULT_MODEL = "mistral-small-latest"
FALLBACK_TEXT = (
    "Сервис генерации временно недоступен. "
    "Укажите LLM_API_KEY в окружении."
)


def call_llm(prompt: str) -> str:
    settings = get_settings()
    api_key = settings.llm_api_key
    model = settings.llm_model or DEFAULT_MODEL

    if not api_key:
        return FALLBACK_TEXT

    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
    }

    data = json.dumps(payload).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    request = urllib.request.Request(
        MISTRAL_API_URL,
        data=data,
        headers=headers,
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8")
    except (HTTPError, URLError, TimeoutError, ValueError):
        return FALLBACK_TEXT

    try:
        parsed = json.loads(body)
    except json.JSONDecodeError:
        return FALLBACK_TEXT

    try:
        return parsed["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError, AttributeError):
        return FALLBACK_TEXT
