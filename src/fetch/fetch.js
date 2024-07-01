import axios from 'axios';

async function fetchDetails(query, token) {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/search/${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchDetails;
