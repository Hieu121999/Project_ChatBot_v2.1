import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { fetchMessages, postMessage } from '../api/chatApi';
import type { Message } from '../schemas/chatSchema';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const currentUserId = 'user'; // Giả lập user hiện tại

  

  // Tải danh sách tin nhắn khi component được mount
  useEffect(() => {
    fetchMessages()
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Xử lý gửi tin nhắn mới
// Xử lý gửi tin nhắn mới và tải lại toàn bộ danh sách để nhận phản hồi từ Bot
  const handleSendMessage = async (text: string) => {
    try {
      await postMessage({ text, senderId: currentUserId });
      console.log('[postMess:]', text);
      
      // Gọi lại API lấy danh sách để cập nhật cả tin nhắn của bạn và tin nhắn phản hồi của Bot
      const updatedMessages = await fetchMessages();
      console.log('[updateMessPost:]', updatedMessages);
      setMessages(updatedMessages);
    } catch (err: any) {
      console.error('Lỗi khi gửi tin nhắn:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2 }}>
        <CircularProgress />
        <Typography>Đang tải ứng dụng chat...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e3f2fd', p: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ width: '100%', maxWidth: 600, height: '70vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 3 }}
      >
        {/* Header */}
        <Box sx={{ p: 2, backgroundColor: '#1976d2', color: '#fff' }}>
          <Typography variant="h6">Phòng Chat Trực Tuyến</Typography>
        </Box>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <Box sx={{ p: 2, backgroundColor: '#ffebee', color: '#c62828' }}>
            <Typography>{error}</Typography>
          </Box>
        )}

        {/* Danh sách tin nhắn */}
        <MessageList messages={messages} currentUserId={currentUserId} />

        {/* Ô nhập tin nhắn */}
        <MessageInput onSendMessage={handleSendMessage} />
      </Paper>
    </Box>
  );
};