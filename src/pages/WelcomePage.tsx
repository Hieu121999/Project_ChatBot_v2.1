import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export const WelcomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    localStorage.setItem('chat_username', username);
    navigate('/chat');
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center', borderRadius: 3 }}>
        <ChatIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
          AI Chat Workspace
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Nhập tên của bạn để bắt đầu trò chuyện với trợ lý thông minh.
        </Typography>

        <Box component="form" onSubmit={handleStartChat}>
          <TextField
            fullWidth
            label="Tên của bạn"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            size="large"
            sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
          >
            Vào phòng chat 🚀
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};