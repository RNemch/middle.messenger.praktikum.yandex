const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback')

const app = express();
const PORT = process.env.PORT || 3000;
const root = __dirname + '/dist'

app.use(express.static(root));

app.use(fallback('index.html', {root: root}))

app.listen(PORT, function () {
  console.log(`Привет, мир! я на ${PORT} порте`);
});
