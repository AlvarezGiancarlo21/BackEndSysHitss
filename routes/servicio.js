// routes/servicio.js
const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicio');

/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       properties:
 *         fechaFoto:
 *           type: string
 *           format: date
 *         segmento:
 *           type: string
 *         region:
 *           type: string
 *         piramide:
 *           type: string
 *         fechaActivacion:
 *           type: string
 *           format: date
 *         fechaCierre:
 *           type: string
 *           format: date
 *         ruc:
 *           type: string
 *         cliente:
 *           type: string
 *         empresaProspecta:
 *           type: string
 *         status:
 *           type: string
 *         avance:
 *           type: string
 *         fechaEntregaPropuesta:
 *           type: string
 *           format: date
 *         consultor:
 *           type: string
 *         solucionesServicios:
 *           type: string
 *         alianza:
 *           type: string
 *         descripcion:
 *           type: string
 *         duracionMesesContratoCliente:
 *           type: string
 *         precioTotalClienteUSD:
 *           type: string
 *         precioTotalHitssaClaroUSD:
 *           type: string
 *         siguienteAcciones:
 *           type: string
 *         avanceNumero:
 *           type: number
 *         pendiente:
 *           type: string
 *         proveedor:
 *           type: string
 *         fechaesperadCierre:
 *           type: string
 *           format: date
 *         clienteTarget:
 *           type: string
 */


/**
 * @swagger
 * /servicios:
 *   get:
 *     summary: Obtener todos los servicios
 *     responses:
 *       '200':
 *         description: Lista de servicios
 *         content:
 *           application/json:
 *             example: []
 */
router.get('/', async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /servicios:
 *   post:
 *     summary: Crear un nuevo servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       '201':
 *         description: Servicio creado exitosamente
 *       '400':
 *         description: Datos no válidos
 */
router.post('/', async (req, res) => {
  const servicio = new Servicio(req.body);
  try {
    const nuevoServicio = await servicio.save();
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /servicios/{id}:
 *   put:
 *     summary: Actualizar un servicio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del servicio a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       '200':
 *         description: Servicio actualizado exitosamente
 *       '400':
 *         description: Datos no válidos
 *       '404':
 *         description: Servicio no encontrado
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const servicio = await Servicio.findByIdAndUpdate(id, req.body, { new: true });
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.json(servicio);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

/**
 * @swagger
 * /servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del servicio a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Servicio eliminado exitosamente
 *       '404':
 *         description: Servicio no encontrado
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const servicio = await Servicio.findByIdAndDelete(id);
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


/**
 * @swagger
 * /servicios/{id}:
 *   get:
 *     summary: Obtener detalles de un servicio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del servicio a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalles del servicio
 *         content:
 *           application/json:
 *             example: {}
 *       '404':
 *         description: Servicio no encontrado
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const servicio = await Servicio.findById(id);
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
