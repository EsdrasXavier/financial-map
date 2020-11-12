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