import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentDocument, clearActiveChat } from '../../../Redux/ChatSlice'

import { useHttpClient } from '../../../useHttpClient'
import { Alert, Grid, List, Typography } from '@mui/material'

import { useChatStream } from '../../useChatStream'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatItem from './ChatItem'
import { Loader } from './Loader'

export default function ChatContainer () {
  const dispatch = useDispatch()
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  const currentDocument = useSelector((state) => state.chat.currentDocument)

  const [conversations, setConversations] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  const { fetch } = useHttpClient()

  const { submitHandler } = useChatStream()

  const chatRecords = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/chat-records/${activeChatId}`, {
        method: 'GET'
      })
      console.log('res', res)
      setLoading(false)
      const data = await res.json()
      setConversations(prev => {
        const existingIds = new Set(prev.map(msg => msg.id))
        const newMessages = data.filter(item => !existingIds.has(item.id)).map(item => ({
          id: item.id,
          user: item.actor,
          message: item.message,
          created_at: item.created_at
        }))
        return [...prev, ...newMessages]
      })
    } catch (err) {
      setLoading(false)
      console.error(err)
      toast.error('Cannot fetch chat records. Please try again later.', {
        toastId: 'chat_error'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatId])

  useEffect(() => {
    setConversations([])
    chatRecords()
  }, [activeChatId, chatRecords])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversations.length])

  return (
    <Grid container flexDirection="column" height="100%">
      {conversations && conversations.length > 0 && <ChatHeader />}
      <Grid
        xs
        item
        id="chat-grid"
        sx={{
          height: '100%',
          userSelect: 'none',
          justifyContent: conversations.length ? 'flex-end' : 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {conversations.length === 0
          ? (
          <>
          <button onClick={() => {
            dispatch(clearCurrentDocument())
            dispatch(clearActiveChat())
          }}>Clear</button>
            <Typography sx={{ color: 'black', padding: '20px 0px' }}>
              Cadence is here to help!
            </Typography>
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              Ask anything about <b>{currentDocument?.title}</b>
            </Alert>
          </>
            )
          : (
          <List
            height={800}
            ref={scrollRef}
            style={{
              width: '100%',
              height: 'auto',
              justifyContent: 'flex-end',
              padding: '20px 0px',
              overflow: 'auto'
            }}
          >
            {conversations.map((conversation) => {
              const key = `${conversation.created_at}-${conversation.user}`
              return (
                <ChatItem
                  key={key}
                  conversation={conversation}
                  setConversations={setConversations}
                />
              )
            })}
            {newMessage && (
              <ChatItem
                key={newMessage.id}
                conversation={newMessage}
                setConversations={setConversations}
              />
            )}
            <ChatItem autoFocus={true} />
          </List>
            )}
      </Grid>
      {loading
        ? (
        <Loader />
          )
        : (
        <ChatInput
          submitHandler={(message) => {
            submitHandler({
              documentId: activeChatId,
              message,
              setNewMessage,
              setConversations
            }).then(() => {
              chatRecords()
            })
          }}
        />
          )}
    </Grid>
  )
}
