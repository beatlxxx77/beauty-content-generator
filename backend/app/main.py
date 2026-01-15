from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import GeneratePostRequest, GeneratePostResponse
from app.services.llm import call_llm

BASE_DIR = Path(__file__).resolve().parent
PROMPT_PATH = BASE_DIR / "prompts" / "beauty_post.txt"

app = FastAPI(title="beauty-content-generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_prompt_template() -> str:
    return PROMPT_PATH.read_text(encoding="utf-8")


def render_prompt(template: str, payload: GeneratePostRequest) -> str:
    return (
        template.replace("{{city}}", payload.city)
        .replace("{{service}}", payload.service)
        .replace("{{target_audience}}", payload.target_audience)
        .replace("{{goal}}", payload.goal)
    )


@app.post("/generate-post", response_model=GeneratePostResponse)
def generate_post(payload: GeneratePostRequest) -> GeneratePostResponse:
    template = load_prompt_template()
    prompt = render_prompt(template, payload)
    text = call_llm(prompt)
    return GeneratePostResponse(text=text)
