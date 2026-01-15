from pydantic import BaseModel, Field

class GeneratePostRequest(BaseModel):
    city: str = Field(..., min_length=1)
    service: str = Field(..., min_length=1)
    target_audience: str = Field(..., min_length=1)
    goal: str = Field(..., min_length=1)

class GeneratePostResponse(BaseModel):
    text: str
