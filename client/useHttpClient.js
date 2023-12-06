export const useHttpClient = () => {

    const fetch = async (url, options) => {
        try {
        const res = await window.fetch(`http://localhost:3000${url}`, {
            
            ...options,
        });
    if (res.status === 401) {
        console.log('401 Unauthorized');
    }

    return res
} catch (error) {
    console.log('Network error', error);

    }
};

return {
    fetch
};
};