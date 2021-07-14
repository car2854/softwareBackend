const { Socket } = require('socket.io');
const { socketIO } = require('socket.io');


const fetch = require('node-fetch');


const imageToBase64 = require('image-to-base64');



const AWS = require('aws-sdk');
// mybucketpruebareco.s3.us-east-2.amazonaws.com/sheldon.jpg
const bucket = 'mybucketpruebareco' // the bucketname without s3://
const photo  = 'sheldon.jpg' // the name of file

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
}) 

const cliente = new AWS.Rekognition();

// const params = {
//   Image: {
//     S3Object: {
//       Bucket: bucket,
//       Name: photo
//     },
//   },
//   MaxLabels: 10
// }





const disconnect = (client = Socket) => {

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

}

const getVideo = (client = Socket) => {
  
  client.on('video', ( payload = {video, id, img1, img2, img3} ) => {

    const {video, id} = payload;

    const id1 = id + '1.' + type(img1);
    const id2 = id + '2.' + type(img2);
    const id3 = id + '3.' + type(img3);

    const params = {
      SourceImage: {
        Bytes: video
      },
      TargetImage: {
        S3Object: {
          Bucket: 'mybucketpruebareco',
          Name: id1
        },
      },
      SimilarityThreshold: 70
    }
    
    cliente.compareFaces(params,function(err, response) {

      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        response.FaceMatches.forEach(data => {
          
          let position   = data.Face.BoundingBox
          let similarity = data.Similarity
          // console.log(similarity);
          // client.emit('setVideo', similarity);
          // igual = similarity;
          // console.log(igual)
          // client.emit('setVideo', similarity);

          console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
        })
      } 
    });




    // console.log(igual);

    // const data = {
    //   igual
    // }

    // client.emit('setVideo', data);


  });

}

const type = (img) => {

  const cantidad = img.length;

  let nuevoTexto = "";

  for (let i = cantidad; i>0; i--){
    if (img[i] === '.'){
        i = 0;
    }else{
      if (img[i]){
          nuevoTexto = img[i] + nuevoTexto;
      }
    }
  }
  return nuevoTexto;
}


// const getBinary =(img1) => {

//   // console.log('hola');

//   return imageToBase64(img1) // Path to the image
//   .then(
//       (image) => {
          
//         const sourceImage = encodeURIComponent(image);
        
//         const imageBuffer = Buffer.from(decodeURIComponent(sourceImage), 'base64');
//         // console.log(imageBuffer);


          
//         return imageBuffer;
//       }
//   )
//   .catch(
//       (error) => {
//           console.log(error); // Logs an error if there was one
//       }
//   )
  
// }


module.exports = {
  disconnect,
  getVideo
}