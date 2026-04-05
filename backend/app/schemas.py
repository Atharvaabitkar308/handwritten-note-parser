from pydantic import BaseModel
from datetime import datetime
import uuid

class NoteResponse(BaseModel):
    id: uuid.UUID
    image_path: str
    parsed_text: str
    created_at: datetime

    class Config:
        from_attributes = True