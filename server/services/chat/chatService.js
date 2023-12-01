import { supabase } from '../../supabase.js';

const deleteMessageById = async (id) => {
    const { error } = await supabase()
      .from(process.env.REACT_APP_CHAT_RECORDS_TABLE)
      .delete()
      .match({ id });
  
    return { error };
  };
  
  const deleteDoc = async (checksum) => {
    const { error } = await supabase()
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
      .delete()
      .eq('checksum', checksum);
  
    return { error };
  };
  
  export {
    deleteMessageById,
    deleteDoc
  };