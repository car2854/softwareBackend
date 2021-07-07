/*
  Path: 'api/examen'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fileds');

const router = Router();

const { validarJWT } = require('../middleware/validate-jwt');
const { createExamen, getListaEstudiantes, getExamenes, getExamen } = require('../controllers/examen.controller');


router.post('/', [
    validarJWT,
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    check('id', 'El id de la materia es obligatorio').isMongoId(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validateFields
  ],
  createExamen
);

router.get('/estudiantes/:examen', validarJWT, getListaEstudiantes);

router.get('/', validarJWT, getExamenes);

router.get('/:id', validarJWT, getExamen);

module.exports = router;
