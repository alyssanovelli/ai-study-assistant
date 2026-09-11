import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from app.services.document_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text


load_dotenv()

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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
@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)

    chunks = chunk_text(text)

    return {"filename": file.filename, "chunk_count": len(chunks), "chunks": chunks}