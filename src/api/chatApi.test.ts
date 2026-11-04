import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchMessages, postMessage } from './chatApi';

// 1. Dùng URL tuyệt đối hoặc cấu hình domain cho môi trường Node test
const server = setupServer(
  http.get('http://localhost/api/messages', () => {
    return HttpResponse.json([
      { id: '1', senderId: 'bot', text: 'Xin chào từ MSW Server test!', timestamp: new Date().toISOString() }
    ]);
  }),

  http.post('http://localhost/api/messages', async ({ request }) => {
    const body = (await request.json()) as { text: string; senderId: string };
    return HttpResponse.json({
      id: '999',
      senderId: body.senderId,
      text: body.text,
      timestamp: new Date().toISOString()
    }, { status: 201 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Chat API Client Integration Tests', () => {
  it('nên gọi API fetchMessages thành công và nhận về danh sách tin nhắn', async () => {
    const messages = await fetchMessages();
    
    expect(messages).toBeInstanceOf(Array);
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].text).toBe('Xin chào từ MSW Server test!');
  });

  it('nên gọi API postMessage thành công và trả về tin nhắn mới được tạo', async () => {
    const newMsgPayload = { text: 'Test tin nhắn mới qua API', senderId: 'user' };
    const result = await postMessage(newMsgPayload);

    expect(result).toHaveProperty('id');
    expect(result.text).toBe(newMsgPayload.text);
    expect(result.senderId).toBe('user');
  });
});