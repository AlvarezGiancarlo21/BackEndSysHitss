// models/servicio.js
const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  /*
  nombreCliente: String,
  status: String,
  avance: String,
  fechaEntregaPropuesta: Date,
  nombreConsultor: String,
  nombreSolucion: String,
  alianza: String,
  descripcion: String,
  operacionRealizar: String
  */ 
 fechaFoto:Date,
 segmento:String,
 region:String,
 piramide:String,
 fechaActivacion:Date,
 fechaCierre:Date,
 ruc:String,
 cliente:String,
 empresaProspecta:String,
 status:String,
 avance:String,
 fechaEntregaPropuesta:String,
 consultor:String,
 solucionesServicios:String,
 alianza:String,
 descripcion:String,
 duracionMesesContratoCliente:String,
 precioTotalClienteUSD:String,
 precioTotalHitssaClaroUSD:String,
 siguienteAcciones:String,
 avanceNumero:Number,
 pendiente:String,
 proveedor:String,
 fechaesperadCierre:Date,
 clienteTarget:String,


});

module.exports = mongoose.model('Servicio', servicioSchema);
