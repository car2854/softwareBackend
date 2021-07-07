const path  = require('path');
const fs    = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const Estudiante = require ('../models/estudiante.model');

const actualizarImagen = async(req, res = response) => {
  
  const _id = req.body.id;

  let modelo;

  try {
    
    const estudianteDB = await Estudiante.findById({_id});
    if (!estudianteDB){
      return res.status(404).json({
        ok: false,
        msg: "No existe ese estudiante"
      });
    }
    
    const tempFilePath1 = req.files.imagen1.tempFilePath;
    const tempFilePath2 = req.files.imagen2.tempFilePath;
    const tempFilePath3 = req.files.imagen3.tempFilePath;

    const [resp1, resp2, resp3 ] = await Promise.all([
      cloudinary.uploader.upload(tempFilePath1),
      cloudinary.uploader.upload(tempFilePath2),
      cloudinary.uploader.upload(tempFilePath3),
    ]);

    estudianteDB.foto1 = resp1.secure_url;
    estudianteDB.foto2 = resp2.secure_url;
    estudianteDB.foto3 = resp3.secure_url;

    estudianteDB.save();

    res.json({
      ok: true,
      estudianteDB
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
  actualizarImagen
}