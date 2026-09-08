from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Question(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "AI Study Assistant API is running!"}

@app.post("/ask")
def ask_question(question: Question):
    return {
        "question": question.question,
        "answer": "This is a placeholder answer. The AI model will generate a response here."
    }