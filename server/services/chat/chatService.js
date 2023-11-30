const { supabase } =  require ('../../supabase');

const deleteChatById = async (id) => {
    const { error } = await supabase()
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
      .delete()
      .eq('id', id);
  
    return { error };
  };
  
  const deleteMessage = async (checksum) => {
    const { error } = await supabase()
      .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
      .delete()
      .eq('checksum', checksum);
  
    return { error };
  };
  
  module.exports = {
    deleteChatById,
    deleteMessage
  };