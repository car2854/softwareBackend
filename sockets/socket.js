const { Socket } = require('socket.io');
const { socketIO } = require('socket.io');


const fetch = require('node-fetch');




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

const getVideo = (client = Socket, faceapi) => {
  
  client.on('video', async( payload = {video, img1, img2, img3} ) => {

    const {video, img1, img2, img3} = payload;


    
    // const sourceImage = encodeURIComponent(video);

    // const imageBuffer = Buffer.from(decodeURIComponent(sourceImage), 'base64');

    // console.log(video);
    


    // const getData = getBinary(video);
    // console.log(getData);

    // console.log(video);  

    const params = {
      Image: {
        Bytes: video
      },
      MaxLabels: 10
    }

    cliente.detectLabels(params, function(err, response) {
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



    // client.emit('setVideo', video);


  });

}

function getBinary(base64Image) {

  var binaryImg = Buffer.from(base64Image, 'base64').toString();
  var length = binaryImg.length;
  var ab = new ArrayBuffer(length);
  var ua = new Uint8Array(ab);
  for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
  }

  return ab;
}


module.exports = {
  disconnect,
  getVideo
}