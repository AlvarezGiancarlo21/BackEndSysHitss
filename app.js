// app.js
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./db');
const servicioRoutes = require('./routes/servicio');

const app = express();
const port = process.env.PORT || 3500;

const cors = require('cors');
const exceljs = require('exceljs');
const fs = require('fs');

const Servicio = require('./models/servicio');

app.use(cors());


// Middleware
app.use(bodyParser.json());

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Backen-End del Sistema de gestion de servicios de SysHitss',
      version: '1.0.0',
      description: 'En el backend presentado a continuacion se muestra las apis por cada funcionalidad del sistema de syshitss.',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/servicios', servicioRoutes);

// Start server
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

/**
 * @swagger
 * /exportar-excel:
 *   get:
 *     summary: Exportar la colección de servicios a un archivo Excel
 *     responses:
 *       '200':
 *         description: Archivo Excel generado exitosamente
 *       '500':
 *         description: Error en la generación del archivo Excel
 */
app.get('/exportar-excel', async (req, res) => {
  try {
    const servicios = await Servicio.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Servicios');

    // Definir las columnas en la hoja de cálculo
    worksheet.columns = [
      { header: 'Fecha Foto', key: 'fechaFoto', width: 15 },
      { header: 'Segmento', key: 'segmento', width: 15 },
      // Agrega aquí las demás columnas
    ];

    // Agregar datos a la hoja de cálculo
    servicios.forEach(servicio => {
      worksheet.addRow(servicio.toObject());
    });

    // Guardar el archivo Excel
    const excelFilename = 'servicios.xlsx';
    await workbook.xlsx.writeFile(excelFilename);

    // Descargar el archivo Excel generado
    res.download(excelFilename, () => {
      // Eliminar el archivo después de la descarga
      fs.unlinkSync(excelFilename);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en la generación del archivo Excel' });
  }
});
