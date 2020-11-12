
# Financial Map API

A barebones Node.js app using [Express](http://expressjs.com/).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
npm install
npm run dev
```

## Updating Swagger Docs

Configure your endpoint and add the swagger comments, for example:
```js
app.get('/example', async (req, res) => {
  // #swagger.tags = ['Example']
  // #swagger.description = 'Endpoint to get a exemple data.'
  res.json({message: 'This is an Example'});
});
```

Than run the command bellow and acces the docs on your machine [API Docs](http:/localhost:3000/api-docs).

```sh
npm run swagger-autogen
npm run dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
