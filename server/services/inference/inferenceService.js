const { ChatMessageHistory } = require('langchain/memory');
const { chatMemory } = require('../../openai');
const { processInference } = require('./processInference');

function saveChatToBuffer(documentId, message, context, role = 'human') {
    try {
        if (chatMemory.memoryKey !== documentId) {
            chatMemory.memoryKey = documentId;
        }

        const saveItem = {
            name: role,
            content: message,
            context
        };

        if (chatMemory.chatHistory) {
            chatMemory.chatHistory.addMessage(saveItem);
        } else {
            chatMemory.chatHistory = new ChatMessageHistory().addMessage(saveItem);
        }
    } catch (error) {
        console.error({ error });
    }
}

module.exports = {
    saveChatToBuffer,
    processInference 
};