import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
  const { getIdTokenClaims } = useAuth0();

  const getMedications = async () => {
    const token = await getIdTokenClaims();
    const response = await axios.get('https://medtrakback.onrender.com/api/medications', {
      headers: {
        Authorization: `Bearer ${token.__raw}`,
      },
    });
    return response.data;
  };

  const createMedication = async (medication) => {
    const token = await getIdTokenClaims();
    const response = await axios.post('https://medtrakback.onrender.com/api/medications', medication, {
      headers: {
        Authorization: `Bearer ${token.__raw}`,
      },
    });
    return response.data;
  };

  const updateMedication = async (id, medication) => {
    const token = await getIdTokenClaims();
    console.log('medication:', medication);
    console.log('id:', id);
    const response = await axios.put(`https://medtrakback.onrender.com/api/medications/${id}`, medication, {
      headers: {
        Authorization: `Bearer ${token.__raw}`,
      },
    });
    return response.data;
  };

  const deleteMedication = async (id) => {
    try {
      const token = await getIdTokenClaims();
      const response = await axios.delete(`https://medtrakback.onrender.com/api/medications/${id}`, {
        headers: {
          Authorization: `Bearer ${token.__raw}`,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting medication:', error.response || error.message); // Improved error logging
      throw error;
    }
  };

  return { getMedications, createMedication, updateMedication, deleteMedication };
};

export default useApi;
