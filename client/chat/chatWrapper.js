import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversationHistory } from '../Redux/ChatSlice'
import { useHttpClient } from '../useHttpClient'

const ChatWrapper = ({ children }) => {
  const dispatch = useDispatch()

  const { fetch } = useHttpClient()
  const activeChatId = useSelector((state) => state.chat.activeChatId)
  const session = useSelector((state) => state.user.authState.session)
  const userId = session?.user?.id

  useEffect(() => {
    if (!userId) {
      return
    }
    const loadHistory = async () => {
      const response = await fetch(`/api/history?userId=${userId}`)
      const data = await response.json()
      dispatch(setConversationHistory(data))
    }
    loadHistory()
  }, [dispatch, fetch, activeChatId, userId])

  return children
}

export default ChatWrapper
