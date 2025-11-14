const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./db/connect')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3030
const app = express()

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

mongodb.initDb((err) => {
    if(err){
        console.log(err)
    } else {

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/', require('./routes'))

        app.listen(port)
        console.log(`Connected to DB and listening on ${port}`)
    }
})