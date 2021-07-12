const { io } = require('../index');

const path = require('path');

const faceapi = require('face-api.js');

const MODEL_URL = `${__dirname}/../model`;


// const fetch = require('node-fetch');

// faceapi.env.monkeyPatch({ fetch: fetch });

// const MODELS_URL = path.join(__dirname, '../models');
// // Prueba de face-api.js

// modelosForLoad = [
//   faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('./models'),
// ];

// const loadModels = () => {
//   Promise.all(this.modelosForLoad).then((resp) => {
//     console.log('Modelos cargados');
//     this.cbModels.emit(true);
//   })
// }

const { 
  disconnect,
  getVideo
} = require('./socket');

io.on('connection', client => {
  console.log('Cliente conectado');

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromDisk(MODEL_URL),
  ]).catch((err) => {
    console.log(err);
  });

  

  // console.log(MODEL_URL);

  // loadModels();

  disconnect(client);

  getVideo(client, faceapi);
});