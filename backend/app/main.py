from pathlib import Path
from fastapi import FastAPI,Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import random

from models import math_logic

app = FastAPI(title="Gara Robot MATH")

# Lấy đường dẫn của chính file main.py
current_file = Path(__file__).resolve()

# Đi ngược lên 3 cấp để tới thư mục M.A.T.H
# main.py -> app -> backend -> M.A.T.H
BASE_DIR = current_file.parent.parent.parent

# Cấu hình đường dẫn
static_path = BASE_DIR / "frontend" / "static"
templates_path = BASE_DIR / "frontend" / "templates"

# KIỂM TRA ĐƯỜNG DẪN TRƯỚC KHI CHẠY (Quan trọng)
print(f"\n--- KIỂM TRA HỆ THỐNG ---")
print(f"Gốc dự án (BASE_DIR): {BASE_DIR}")
print(f"Thư mục Static: {static_path} - {'✅ OK' if static_path.exists() else '❌ KHÔNG THẤY'}")
print(f"Thư mục Templates: {templates_path} - {'✅ OK' if templates_path.exists() else '❌ KHÔNG THẤY'}")
print(f"------------------------\n")

# Nếu thư mục tồn tại thì mới Mount, tránh lỗi Runtime
if static_path.exists():
    app.mount("/static", StaticFiles(directory=str(static_path)), name="static")

if templates_path.exists():
    templates = Jinja2Templates(directory=str(templates_path))

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

# API mẫu để sau này gọi từ JS (Model logic sẽ viết ở đây)
@app.get("/api/status")
async def get_status():
    return {"status": "Online", "system": "Gara Robot Ready"}

@app.get("/get-question")
async def get_question(type: str, level: int):
    if type == "multiplication":
        if level == 1: # Dễ: bảng 2, 5
            num1 = random.choice([2, 5])
            num2 = random.randint(1, 10)
        else: # Khó: bảng 7, 8, 9
            num1 = random.choice([7, 8, 9])
            num2 = random.randint(1, 10)
        
        answer = num1 * num2
        # Tạo 2 đáp án sai ngẫu nhiên gần với đáp án đúng
        options = [answer, answer + random.choice([1, 2, 10]), abs(answer - random.choice([1, 2, 5]))]
        random.shuffle(options)
        
        return {
            "question": f"{num1} x {num2}",
            "answer": answer,
            "options": options
        }
    return {"error": "Type not found"}

@app.get("/api/multiplication_race")
async def multiplication_race(request: Request):
    return  templates.TemplateResponse("multiplication_race.html",{"request": request})

@app.get("/lake")
async def lake(request: Request):
    return templates.TemplateResponse("lake.html", {"request": request})

@app.get("/api/get-fish-question")
async def get_fish_question():
    question_data = math_logic.MathModel.generate_division_x(level="easy")
    return question_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000) 