import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConversationHistory } from "../Redux/ChatSlice";
import { useHttpClient } from "../useHttpClient";

const chatWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const { fetch } = useHttpClient();
    useEffect(() => {
        const loadHistory = async () => {
        const response = await fetch("/api/history");
        const data = await response.json();
        dispatch(setConversationHistory(data));
        };
        loadHistory(); 
    }, [dispatch, fetch]);

    return children;
    }