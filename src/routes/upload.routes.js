const Router = require("express");
const api = new Router();
const multer = require('multer');
const path = require('path');

/***
 * constante storage isntancia el paquete multer con sus respectiva configuracion para almacenar archivos
 */
const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../uploads'),
    filename:(req, file, cb) =>{
    	cb(null, `${Date.now()}-${file.originalname}`)
    }
})

/***
 * se encapsula toda la configuracion de multer en la variable fileupload
 */
const fileUpload = multer({storage:storage}).single('file');


/**
 * 
 * @param {file} req 
 * @param {file} res 
 * @returns 
 * 
 * funcion para almacenar archivo almacenado en el req.file
 * retorna el mismo archivo con la ruta y el nombre asignado al archivo file
 */
api.post("/upload", fileUpload, (req, res)=>{
    res.send({ data: req.file})
});

module.exports = api;