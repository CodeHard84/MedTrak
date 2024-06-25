import React, { useEffect, useState } from 'react';
import { useApi } from '../utils/api';

const ProtectedComponent = () => {
  const { callApi } = useApi();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await callApi('https://medtrakback.onrender.com/api/protected');
        setData(result);
      } catch (error) {
        console.error("Error fetching protected data", error);
      }
    };

    fetchData();
  }, [callApi]);

  return (
    <div>
      <h2>Protected Data</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedComponent;
