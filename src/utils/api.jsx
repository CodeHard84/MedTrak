import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async (endpoint) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(`Calling API with token: ${token}`);
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error calling API", error);
      throw error;
    }
  };

  return { callApi };
};
