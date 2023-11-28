import { supabase } from '../../../../server/supabaseClient';

export const DELETE = async (_, { params: { id } }) => {
  const { error } = await supabase()
    .from(process.env.REACT_APP_SUPABASE_DOCUMENTS_TABLE)
    .delete()
    .eq('checksum', id?.toString());

  if (error) {
    console.error({ error });
    return error;
  }

// check for return -> needs to emulate nextResponse.json(data)
  return {
    "data": {},
    "status": "200",
    "statusText": "OK",
  };
};
