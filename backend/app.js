const express = require('express');
const cors = require('cors');
const http = require('http')
const morgan = require('morgan');
const FundamentusService = require('./service/FundamentusService');

const app = express();

app.disable("x-powered-by");
app.use(morgan('dev'));
app.use(cors());

app.use('/stock', async function (req, res) {
  const data = await FundamentusService.fetchStocks(res);
  return res.json(data);
});

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
}

const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});