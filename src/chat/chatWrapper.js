import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConversationHistory } from "../Redux/ChatSlice";
import { useHttpClient } from "../useHttpClient";
import { useSelector } from "react-redux";

export default ChatWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const { fetch } = useHttpClient();
    const activeChatId = useSelector((state) => state.chat.activeChatId);

    useEffect(() => {
        const loadHistory = async () => {
        const response = await fetch("/api/history");
        const data = await response.json();
        dispatch(setConversationHistory(data));
        };
        loadHistory(); 
    }, [dispatch, fetch, activeChatId]);

    return children;
    }