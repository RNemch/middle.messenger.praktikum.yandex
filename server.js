const express = require('express');
const { resolve } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(resolve(__dirname, 'dist')));

app.listen(PORT, function () {
  console.log(`Привет, мир! я на ${PORT} порте`);
});
