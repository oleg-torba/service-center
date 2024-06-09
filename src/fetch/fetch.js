import axios from 'axios';

async function FetchDetails(query) {
  const request = await axios.get(
    `https://my-w0bk.onrender.com/api/search/:${query}`
  );

  return request.data;
}

export default FetchDetails;
