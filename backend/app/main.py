from pathlib import Path
from fastapi import FastAPI,Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

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
    """
    Render giao diện Cổng Không Gian (Menu chính)
    """
    return templates.TemplateResponse("home.html", {"request": request})

# API mẫu để sau này gọi từ JS (Model logic sẽ viết ở đây)
@app.get("/api/status")
async def get_status():
    return {"status": "Online", "system": "Gara Robot Ready"}

if __name__ == "__main__":
    import uvicorn
    # Chạy server tại port 8000
    uvicorn.run(app, host="127.0.0.1", port=8000) 