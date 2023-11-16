import { supabase } from '../../supabaseClient';

export const PATCH = async (req) => {
    try {
  const { id, title } = await req.json();

  const { error, count } = await supabase()
    .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
    .update({ title })
    .eq('checksum', id);

  if (error) {
    console.error(error);
    return error
  }

  if (count === 0) {
    return { error: 'Document not found'};
  }

  return {message: 'Document title updated successfully'}
} catch (error) {
    console.log(error)
}
};
