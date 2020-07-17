const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dataBase = require('./db').getInstance();
dataBase.setModels();
const controllers = require('./controllers');
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let whitelist = ['http://localhost:3000', 'http://localhost:3300'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", '*');
  next();
});

app.use('/api', cors(corsOptions), router.router);
app.use('*', cors(corsOptions), controllers.notFoundPage);
app.use((err, req, res, next) => {
  res
      .status(err.status || 500)
      .json({
        message: err.message || 'Unknown Error',
        controller: err.controller
      });
});

app.listen(process.env.PORT, err => {
    console.log('Server listen on port ' + process.env.PORT + '...');
});
