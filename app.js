const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('ejs');

const dbConnectionString = 'mongodb://localhost:27017/wikiDB';

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello world');
});

// eslint-disable-next-line no-bitwise
app.listen(process.env.PORT | 3000, () => {
  console.log(`${new Date().toISOString()}: server is running`);
});
