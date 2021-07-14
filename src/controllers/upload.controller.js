const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uplos')
    },

    filename: function (req, file, cb) {
        console.log('dfdf', file);
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

exports.upload = upload.single('file')

exports.uploadFile = (req, res) => {
    res.send({ data: req.file})
}