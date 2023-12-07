import { useState } from 'react';
import { Cancel, Check } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDocument, setConversationHistory } from '../../../Redux/ChatSlice';
import { useHttpClient } from '../../../useHttpClient';

export default function ChatTitleInput({
  chatId,
  chatTitle,
  setChatTitle,
  setIsEdit
}) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { fetch } = useHttpClient();

  const submitHandler = async () => {
    if (!chatTitle) return;

    setLoading(true);

    await fetch(`/api/edit-title`, {
      method: 'PATCH',
      body: JSON.stringify({ title: chatTitle, id: chatId })
    })
      .then((res) => {
        setLoading(false);

        if (!res.ok) {
          setError(true);
        } else {
          setError(false);
          setIsEdit(false);
          setChatTitle(chatTitle);

          dispatch(setCurrentDocument((conversation) => ({
            ...conversation,
            title: chatTitle
          })));

          dispatch(setConversationHistory((oldhistory) => {
            const index = oldhistory.findIndex((item) => item.checksum === chatId);
            const history = [...oldhistory];
            if (index !== -1) {
              history[index].title = chatTitle;
            }
            return history;
          }));
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <TextField
      fullWidth
      variant="filled"
      value={chatTitle}
      onChange={(e) => {
        setChatTitle(e.target.value);
      }}
      error={error}
      size="small"
      hiddenLabel
      autoFocus
      margin="none"
      disabled={loading}
      sx={{
        width: '100%'
      }}
      placeholder="Edit chat title"
      InputProps={{
        style: {
          color: '#c3cdfa'
        },
        endAdornment: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > *': {
                color: '#c3cdfa',
                maxWidth: '50px'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={14} />
            ) : (
              <>
                <IconButton onClick={() => submitHandler()}>
                  <Check />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  <Cancel />
                </IconButton>
              </>
            )}
          </Box>
        )
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          submitHandler();
          setIsEdit(false);
        } else if (e.key === 'Escape') {
          setIsEdit(false);
        }
      }}
    />
  );
}
