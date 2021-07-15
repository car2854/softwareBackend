const path  = require('path');
const fs    = require('fs');

const S3 = require('aws-sdk/clients/s3');

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const storage = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const Estudiante = require ('../models/estudiante.model');

const actualizarImagen = async(req, res = response) => {
  
  const _id = req.body.id;

  try {
    
    const estudianteDB = await Estudiante.findById({_id});
    if (!estudianteDB){
      return res.status(404).json({
        ok: false,
        msg: "No existe ese estudiante"
      });
    }
    

    const stream1 = fs.createReadStream(req.files.imagen1.tempFilePath);
    const stream2 = fs.createReadStream(req.files.imagen2.tempFilePath);
    const stream3 = fs.createReadStream(req.files.imagen3.tempFilePath);
    const type1 = getFileExtension2(req.files.imagen1.name);
    const type2 = getFileExtension2(req.files.imagen2.name);
    const type3 = getFileExtension2(req.files.imagen3.name);

    const params1 = {
      Bucket:'mybucketpruebareco',
      Key:_id + '1.' + type1,
      Body:stream1
    }

    const params2 = {
      Bucket:'mybucketpruebareco',
      Key:_id + '2.' + type2,
      Body:stream2
    }
    
    const params3 = {
      Bucket:'mybucketpruebareco',
      Key:_id + '3.' + type3,
      Body:stream3
    }




    const tempFilePath1 = req.files.imagen1.tempFilePath;
    const tempFilePath2 = req.files.imagen2.tempFilePath;
    const tempFilePath3 = req.files.imagen3.tempFilePath;

    const [resp1, resp2, resp3, data1, data2, data3 ] = await Promise.all([
      cloudinary.uploader.upload(tempFilePath1),
      cloudinary.uploader.upload(tempFilePath2),
      cloudinary.uploader.upload(tempFilePath3),

      storage.upload(params1).promise(),
      storage.upload(params2).promise(),
      storage.upload(params3).promise()
    ]);

    estudianteDB.foto1 = resp1.secure_url;
    estudianteDB.foto2 = resp2.secure_url;
    estudianteDB.foto3 = resp3.secure_url;
    
    estudianteDB.bucket1 = data1.Key;
    estudianteDB.bucket2 = data2.Key;
    estudianteDB.bucket3 = data3.Key;

    estudianteDB.save();

    console.log(estudianteDB);

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



const subirImagenTemporal = async(req, res = response) => {
  
  try {
        
    const {tempFilePath} = req.files.imagen;
    
    const resp1 = await cloudinary.uploader.upload(tempFilePath);
    
    res.json({
      ok: true,
      resp1
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });
  }


}


function getFileExtension2(filename) {
  return filename.split('.').pop();
}

module.exports = {
  actualizarImagen,
  subirImagenTemporal
}