import axios from 'axios';

async function FetchHelp() {
  const request = await axios.post(
    `https://back-2cjl.onrender.com/api/help`
  );

  return request.data
}

export default FetchHelp