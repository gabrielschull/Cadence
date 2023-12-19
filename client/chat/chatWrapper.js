import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveChatId, setConversationHistory } from "../Redux/ChatSlice";
import { useHttpClient } from "../useHttpClient";
import { useSelector } from "react-redux";

const ChatWrapper = ({ children }) => {
    const dispatch = useDispatch();

    const { fetch } = useHttpClient();
    const activeChatId = useSelector((state) => state.chat.activeChatId);
    const session = useSelector((state) => state.user.authState.session);
    const userId = session?.user?.id
    if (!userId) {
        return null;
    }
    console.log ('CHATWRAPPER userId', userId)
    console.log('chatwrapper rendered')
    useEffect(() => {
        console.log('chatwrapper useEffect UserId', userId)
        const loadHistory = async () => {
        const response = await fetch(`/api/history?userId=${userId}`);
        const data = await response.json();
        dispatch(setConversationHistory(data));
    }
        loadHistory(); 
    }, [dispatch, fetch, activeChatId]);

    return children;
    }

export default ChatWrapper;