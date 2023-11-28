const { RecursiveCharacterTextSplitter } = require ('langchain/text_splitter');

const { openAIEmbedding } = require ('../../openai');

const generateEmbeddings = async (content) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 100
  });

  const chunks = await splitter.splitText(content.join(' '));

  return {
    content: chunks,
    embeddings: await openAIEmbedding.embedDocuments(chunks)
  };
};

module.exports = { generateEmbeddings };