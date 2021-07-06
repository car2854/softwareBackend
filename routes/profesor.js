/*
  Path: 'api/profesor'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middleware/validate-fileds');

const router = Router();

const { validarJWT } = require('../middleware/validate-jwt');
const { createProfesor, getProfesores } = require('../controllers/profesor.controller');


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
  ],
  createProfesor
);

router.ger('/', getProfesores);


module.exports = router;
