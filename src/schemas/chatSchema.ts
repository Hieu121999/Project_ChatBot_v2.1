import { z } from 'zod';

// Định nghĩa schema cho một tin nhắn chuẩn
export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string().min(1, 'Nội dung tin nhắn không được để trống'),
  timestamp: z.string(),
});

// Định nghĩa schema cho payload gửi tin nhắn mới
export const sendMessageSchema = z.object({
  text: z.string().min(1, 'Tin nhắn quá ngắn').max(500, 'Tin nhắn quá dài'),
  senderId: z.string(),
});

// Xuất ra kiểu dữ liệu TypeScript tự động từ Zod
export type Message = z.infer<typeof messageSchema>;
export type SendMessagePayload = z.infer<typeof sendMessageSchema>;