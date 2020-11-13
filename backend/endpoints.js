'use-strict';

const FundamentusService = require('./service/FundamentusService');
const NewsService = require('./service/NewsService');

let _cache = {};

const cacheData = (url, data) => {
  _cache[url]['data'] = data;
  _cache[url]['data'].isCached = false;
  _cache[url]['updatedAt'] = Date.now();
}

const getCachedData = url => {
  _cache[url]['data'].isCached = true;
  return _cache[url]['data'];
}

const isRequestCached = url => {
  if (!_cache[url])
    _cache[url] = {};

  // Check if has data and the last time that was updated
  // is smaller than 1 hour. If it's bigger rerturns false
  // and a new request must be made.
  return _cache[url]['data']
    && _cache[url]['updatedAt']
    && _cache[url]['updatedAt'] > Date.now() - 60 * 60 * 1000;
}

module.exports = function (app) {
  app.delete('/cache', async function (req, res) {
    // #swagger.tags = ['Cache']
    // #swagger.description = 'Endpoint limpar cache da aplicação.'
    Object.keys(_cache).forEach(key => delete _cache[key]);
    return res.json({ status: 'ok', cache: _cache });
  });

  app.get('/stock', async function (req, res) {
    const { originalUrl } = req;

    if (isRequestCached(originalUrl))
      return res.json(getCachedData(originalUrl));

    // #swagger.tags = ['Stock']
    // #swagger.description = 'Endpoint para obter lista de ações.'
    const data = await FundamentusService.fetchStocks(res);
    cacheData(originalUrl, data);
    return res.json(data);
  });

  app.get('/news', async (req, res) => {
    const { originalUrl } = req;

    if (isRequestCached(originalUrl))
      return res.json(getCachedData(originalUrl));
    // #swagger.tags = ['News']
    // #swagger.description = 'Endpoint para obter ultimas notícias.'
    const data = await NewsService.fetchAllNews();
    cacheData(originalUrl, data);
    res.json(data);
  });

  app.get('/news/:stock', async (req, res) => {
    const { originalUrl } = req;

    if (isRequestCached(originalUrl))
      return res.json(getCachedData(originalUrl));
    // #swagger.tags = ['News']
    // #swagger.description = 'Endpoint para obter notícias de uma ação.'
    /* #swagger.parameters['stock'] = {
      description: 'Código da ação a ser buscada, como por exemplo MGLU3.',
      type: 'string'
    } */
    const stock = req.params.stock;
    const data = await NewsService.fetchNewsForStock(stock);
    cacheData(originalUrl, data);
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
