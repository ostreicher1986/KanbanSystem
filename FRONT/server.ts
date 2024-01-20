const express = require('express');
const dotenv  = require('dotenv');

dotenv.config({ path: ".env" });

const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`)
});

const port = process.env.PORT || process.env.SERVER_PORT;

app.listen(port);
