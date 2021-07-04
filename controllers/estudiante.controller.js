const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Estudiante = require('../models/estudiante.model');
const Inscripciones = require('../models/inscripciones.model');

const createEstudiante = async(req, res = response) => {

  const { nombre ,email, ci } = req.body;

  try {
    
    // Verificar Email
    const estudianteDB = await Estudiante.findOne({email});

    if (estudianteDB){
      return res.status(402).json({
        ok: false,
        msg: "Ya existe ese usuario"
      });
    }

    const estudiante = new Estudiante(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    estudiante.ci = bcrypt.hashSync(ci, salt);

    await estudiante.save();

    res.json({
      ok: true,
      estudiante,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}


const inscripcionEstudiante = async(req, res = response) => {

  const { estudiante ,materia } = req.body;

  try {
    

    const inscripciones = new Inscripciones(req.body);

    await inscripciones.save();

    res.json({
      ok: true,
      inscripciones,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

module.exports = {
  createEstudiante,
  inscripcionEstudiante
}