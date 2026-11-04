import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendMessageSchema } from '../schemas/chatSchema';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSend = () => {
    // Validate trước khi gửi bằng Zod schema
    const result = sendMessageSchema.safeParse({ text, senderId: 'user' });
    
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError(null);
    onSendMessage(text);
    setText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error) setError(null);
        }}
        onKeyDown={handleKeyPress}
        error={Boolean(error)}
        helperText={error}
        disabled={disabled}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};