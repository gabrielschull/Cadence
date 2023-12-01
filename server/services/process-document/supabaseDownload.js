import { supabase } from '../../supabase';

const bucket = process.env.REACT_APP_SUPABASE_BUCKET;

const download = async (objectId) => {
  const { data, error } = await supabase()
    .storage.from(bucket)
    .download(objectId);

  if (error) {
    console.error(error);
    return { error };
  }

  return { file: data };
};

export { download };
