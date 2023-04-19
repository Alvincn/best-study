const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const router = require('./router/index');
app.use('/node', router);
app.listen(3010, () => {
  console.log('Server is running at http://127.0.0.1:3010');
});
