import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import type { Message } from '../schemas/chatSchema';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  console.log('🔍 Mảng messages nhận vào MessageList:', messages);
  return (
    <Box 
      sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        minHeight: 0,
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        backgroundColor: '#f5f5f5' 
      }}
    >
      {messages.map((msg) => {
        // console.log('💬 Đang render tin nhắn:', msg);
        // console.log('currentUserId', currentUserId);
        // console.log(' msg.senderId',  msg.senderId);
        const isMe = msg.senderId === currentUserId;
        return (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: isMe ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              gap: 1,
              // flex: 1,              /* 👈 RẤT QUAN TRỌNG: Giúp MessageList chiếm hết khoảng trống giữa Header và ô nhập tin nhắn */
        // overflowY: 'auto',    /* 👈 Tạo thanh cuộn dọc khi tin nhắn quá nhiều */
        // p: 2,                 /* Khoảng đệm bên trong */
        // display: 'flex',
        // flexDirection: 'column',
        // gap: 1,
            }}
          >
            {!isMe && <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>B</Avatar>}
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: '70%',
                backgroundColor: isMe ? '#1976d2' : '#ffffff',
                color: isMe ? '#ffffff' : '#000000',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                {msg.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5,
                  color: isMe ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                  fontSize: '0.7rem',
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Paper>
            {isMe && <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>U</Avatar>}
          </Box>
        );
      })}
    </Box>
  );
};