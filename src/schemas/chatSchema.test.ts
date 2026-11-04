import { describe, it, expect } from 'vitest';
import { sendMessageSchema, messageSchema } from './chatSchema';

describe('Chat Zod Schemas Validation', () => {
  // 1. Test validate payload gửi tin nhắn
  it('nên validate thành công khi dữ liệu gửi lên hợp lệ', () => {
    const validPayload = {
      text: 'Xin chào, đây là tin nhắn test!',
      senderId: 'user-123',
    };

    const result = sendMessageSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('nên báo lỗi khi nội dung tin nhắn bị bỏ trống', () => {
    const emptyPayload = {
      text: '',
      senderId: 'user-123',
    };

    const result = sendMessageSchema.safeParse(emptyPayload);
    expect(result.success).toBe(false);
  });

  it('nên báo lỗi khi nội dung tin nhắn vượt quá giới hạn cho phép', () => {
    const tooLongText = 'a'.repeat(600); // Giả sử giới hạn max là 500 ký tự
    const invalidPayload = {
      text: tooLongText,
      senderId: 'user-123',
    };

    const result = sendMessageSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  // 2. Test validate dữ liệu tin nhắn hoàn chỉnh từ server trả về
  it('nên validate thành công cấu trúc tin nhắn chuẩn từ server', () => {
    const validMessage = {
      id: '1711223344',
      senderId: 'bot',
      text: 'Chào bạn!',
      timestamp: new Date().toISOString(),
    };

    const result = messageSchema.safeParse(validMessage);
    expect(result.success).toBe(true);
  });
});