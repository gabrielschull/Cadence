const { supabase } = require('../../supabase');

const saveChat = async (chatRecord) => {
    const { error } = await supabase()
        .from(process.env.REACT_APP_SUPABASE_CHAT_RECORDS_TABLE)
        .insert({
            ...chatRecord
        });

    if (error) {
        console.error(error);
        return { error };
    }

    return { error: null };
};

module.exports = { saveChat };