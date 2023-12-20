import { ListItem, ListItemText, Typography } from '@mui/material'

import { useSelector } from 'react-redux'

import HistoryListItem from './HistoryListItem'

export default function ConversationHistory () {
  const conversationHistory = useSelector((state) => state.chat.conversationHistory)
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  console.log('activeChatId', activeChatId)
  console.log('conversationHistory', conversationHistory)

  return (
    <>
      {!conversationHistory ||
        (conversationHistory.length === 0 && (
          <ListItem
            disablePadding
            sx={{
              padding: '15px 10px',
              background: '#535876',
              color: '#ffffff',
              borderRadius: '1px',
              fontSize: '12px',
              userSelect: 'none'
            }}
          >
            <ListItemText>
              <Typography variant="subtitle1">No conversations yet</Typography>
              <Typography variant="caption">
                Upload a document to start a conversation
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      {Array.isArray(conversationHistory) && conversationHistory?.map((conversation) => (
        <HistoryListItem
          conversation={conversation}
          isActive={activeChatId === conversation.checksum}
          key={conversation.checksum}
        />
      ))}
    </>
  )
}
