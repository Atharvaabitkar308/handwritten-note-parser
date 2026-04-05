from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware   # 👈 ADD THIS

from .database import engine, Base
from .routes import router

app = FastAPI()

# 👇 ADD THIS BLOCK HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router, prefix="/api")