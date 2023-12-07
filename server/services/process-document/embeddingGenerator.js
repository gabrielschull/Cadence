import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { openAIEmbedding } from '../../openai.js';

const generateEmbeddings = async (content) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 5000,
    chunkOverlap: 100
  });
  //console.log('CONTENT', content);
  const chunks = await splitter.splitText(content.join(' '));

  return {
    content: chunks,
    embeddings: await openAIEmbedding.embedDocuments(chunks)
  };
};

export { generateEmbeddings };
