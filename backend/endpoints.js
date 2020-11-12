'use-strict';

const FundamentusService = require('./service/FundamentusService');
const NewsService = require('./service/NewsService');

module.exports = function (app) {
  app.get('/stock', async function (req, res) {
    // #swagger.tags = ['Stock']
    // #swagger.description = 'Endpoint para obter lista de ações.'
    const data = await FundamentusService.fetchStocks(res);
    return res.json(data);
  });

  app.get('/news', async (req, res) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Endpoint para obter ultimas notícias.'
    const data = await NewsService.fetchAllNews();
    res.json(data);
  });

  app.get('/news/:stock', async (req, res) => {
    // #swagger.tags = ['News']
    // #swagger.description = 'Endpoint para obter notícias de uma ação.'
    /* #swagger.parameters['stock'] = {
      description: 'Código da ação a ser buscada, como por exemplo MGLU3.',
      type: 'string'
    } */
    const stock = req.params.stock;
    const data = await NewsService.fetchNewsForStock(stock);
    res.json(data);
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
}
