const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');
const sequelize = require('./config/sequelizeConfig');
const app = express();
const port = 3000;

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'usuarios',
        version: '1.0.0',
        description: 'Descripción de tu API',
      },
    },
    apis: ['./routes/*.js'], // Ruta a tus archivos que contienen comentarios Swagger
  };


const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { background-color: #3498db; }',
    customJs: './config//custom.js', // Ruta a tu archivo JavaScript personalizado (si lo tienes)
    swaggerOptions: {
      dom_id: '#swagger-ui',
      defaultModelRendering: 'example',
    },
  };

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get('/custom.js', (req, res) => {
    res.sendFile(__dirname + '/config/custom.js');
  });


app.use(bodyParser.json());

app.use('/api', routes);


sequelize.sync({ force: false })
 .then(() => {
    console.log('Base de datos y tablas creadas.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

app.listen(port, () => {
    console.log(`El servidor está escuchando en http://localhost:${port}`);
});