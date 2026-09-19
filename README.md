# Parking System

A web-based parking management system with a Python FastAPI backend and an HTML, CSS and JavaScript frontend.

## Features
- [View available parking slots]
- [Register vehicle entry and exit]
- [Calculate parking fees]

## Tech Stack
- **Backend:** Python, FastAPI, Pydantic, Uvicorn
- **Frontend:** HTML, CSS, JavaScript

## Screenshots
<img width="1347" height="648" alt="image" src="https://github.com/user-attachments/assets/4619e8f6-01be-48ee-81c4-3c9c29bc956b" />
<img width="1361" height="641" alt="image" src="https://github.com/user-attachments/assets/3c4c2e92-b1b9-4946-a04c-b102da187237" />

## How to Run

1. Download or clone this repository.
2. Create and activate a virtual environment:
```
   py -m venv venv
   .\venv\Scripts\Activate.ps1
```
3. Install the dependencies:
```
   python -m pip install fastapi uvicorn
```
4. Start the backend:
```
   cd backend
   python -m uvicorn main:app --reload
```
5. The API runs at http://127.0.0.1:8000, and interactive docs are at http://127.0.0.1:8000/docs.
6. Open `frontend/index.html` in your browser (Live Server in VS Code works well).

## Author
[Abeer] | [www.linkedin.com/in/abeer-faisal-07aaa7400]
