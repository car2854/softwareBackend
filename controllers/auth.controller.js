const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Estudiante = require('../models/estudiante.model');
const Profesor = require('../models/profesor.model');

const loginProfesor = async(req, res = response) => {

  const { email, password } = req.body;

  try {
    
    // Verificar Email
    const profesorDB = await Profesor.findOne({email});

    if (!profesorDB){
      return res.status(404).json({
        ok: false,
        msg: "Datos incorrectos"
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, profesorDB.password);

    if (!validPassword){
      return res.status(400).json({
        ok: false,
        msg: "Datos incorrectos"
      });
    }
    
    // Generar un JWT
    const token = await generarJWT( profesorDB.id );

    res.json({
      ok: true,
      profesorDB,
      token
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

const loginEstudiante = async(req, res = response) => {

  const { email, ci } = req.body;

  try {
    
    // Verificar Email
    const estudianteDB = await Estudiante.findOne({email});

    if (!estudianteDB){
      return res.status(404).json({
        ok: false,
        msg: "Datos incorrectos"
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(ci, estudianteDB.ci);

    if (!validPassword){
      return res.status(400).json({
        ok: false,
        msg: "Datos incorrectos"
      });
    }
    
    // Generar un JWT
    const token = await generarJWT( estudianteDB.id );

    res.json({
      ok: true,
      estudianteDB,
      token
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

const renewToken = async(req,res = response) => {

  const uid = req.uid;
  
  // Generar JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  try {
      const profesorDB = await Profesor.findById(uid);
      res.json({
          ok: true,
          token,
          profesorDB: profesorDB
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          'ok': false,
          'mensaje': 'Error, consulte con el administrador'
      });
  }
}

module.exports = {
  loginProfesor,
  loginEstudiante,
  renewToken
}