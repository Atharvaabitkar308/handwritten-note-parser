from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import os

from .database import SessionLocal
from .models import Note
from .schemas import NoteResponse
from .llm import parse_image

# ✅ MUST be here (before decorators)
router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/parse", response_model=NoteResponse)
async def parse_note(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        file_path = f"{UPLOAD_DIR}/{file.filename}"

        contents = await file.read()

        with open(file_path, "wb") as f:
            f.write(contents)

        parsed_text = await parse_image(file_path)

        note = Note(
            image_path=file_path,
            parsed_text=parsed_text
        )

        db.add(note)
        db.commit()
        db.refresh(note)

        return note

    except Exception as e:
        return {
            "id": "error",
            "image_path": "",
            "parsed_text": f"Error: {str(e)}",
            "created_at": None
        }


@router.get("/notes", response_model=list[NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()