const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Examen = require('../models/examen.model');
const Ingreso = require('../models/ingreso.model');

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




const getListaEstudiantes = async(req, res = response) => {

  const profesor = req.uid;
  const examen = req.params.examen;

  try {


    const listaEstudiantes = await Ingreso.find({examen}).populate('estudiante');

    res.json({
      ok: true,
      listaEstudiantes,
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
  createExamen,
  getListaEstudiantes
}