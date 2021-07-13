/*
  Path: 'api/upload'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fileds');
const { validarArchivoSubir } = require('../middleware/validar-archivo');

const router = Router();

// const expressFileUpload = require('express-fileupload');
const fileUpload = require('express-fileupload');

const { validarJWT } = require('../middleware/validate-jwt');
const { actualizarImagen, subirImagenTemporal } = require('../controllers/uploads.controller');

router.use( fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  createParentPath: true
}) );

router.post('/', [
    validarArchivoSubir,
    validarJWT,
    check('id', 'La id obligatorio').isMongoId(),
    validateFields
  ],
  actualizarImagen
);

router.post('/imgTemp', [
    validarArchivoSubir,
    validateFields
  ],
  subirImagenTemporal
);

module.exports = router;
