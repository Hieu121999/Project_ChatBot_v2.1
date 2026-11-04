import { http, HttpResponse } from 'msw';

// Dữ liệu mẫu ban đầu cho danh sách tin nhắn
let messages = [
  { 
    id: '1', 
    senderId: 'bot', 
    text: 'Xin chào! Tôi là trợ lý ảo được hỗ trợ bởi MSW. Tôi có thể giúp gì cho bạn hôm nay?', 
    timestamp: new Date().toISOString() 
  },
];

export const handlers = [
  // 1. API GET: Lấy toàn bộ danh sách tin nhắn
  http.get('/api/messages', () => {
    return HttpResponse.json(messages, { status: 200 });
  }),

  // 2. API POST: Gửi tin nhắn mới và tự động sinh tin nhắn phản hồi từ Bot
  http.post('/api/messages', async ({ request }) => {
    try {
      const body = (await request.json()) as { text: string; senderId: string };
      
      // Tạo tin nhắn của người dùng
      const userMessage = {
        id: Date.now().toString(),
        senderId: body.senderId || 'user',
        text: body.text,
        timestamp: new Date().toISOString(),
      };

      messages.push(userMessage);

      // Tạo thêm một tin nhắn phản hồi tự động từ Bot
      const botResponses = [
        `Tôi đã nhận được nội dung: "${body.text}". Bạn có cần tôi hỗ trợ gì thêm không?`,
        `Thú vị đấy! Hãy kể cho tôi nghe chi tiết hơn về vấn đề này nhé.`,
        `Hệ thống đã ghi nhận yêu cầu của bạn. Chúng ta đang ở bước xây dựng Full-stack rất mượt mà!`,
        `Tôi đồng ý với bạn. Còn điều gì bạn muốn tối ưu thêm ở giao diện này không?`
      ];
      
      // Chọn ngẫu nhiên một câu trả lời từ Bot
      const randomText = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'bot',
        text: randomText,
        timestamp: new Date(Date.now() + 500).toISOString(), // Lệch 0.5 giây cho tự nhiên
      };

      // Đẩy cả tin nhắn bot vào danh sách lưu trữ tạm thời
      messages.push(botMessage);

      // Trả về tin nhắn của user (hoặc bạn có thể tối ưu thêm logic hiển thị nếu muốn)
      return HttpResponse.json(userMessage, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
  }),
];