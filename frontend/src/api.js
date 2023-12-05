const host = process.env.REACT_APP_HOST
const BASE_URL = `https://${host}/api/1.0`;

export const fetchAccountingData= async () => {
    const response = await fetch(`${BASE_URL}/account/list`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  