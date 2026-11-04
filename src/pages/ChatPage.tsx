import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ChatContainer} from '../components/ChatContainer'; // Đường dẫn trỏ tới component chat cũ của bạn

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('chat_username') || 'Khách';

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
      {/* Thanh Header nhỏ phía trên để điều hướng quay lại */}
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            Đổi tên / Thoát
          </Button>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Xin chào, {username} 👋
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Component Chat cũ của bạn được nhúng nguyên vẹn vào đây */}
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <ChatContainer />
      </Box>
    </Box>
  );
};