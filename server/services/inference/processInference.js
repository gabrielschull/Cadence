import { qaChain } from '../langchain/chains.js';
import { sequentialPipeline } from '../langchain/pipeline.js';
import { saveChat } from './saveChat.js';
import { filterSimilarVectors } from './vectorSearch.js';

const processInference = async ({
  documentId,
  question,
  matchCount = 10,
  stream,
  aiMessageId
}) => {
  const writer = stream.writable.getWriter();

  const { content, error } = await filterSimilarVectors(
    documentId,
    question,
    matchCount
  );

  if (error) {
    console.error({ error });
    await writer.close();

    throw error;
  }

  try {
    const chains = [qaChain()];
    let chainSequence = chains.length;
    let aiMessage = '';
    const id = aiMessageId;

    const callbacks = [
      
      {

        async handleLLMNewToken(token) {
          console.log('TOKEN', token)
          
            //await writer.ready;
            //await writer.write(token);
            aiMessage += token;
            console.log('aiMessage', aiMessage)
          
           
        },
        async handleChainEnd() {
          
          if (chainSequence === 1) {
            try {
              await saveChat({
                id,
                message: aiMessage,
                checksum: documentId,
                actor: 'ai'
              })
              writer.close();
            } catch(error) {
              console.error({ error }, 'error saving ai message');
            };
            
          }
          chainSequence -= 1;

        }
      }
    ];

    return sequentialPipeline({ content, question, chains, callbacks }).catch(
      async (err) => {
        console.error({ err });
        await writer.close();
        throw err;
      }
    );
  } catch (error) {
    console.error({ error });
    return {
      error
    };
  }
};

export { processInference };
