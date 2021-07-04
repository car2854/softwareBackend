/*
  Path: 'api/auth'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateFields } = require('../middleware/validate-fileds');

const { validarJWT } = require('../middleware/validate-jwt');
const { loginProfesor, loginEstudiante, renewToken } = require('../controllers/auth.controller');


router.post('/login/profesor', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  loginProfesor
);

router.post('/login/estudiante',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('ci', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ], 
  loginEstudiante
);

router.get('/renew',validarJWT ,renewToken);


module.exports = router;
