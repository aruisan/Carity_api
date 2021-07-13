const mongoose = require("mongoose");
const Empresas = require('../models/empresas.model');
const Sedes = require('../models/sedes.model');
const Roles = require('../models/roles.model');
const Personas = require('../models/personas.model');
const Usuarios = require('../models/usuarios.model');
const UsuariosSedes = require('../models/usuario_sede.model');
const EstadosEquipo = require('../models/estados_equipo.model');
const TiposEquipos = require('../models/tiposEquipo.model');
const Equipos = require('../models/equipos.model');

const ENV = process.env;

const url = `mongodb://localhost:27017/Clarity`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
    .then((db) => connected())
    .catch((err) => errorConnecting(err));

const connected = () => {
  console.log("DB is connected to: ", ENV.DB_NAME);
};
  
const errorConnecting = (err) => {
    console.log("=========================================");
    console.error("Failed to connect to mongo server: ", url);
    console.error("Probably mongod service is not running");
    console.log("Execute in console one of the following options");
    console.log("> service mongod restart");
    console.log("> mongod");
    console.log("> or try to start docker mongo");
    console.log("err:", err);
    console.log("=========================================");
  };
  const empresa = new Empresas({
    tipo_documento:1,
    documento:'881144223-5',
    razon_social:"Osos peludos",
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  empresa.save(function (err) {
    if (err) error(err);
  });

  const sede = new Sedes({
    nombre:'sede-sur',
    direccion:'carrera 4b # 9-32',
    ciudad_id:55,
    empresas_id:new mongoose.mongo.ObjectId(empresa._id),
    fecha_creacion: Date.now(),
   fecha_actualizacion: Date.now()
  });
  sede.save(function (err) {
    if (err) error(err);
  });

  const rol = new Roles({
    nombre: 'Admin',
    descripcion: 'el que lo menea bien',
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  rol.save(function (err) {
    if (err) error(err);
  });

  const persona = new Personas({
    tipo_documento:1,
    documento:'13131313',
    nombre:'elver',
    primer_apellido: 'galarga',
    segundo_apellido: 'jimenes',
    email:'elver@gmail.com',
    telefono:'8331111',
    tipo_persona_id: 1,
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  persona.save(function (err) {
    if (err) error(err);
  });
  
  const usuario = new Usuarios({
    username: 'admin',
    password: '12345678',
    fecha_ultimo_ingreso: Date.now(),
    rol_id: new mongoose.mongo.ObjectId(rol.id),
    persona_id:new mongoose.mongo.ObjectId(persona.id)
  });
  usuario.save(function (err) {
    if (err) error(err);
  });

  const usuarioSede = new UsuariosSedes({
    usuario_id:new mongoose.mongo.ObjectId(usuario.id),
    sede_id:new mongoose.mongo.ObjectId(sede.id)
  });
  usuarioSede.save(function (err) {
    if (err) error(err);
  });

  const estadoEquipos = new EstadosEquipo({
    nombre: 'Reparación',
    descripcion:'reparación del articulo',
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  estadoEquipos.save(function (err) {
    if (err) error(err);
  });

  const tipoEquipos = new TiposEquipos({
    nombre: 'Aleman',
    descripcion:'Equipo Aleman',
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  tipoEquipos.save(function (err) {
    if (err) error(err);
  });

  const equipo = new Equipos({
    nombre: 'Aleman VII universal ',
    estado_id:new mongoose.mongo.ObjectId(estadoEquipos.id),
    tipo_equipo_id:new mongoose.mongo.ObjectId(tipoEquipos.id),
    usuario_sede_id:new mongoose.mongo.ObjectId(usuarioSede.id),
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  });
  equipo.save(function (err) {
    if (err) error(err);
  });


function error(err){
  console.error('error', err);
  process.exit()
}

