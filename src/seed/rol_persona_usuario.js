const mongoose = require("mongoose");
const Roles = require('../models/roles.model');
const Usuarios = require('../models/usuarios.model');
const Personas = require('../models/personas.model');
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

  Roles.create({
    nombre: 'Admin',
    descripcion: 'el que lo menea bien',
    fecha_creacion: Date.now(),
    fecha_actualizacion: Date.now()
  }, (err, rol) => {
    if (err) {
      console.error('error', err)
    }else{
        Personas.create({
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
        }, (err, persona) => {
            if (err) {
              console.error('error', err)
            }else{
                Usuarios.create({
                    username: 'admin',
                    password: '12345678',
                    fecha_ultimo_ingreso: Date.now(),
                    rol_id: new mongoose.mongo.ObjectId(rol.id),
                    persona_id:new mongoose.mongo.ObjectId(persona.id)
                }, (err) => {
                    if (err) {
                        console.error('error', err)
                    }
                    process.exit()
                })   
            }
        })
    }
  })
