const environment = String(process.env.NODE_ENV || 'development').trim();

if (environment === 'production') {
  require("appdynamics").profile({
    controllerHostName: 'grace202011220844374.saas.appdynamics.com',
    controllerPort: 443,

    // If SSL, be sure to enable the next line
    controllerSslEnabled: true,
    accountName: 'grace202011220844374',
    accountAccessKey: 'zfaazz9h3n17',
    applicationName: 'node-simple-api',
    tierName: 'node-simple-api',
    nodeName: 'process' // The controller will automatically append the node name with a unique number
  });
}

const app = require('express')();
const cors = require('cors');
const morgan = require('morgan');
const http = require('http')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(morgan('dev'));
app.use(cors());

http.createServer(app).listen(port);
console.log(`Listening at:// port:${port} (HTTP)`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
require('./endpoints')(app);