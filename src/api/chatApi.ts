import { messageSchema, type Message, type SendMessagePayload } from '../schemas/chatSchema';
import { z } from 'zod';

// khai bao BE
  const API_URL = "http://localhost:8000/api/messages";

// 1. Hàm gọi API lấy danh sách tin nhắn
export const fetchMessages = async (): Promise<Message[]> => {

  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Không thể tải danh sách tin nhắn từ server.');
  }

  const data = await response.json();

  // Dùng Zod để validate mảng dữ liệu trả về từ server
  const messagesArraySchema = z.array(messageSchema);
  const result = messagesArraySchema.safeParse(data);

  if (!result.success) {
    console.error('Dữ liệu từ API không khớp với Schema:', result.error);
    throw new Error('Dữ liệu trả về từ server không hợp lệ!');
  }

  return result.data;
};

// 2. Hàm gọi API gửi tin nhắn mới
export const postMessage = async (payload: SendMessagePayload): Promise<Message> => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Gửi tin nhắn thất bại.');
  }

  const data = await response.json();

  // Validate tin nhắn lẻ trả về từ server
  const result = messageSchema.safeParse(data);

  if (!result.success) {
    console.error('Dữ liệu tin nhắn mới không khớp với Schema:', result.error);
    throw new Error('Phản hồi từ server không hợp lệ!');
  }

  return result.data;
};