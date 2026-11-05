from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Field
from typing import List
from datetime import datetime
import uuid

from models import Message, MessageCreate

app = FastAPI(title="Chat API", version="1.0")

# 1. Cấu hình CORS để cho phép Front-end (React chạy ở cổng 5173) gọi được API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # có thể giới hạn cụ thể http://localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Cơ sở dữ liệu tạm thời trên RAM (Dùng mảng để lưu tin nhắn giống như MSW handlers)
fake_db_messages: List[Message] = [
    Message(
        id="1",
        senderId="system",
        text="Xin chào! FastAPI server đã sẵn sàng phục vụ.",
        timestamp=datetime.now().isoformat()
    )
]

# 3. API GET: Lấy danh sách toàn bộ tin nhắn
@app.get("/api/messages", response_model=List[Message])
def get_messages():
    return fake_db_messages

# 4. API POST: Nhận tin nhắn mới từ Front-end gửi lên và tạo phản hồi từ Bot
@app.post("/api/messages", response_model=Message)
def create_message(payload: MessageCreate):
    # 1. Tạo tin nhắn của User gửi lên
    user_message = Message(
        id=str(uuid.uuid4()),
        senderId=payload.senderId,
        text=payload.text,
        timestamp=datetime.now().isoformat()
    )
    # Lưu tin nhắn của User vào "database" RAM
    fake_db_messages.append(user_message)
    
    # 🤖 2. TỰ ĐỘNG TẠO PHẢN HỒI TỪ BOT NGAY SAU ĐÓ
    bot_response_text = f"Bot đã nhận được nội dung: '{payload.text}'" 
    
    bot_message = Message(
        id=str(uuid.uuid4()),
        senderId="bot",  # QUAN TRỌNG: Phải đặt là 'bot' để giao diện React tự căn sang bên trái
        text=bot_response_text,
        timestamp=datetime.now().isoformat()
    )
    # Lưu luôn tin nhắn của Bot vào "database" RAM
    fake_db_messages.append(bot_message)
    
    # Trả về tin nhắn của User
    return user_message