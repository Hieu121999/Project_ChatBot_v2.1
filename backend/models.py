from pydantic import BaseModel, Field

# Khung dữ liệu khi gửi tin nhắn mới lên (POST)
class MessageCreate(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    senderId: str

# Khung dữ liệu chuẩn của một tin nhắn đầy đủ trả về (GET)
class Message(BaseModel):
    id: str
    senderId: str
    text: str
    timestamp: str