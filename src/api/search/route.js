import { search } from "./search";

export const POST = async (req) => {
    const { query } = req.json();

    const { data, error } = await search(query);

    if (error) {
        console.error(error);
        return { error };
    }
    let response = data.json()
    return { response };
}