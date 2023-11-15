import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from dotenv import load_dotenv

app = FastAPI()

# env variables
load_dotenv("./.env.local")
openai.api_key = os.environ.get("OPENAI_API_KEY")

# CORS
origins = ["https://adopt-connect.vercel.app", "http://localhost:3000", "http://localhost:3001"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ConversationHistory(BaseModel):
    history: str

context = """
The process followed by Bal Asha representatives includes the following steps:
Reaching out to orphanages: Bal Asha representatives contact orphanages in Maharashtra to gather information about the orphans.
Data collection and feedback: Orphans' details are entered into the "Where are India's Children" database, narrowing down eligible candidates based on feedback.
Eligibility determination: Bal Asha identifies orphans falling under their purview, starting the digitization process.
Publicizing the orphans: Photos of orphaned children are published in national newspapers and on a national TV channel to raise awareness and facilitate connections.
Reuniting with biological parents: If biological parents are found, Bal Asha facilitates the reunion of the child with their parents.
Contacting local police: If biological parents are not found, Bal Asha contacts the local police department to aid in the search.
Document consolidation: Bal Asha gathers relevant documents and reports related to the child's backstory and abandonment.
Child Welfare Committee presentation: Collected reports are submitted to the Child Welfare Committee to obtain a "Free for Adoption" certificate.
Medical Examination Report and Child Study Report: Bal Asha obtains medical and study reports for the orphaned child.
Registering in CARINGS system: The orphan is registered in the Government of India's CARINGS system for adoptable children.
"""

@app.get("/")
def index():
    return { "message": "Hello World!" }

@app.post("/conversation")
def conversation(conv_history: ConversationHistory):
    conv = conv_history.dict()
    history = conv["history"]
    response = openai.Completion.create(
        engine='text-babbage-001',
        prompt=f"{context}\n\n{history}\nBot: ",
        max_tokens=100,
        temperature=0.1,
        top_p=1.0,
        n=1
    )
    answer = response.choices[0].text.strip()
    return answer
