import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useApi = () => {
  const { getIdTokenClaims } = useAuth0();

  const callApi = async (endpoint) => {
    try {
      const token = await getIdTokenClaims({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });
      console.log("JWT Token:", token); // Log the token to verify it
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token.__raw}`,
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
