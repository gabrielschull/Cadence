import { supabase } from '../../supabaseClient';

export const GET = async () => {
  const { data: documents, error } = await supabase()
    .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
    .select('checksum, document_name, title')
    .order('created_time', { ascending: true });

  if (error) {
    console.error(error);
    return error;
  }

  return documents.json();
};
