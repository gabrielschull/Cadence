import { supabase } from '../../../../server/supabaseClient';
// NEED TO PASS IN ID HERE, CURRENTLY NOTHING RECEIVED
export const DELETE = async ({params:  {id} }) => {

  const { data, error } = await supabase()
    .from(process.env.REACT_APP_SUPABASE_CHAT_RECORDS_TABLE)
    .delete({ count: 1 })
    .match(id);

  if (error) {
    console.error(error);
    return error;
  }
// check for return -> needs to emulate nextResponse.json(data)
  return {
    "data": data,
    "status": 200,
    "statusText": "OK",
  };
};
