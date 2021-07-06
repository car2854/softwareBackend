const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Materia = require('../models/materias.model');
const Inscripciones = require('../models/inscripciones.model');
const Examen = require('../models/examen.model');

const createMateria = async(req, res = response) => {

  const { nombre, descripcion } = req.body;

  try {

    const data = {
      nombre,
      descripcion,
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



const getMaterias = async(req, res = response) => {

  const profesor = req.uid;

  try {


    const materias = await Materia.find({profesor});
    
    res.json({
      ok: true,
      materias,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}



const getEstudiantesMateria = async(req, res = response) => {

  const profesor = req.uid;
  const materia = req.params.materia;

  try {


    const listaEstudiantes = await Inscripciones.find({materia}).populate('estudiante');

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


const getExamenes = async(req, res = response) => {

  const profesor = req.uid;
  const materia = req.params.materia;

  try {


    const listaExamenes = await Examen.find({materia});

    res.json({
      ok: true,
      listaExamenes,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

const getMateria = async(req, res = response) => {

  const profesor = req.uid;
  const _id = req.params.id;

  try {


    const materiaDB = await Materia.findById({_id});

    res.json({
      ok: true,
      materiaDB,
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
  createMateria,
  getMaterias,
  getEstudiantesMateria,
  getExamenes,
  getMateria
}