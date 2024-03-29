import { supabase } from '../../supabaseClient';

const bucket = process.env.REACT_APP_SUPABASE_BUCKET;

export const download = async (objectId) => {
  const { data, error } = await supabase()
    .storage.from(bucket)
    .download(objectId);

  if (error) {
    console.error(error);
    return { error };
  }

  return { file: data };
};
