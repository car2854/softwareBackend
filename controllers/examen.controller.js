const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Examen = require('../models/examen.model');

const createExamen = async(req, res = response) => {

  const { descripcion, id } = req.body;

  try {

    const data = {
      descripcion,
      materia: id,
      profesor: req.uid
    }

    const examen = new Examen(data);

    await examen.save();
    
    res.json({
      ok: true,
      examen,
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
  createExamen
}