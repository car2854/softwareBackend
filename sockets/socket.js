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

const getVideo = async(client = Socket) => {
  
  client.on('video', async( payload = {video, img1, img2, img3} ) => {

    const {video, img1, img2, img3} = payload;

    // console.log(video);

    const data1 = await getBinary(img1);
    const data2 = await getBinary(img2);
    const data3 = await getBinary(img3);


    const params = {
      SourceImage: {
        Bytes: video
      },
      TargetImage: {
        Bytes: data1
      },
      SimilarityThreshold: 70
    }

    let igual = 0;

    cliente.compareFaces(params,function(err, response) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        response.FaceMatches.forEach(data => {
          
          let position   = data.Face.BoundingBox
          let similarity = data.Similarity
          igual = similarity;
          console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
        }) // for response.faceDetails
      } // if
    });

    client.emit('setVideo', igual);


  });

}

const getBinary =(img1) => {

  return imageToBase64(img1) // Path to the image
  .then(
      (image) => {
          
        const sourceImage = encodeURIComponent(image);
        
        const imageBuffer = Buffer.from(decodeURIComponent(sourceImage), 'base64');
        // console.log(imageBuffer);


          
        return imageBuffer;
      }
  )
  .catch(
      (error) => {
          console.log(error); // Logs an error if there was one
      }
  )
  
}


module.exports = {
  disconnect,
  getVideo
}