const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

// eslint-disable-next-line no-bitwise
app.listen(process.env.PORT | 3000, () => {
  console.log(`${new Date().toISOString()}: server is running`);
});
