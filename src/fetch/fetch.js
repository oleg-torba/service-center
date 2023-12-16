import axios from 'axios';

async function FetchDetails(query) {
  const request = await axios.get(
    `https://back-2cjl.onrender.com/api/search/:${query}`
  );

  return request.data
}

export default FetchDetails