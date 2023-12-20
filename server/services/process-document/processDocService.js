import SqlString from 'sqlstring';
import { supabase } from '../../supabase.js';

const fetchDocument = async ({ checksum }) => {
  const { data, error, count } = await supabase
    .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
    .select('checksum, document_name, title', {
      count: 'exact'
    })
    .eq('checksum', checksum);

  if (error) {
    console.error(error);
    return { error };
  }

  if (count === 0) {
    return {
      data: null,
      error: null
    };
  }

  const { checksum: id, document_name: fileName, title } = data[0];
  return {
    data: {
      id,
      fileName,
      title
    },
    error: null
  };
};

const saveDocument = async ({ checksum, fileName, chunks, userId, fileExtension }) => {
  const { data: object, error: objectError } = await supabase
    .schema('storage')
    .from('objects')
    .select('id')
    .eq('name', `${checksum}${fileExtension}`);

  if (objectError || object?.length === 0) {
    return {
      error: objectError || 'Couldn\'t find object in storage'
    };
  }

  const { error } = await supabase
    .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
    .insert({
      checksum,
      document_name: fileName,
      title: fileName,
      uploaded_object_id: object[0].id,
      created_by: userId
    });

  if (error) {
    console.error(error);
    return { error };
  }

  const { error: saveChunksError } = await saveDocumentChunks(checksum, chunks, userId, fileExtension);
  if (saveChunksError) {
    await supabase
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
      .delete({ count: 1 })
      .eq('checksum', checksum);

    return {
      error: saveChunksError
    };
  }

  return {
    data: {
      id: checksum,
      fileName
    },
    error: null
  };
};

const saveDocumentChunks = async (checksum, chunks, userId) => {
  const { content, embeddings } = chunks;

  let data = [];
  for (let i = 0; i < content.length; i++) {
    data.push({
      document_checksum: checksum,
      chunk_number: i + 1,
      chunk_content: SqlString.escape(content[i]),
      chunk_embedding: embeddings[i],
      created_by: userId
    });
  }

  const { error } = await supabase
    .from(process.env.REACT_APP_SUPABASE_DOCUMENT_CHUNKS_TABLE)
    .insert(data);

  if (error) {
    console.error(error);
    console.log('error in processDocService.js');
    return { error };
  }

  return { error: null };
};

export { fetchDocument, saveDocument };
