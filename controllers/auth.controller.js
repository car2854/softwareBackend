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

const renewTokenEstudiante = async(req,res = response) => {

  const uid = req.uid;
  
  // Generar JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  try {
      const estudianteDB = await Estudiante.findById(uid);

      if (!estudianteDB){
        return res.status(404).json({
          ok: false,
          msg: "No existe ese estudiante"
        })
      }

      res.json({
        ok: true,
        token,
        estudianteDB: estudianteDB
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          'ok': false,
          'mensaje': 'Error, consulte con el administrador'
      });
  }
}

const renewTokenProfesor = async(req,res = response) => {

  const uid = req.uid;
  
  // Generar JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  try {
      const profesorDB = await Profesor.findById(uid);

      if (!profesorDB){
        return res.status(404).json({
          ok: false,
          msg: "No existe ese profesor"
        })
      }

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


const AWS = require('aws-sdk');
// mybucketpruebareco.s3.us-east-2.amazonaws.com/sheldon.jpg
const bucket = 'mybucketpruebareco' // the bucketname without s3://
const photo  = 'sheldon.jpg' // the name of file

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}) 

const client = new AWS.Rekognition();

const params = {
  Image: {
    S3Object: {
      Bucket: bucket,
      Name: photo
    },
  },
  MaxLabels: 10
}



const recoAwd = (req, res) => {

  client.detectLabels(params, function(err, response) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(`Detected labels for: ${photo}`)
      response.Labels.forEach(label => {
        console.log(`Label:      ${label.Name}`)
        console.log(`Confidence: ${label.Confidence}`)
        console.log("Instances:")
        label.Instances.forEach(instance => {
          let box = instance.BoundingBox
          console.log("  Bounding box:")
          console.log(`    Top:        ${box.Top}`)
          console.log(`    Left:       ${box.Left}`)
          console.log(`    Width:      ${box.Width}`)
          console.log(`    Height:     ${box.Height}`)
          console.log(`  Confidence: ${instance.Confidence}`)
        })
        console.log("Parents:")
        label.Parents.forEach(parent => {
          console.log(`  ${parent.Name}`)
        })
        console.log("------------")
        console.log("")
      }) // for response.labels
    } // if
  });

  res.json({
    ok: true,
    msg: "ok"
  })

}

module.exports = {
  loginProfesor,
  loginEstudiante,
  renewTokenEstudiante,
  renewTokenProfesor,
  recoAwd
}