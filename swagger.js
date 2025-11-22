const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info:{
        title: "user Api",
        description: "User Api for simple account creation"
    },
    host: "localhost:3030",
    schemes: ['https']
}
const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']
swaggerAutogen(outputFile,endpointsFiles, doc);