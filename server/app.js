const express = require('express');
const path = require('path');
require('dotenv').config();

const router = require('./routes');

const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, './public');

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} received for URL: ${req.url}`);
  next();
});

app.use(express.static(staticPath));
app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Express server started on port:${port}`);
})

