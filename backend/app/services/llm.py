import os
import json
import urllib.request
from urllib.error import HTTPError, URLError

LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_API_URL = os.getenv("LLM_API_URL")

FALLBACK_TEXT = (
    "Сервис генерации временно недоступен. "
    "Укажите LLM_API_KEY и LLM_API_URL в окружении."
)

DEFAULT_MODEL = "mistralai/mistral-7b-instruct"


def call_llm(prompt: str) -> str:
    if not LLM_API_KEY or not LLM_API_URL:
        return FALLBACK_TEXT

    payload = {
        "model": DEFAULT_MODEL,
        "messages": [
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
        "max_tokens": 500,
    }

    data = json.dumps(payload).encode("utf-8")

    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://beauty-content-generator",
        "X-Title": "beauty-content-generator",
    }

    request = urllib.request.Request(
        LLM_API_URL,
        data=data,
        headers=headers,
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8")
    except (HTTPError, URLError, TimeoutError):
        return FALLBACK_TEXT

    try:
        parsed = json.loads(body)
        return parsed["choices"][0]["message"]["content"].strip()
    except Exception:
        return FALLBACK_TEXT
