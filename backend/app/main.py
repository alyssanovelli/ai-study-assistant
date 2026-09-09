import os

from dotenv import load_dotenv
from fastapi import FastAPI
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class Question(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "AI Study Assistant API is running!"}

@app.post("/ask")
def ask_question(question: Question):
    response = client.responses.create(
        model="gpt-5.6-luna",
        input=question.question
    )
    return {
        "question": question.question,
        "answer": response.output_text
    }