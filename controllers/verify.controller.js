const { response } = require('express');


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

const verify = async(req, res = response) => {

  const {video, img1, img2, img3} = req.params;

  try {

    const data1 = await getBinary(img1);

    const params = {
      SourceImage: {
        Bytes: video
      },
      TargetImage: {
        Bytes: data1
      },
      SimilarityThreshold: 70
    }
  
    // let igual = 0;
  
    cliente.compareFaces(params,function(err, response) {

      let index = 0;

      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        response.FaceMatches.forEach(data => {
          
          console.log(index);
          index++;

          let position   = data.Face.BoundingBox
          let similarity = data.Similarity
          console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
        })
      } 
    });




    res.json({
      ok: true,
      msg: "ok",
    });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Consulte con el administrador"
    });

  }


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
  verify
}