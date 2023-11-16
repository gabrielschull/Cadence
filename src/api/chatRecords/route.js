import { chatMemory } from '../openai';
import { supabase } from '../../supabaseClient';

export const POST = async (req) => {
  try {
    chatMemory.clear();
  } catch (e) {
    console.error(e);
  }

  const body = await req.json();

  const { data, error } = await supabase()
    .from(process.env.REACT_APP_SUPABASE_CHAT_RECORDS_TABLE)
    .select('id, message, actor, created_at')
    .eq('checksum', body.checksum)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    return error;
  }

  // check for return -> needs to emulate nextResponse.json(data)
  return {
    'data': data,
    'status': 200,
    'statusText': "OK",
  };
};
