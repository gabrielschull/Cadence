import { useEffect, useState } from 'react'

import { HistoryEdu } from '@mui/icons-material'
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  CircularProgress
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveChatId, setCurrentDocument, setOpenDraw } from '../../../Redux/ChatSlice'
import ActionButtons from './ActionButtons'
import ChatTitleInput from './ChatTitleInput'
import DeleteDialog from './DeleteDialog'

export default function HistoryListItem ({ isActive, conversation }) {
  const dispatch = useDispatch()
  const currentDocument = useSelector((state) => state.chat.currentDocument)

  const [isEdit, setIsEdit] = useState(false)
  const [chatToDelete, setChatToDelete] = useState(null)
  const [chatTitle, setChatTitle] = useState(conversation.title)

  useEffect(() => {
    setChatTitle(conversation.title)
  }, [conversation.title])

  //cleanup when component unmounts
  useEffect(() => {
    return () => {
      setIsEdit(false)
      setChatToDelete(null)
      setChatTitle(conversation.title)
    }
  }, [conversation.title, isActive])

  return (
    <ListItem
      disablePadding
      sx={{
        background: isActive ? '#42475f' : '#313338',
        '&:hover': {
          background: '#42475f'
        }
      }}
    >
      {chatToDelete && (
        <DeleteDialog
          chatToDelete={chatToDelete}
          setChatToDelete={setChatToDelete}
        />
      )}
      <ListItemButton
        sx={{
          padding: '15px 10px',
          color: '#ffffff',
          borderRadius: '1px',
          fontSize: '12px'
        }}
        onClick={() => {
          dispatch(setActiveChatId(conversation.checksum))
          dispatch(setCurrentDocument({
            title: conversation.title,
            id: conversation.checksum,
            fileName: conversation.document_name,
            content: conversation.content
          }))
          dispatch(setOpenDraw(false))
        }}
      >
        <ListItemIcon>
          <HistoryEdu
            sx={{
              color: '#ffffff'
            }}
          />
        </ListItemIcon>
        <ListItemText>
          <Tooltip title={currentDocument.title} placement="bottom-end">
            <Typography
            component='div'
              sx={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '90%'
              }}
            >
              {isActive && isEdit
                ? (
                <ChatTitleInput
                  chatId={conversation.checksum}
                  chatTitle={chatTitle}
                  setChatTitle={setChatTitle}
                  setIsEdit={setIsEdit}
                  setCurrentDocument={(document) => dispatch(setCurrentDocument(document))}
                />
                  )
                : (
                    chatTitle 
                  )}
            </Typography>
          </Tooltip>
        </ListItemText>
      </ListItemButton>
      {isActive && !isEdit && (
        <ActionButtons
          chatId={conversation.checksum}
          setChatToDelete={setChatToDelete}
          setIsEdit={setIsEdit}
        />
      )}
    </ListItem>
  )
}
