const Router = require("express");
const api = new Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:path.join(__dirname, '../../uploads'),
    filename:(req, file, cb) =>{
    	cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const fileUpload = multer({storage:storage}).single('file');


api.post("/upload", fileUpload, (req, res)=>{
    res.send({ data: req.file})
});

module.exports = api;