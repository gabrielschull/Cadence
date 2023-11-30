const { ChatOpenAI } = require('langchain/chat_models/openai');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { BufferMemory } = require('langchain/memory');
const { OpenAIApi } = require('openai');

const chatMemory = new BufferMemory();

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
  streaming: true,
  temperature: 0.9
});

const openAI = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

const openAIEmbedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-ada-002'
});

module.exports = {
  chatMemory,
  llm,
  openAI,
  openAIEmbedding
};