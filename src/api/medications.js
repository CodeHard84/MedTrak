import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMedications = async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get('https://medtrakback.onrender.com/api/medications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const createMedication = async (medication) => {
    const token = await getAccessTokenSilently();
    const response = await axios.post('https://medtrakback.onrender.com/api/medications', medication, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const updateMedication = async (id, medication) => {
    const token = await getAccessTokenSilently();
    const response = await axios.put(`https://medtrakback.onrender.com/api/medications/${id}`, medication, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const deleteMedication = async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`https://medtrakback.onrender.com/api/medications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { getMedications, createMedication, updateMedication, deleteMedication };
};

export default useApi;
