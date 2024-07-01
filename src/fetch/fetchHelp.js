import axios from 'axios';

async function FetchHelp() {
  const request = await axios.post(`https://my-w0bk.onrender.com/api/help`);

  return request.data;
}

export default FetchHelp;
