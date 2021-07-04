const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Materia = require('../models/materias.model');

const createMateria = async(req, res = response) => {

  const { nombre } = req.body;

  try {

    const data = {
      nombre,
      profesor: req.uid
    }

    const materia = new Materia(data);

    await materia.save();
    
    res.json({
      ok: true,
      materia,
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
  createMateria
}