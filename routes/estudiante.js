/*
  Path: 'api/auth'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');

const { createEstudiante } = require('../controllers/estudiante.controller');


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ci', 'La ci es obligatorio').not().isEmpty(),
    check('foto1', 'La foto1 es obligatorio').not().isEmpty(),
    check('foto2', 'La foto2 es obligatorio').not().isEmpty(),
    check('foto3', 'La foto3 es obligatorio').not().isEmpty(),
    validateFields
  ],
  createEstudiante
);


module.exports = router;
