const { openAIEmbedding } = require('../../openai');
const { supabase } = require('../../supabaseClient');

const filterSimilarVectors = async (documentId, message, matchCount) => {
  const query_embedding = await openAIEmbedding.embedQuery(message);

  const { data: vectors, error } = await supabase().rpc('match_documents', {
    query_embedding,
    match_count: matchCount,
    filter_checksum: documentId
  });

  if (error) {
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

module.exports = {
  filterSimilarVectors
};