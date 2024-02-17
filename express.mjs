import express from 'express';
import axios from 'axios';
import https from 'https';

const app = express();
const PORT = process.env.PORT || 3000;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignore self-signed certificate error
  maxSockets: 50000000
});

async function fetchData() {
  const options = {
    method: 'GET',
    url: 'https://localhost:8080/hi',
    httpsAgent // Use custom agent with rejectUnauthorized set to false
  };

  try {
    const response = await axios(options);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    console.log('Error fetching data');
    throw new Error('Error fetching data');
  }
}

// GET endpoint to fetch data
app.get('/fetch-data', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
