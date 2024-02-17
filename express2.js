import express from 'express';
import https from 'https';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 8080;

const options = {
  key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.get('/hi', (req, res) => {
  setTimeout(() => {
    console.log('hi');
    res.send('hi');
  }, 3000); // Wait for 3 seconds before responding
});

const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
