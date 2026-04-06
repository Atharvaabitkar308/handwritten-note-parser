\# 📝 Handwritten Note Parser



\## 📌 Overview

This project is a web application that allows users to upload images of handwritten notes and converts them into readable text using OCR (Tesseract) and LLM processing.



\---



\## 🚀 Features

\- Upload handwritten note images

\- Extract text using OCR

\- Display parsed text instantly

\- Store and view history of uploaded notes



\---



\## 🛠️ Tech Stack

\- Backend: FastAPI (Python)

\- Frontend: React.js

\- OCR: Tesseract

\- Database: SQLite



\---



\## 📂 Project Structure

handwritten-parser/

│

├── backend/

│   ├── app/

│   ├── requirements.txt

│

├── frontend/

│   ├── src/

│   ├── package.json

│

└── README.md



\---



\## ⚙️ Setup Instructions



\### 1. Clone Repository

git clone https://github.com/Atharvaabitkar308/handwritten-note-parser.git



\---



\### 2. Backend Setup

cd backend

python -m venv venv

venv\\Scripts\\activate

pip install -r requirements.txt

uvicorn app.main:app --reload



\---



\### 3. Frontend Setup

cd frontend

npm install

npm start



\---



\## 🌐 API Endpoints

\- POST /api/parse → Upload and parse note

\- GET /api/notes → Get history



\---



\## 📸 Usage

1\. Open frontend (http://localhost:3000)

2\. Upload handwritten image

3\. View extracted text

4\. Check history



\---



\## 👨‍💻 Author

Atharva Abitkar



\---



\## 📌 Notes

Make sure Tesseract OCR is installed and added to system PATH.

