import { useState } from 'react'
import { Cancel, Check } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDocument, updateConversationTitle } from '../../../Redux/ChatSlice'
import { useHttpClient } from '../../../useHttpClient'

export default function ChatTitleInput ({
  chatId,
  chatTitle,
  setChatTitle,
  setIsEdit
}) {
  const dispatch = useDispatch()
  const oldhistory = useSelector((state) => state.chat.conversationHistory)
  const currentConversation = useSelector((state) => state.chat.currentDocument)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { fetch } = useHttpClient()

  const submitHandler = async () => {
    if (!chatTitle) return

    setLoading(true)
    console.log('chatTitle', chatTitle )

    await fetch('/api/edit-title', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: chatTitle, id: chatId })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        setLoading(false)

        if (data.status !== 200) {
          setError(true)
        } else {
          setError(false)
          setIsEdit(false)
          setChatTitle(chatTitle)

          console.log('currentConversation', currentConversation)

          const updatedConversation = {
            ...currentConversation,
            title: chatTitle
          }
          console.log('updatedConversation', updatedConversation)

          dispatch(setCurrentDocument(updatedConversation))

          const updatedHistoryItem = oldhistory.find(item => item.checksum === chatId)

          if (updatedHistoryItem) {
            const updatedItem = {
              ...updatedHistoryItem,
              title: chatTitle
            }
            dispatch(updateConversationTitle(updatedItem))
          }
        }
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  return (
    <TextField
      fullWidth
      variant="filled"
      value={chatTitle}
      onChange={(e) => {
        setChatTitle(e.target.value)
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
            {loading
              ? (
              <CircularProgress size={14} />
                )
              : (
              <>
                <IconButton onClick={() => submitHandler()}>
                  <Check />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsEdit(false)
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
          submitHandler()
          setIsEdit(false)
        } else if (e.key === 'Escape') {
          setIsEdit(false)
        }
      }}
    />
  )
}
