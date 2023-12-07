import { openAIEmbedding } from'../../openai.js';
import { supabase } from '../../supabase.js';

const filterSimilarVectors = async (documentId, message, matchCount) => {
  const query_embedding = await openAIEmbedding.embedQuery(message);

  const { data: vectors, error } = await supabase.rpc('match_documents', {
    query_embedding,
    match_count: matchCount,
    filter_checksum: documentId
  });

  if (error) {
    console.log('error in vectorSearch.js')
    return { error };
  }

  return {
    content: vectors
      .map((v) => {
        return v.chunk_content;
      })
      .join(' '),
    error: null
  };
};

export {
  filterSimilarVectors
};