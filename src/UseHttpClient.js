import { useNavigate } from 'react-router-dom';

export const useHttpClient = () => {
  const navigate = useNavigate();

  const fetch = async (url, options) => {
    const res = await window.fetch(url, options);

    if (res.status === 401) {
      navigate('/login');
      return;
    }

    return res;
  };

  return { fetch };
};