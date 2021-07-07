const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const Profesor = require('../models/profesor.model');

const createProfesor = async(req, res = response) => {

  const { nombre ,email, password } = req.body;

  try {
    
    // Verificar Email
    const profesorDB = await Profesor.findOne({email});

    if (profesorDB){
      return res.status(402).json({
        ok: false,
        msg: "Ya existe ese usuario"
      });
    }

    const profesor = new Profesor(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    profesor.password = bcrypt.hashSync(password, salt);

    await profesor.save();

    // generar token
    const token = await generarJWT(profesor.id);

    res.json({
      ok: true,
      profesor,
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

const getProfesores = async(req, res = response) => {

  const profesor = req.uid;

  try {


    const profesores = await Profesor.find();
    
    res.json({
      ok: true,
      profesores,
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


}

const getProfesor = async(req, res = response) => {

  const profesor = req.uid;
  const _id = req.params.id;

  try {


    const profesor = await Profesor.findById({_id});
    
    if(!profesor){
      return res.status(404).json({
        ok: false,
        msg: "No existe ese profesor"
      });
    }

    res.json({
      ok: true,
      profesor,
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
  createProfesor,
  getProfesores,
  getProfesor
}