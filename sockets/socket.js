const { Socket } = require('socket.io');
const { socketIO } = require('socket.io');


const fetch = require('node-fetch');

const disconnect = (client = Socket) => {

  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

}

const getVideo = (client = Socket, faceapi) => {
  
  client.on('video', async( payload = {video, img1, img2, img3} ) => {

    const {video, img1, img2, img3} = payload;

    // const labeledFaceDescriptors = await loadLabeledImages(img1, img2, img3, faceapi);

    // const faceMatcher = new globalFace.FaceMatcher(labeledFaceDescriptors, 0.6);

    // console.log(img1);

    // const referenceImage = await video.default.loadImage(REFERENCE_IMAGE);

    // const detections = await faceapi.detectAllFaces(referenceImage, 
    //   new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

    //   // console.log(detections);

    // client.emit('setVideo', detections);

    // const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor))

    console.log(video);
  });

}

const loadLabeledImages = (img1, img2, img3, faceapi) => {

  const labels = [img1, img2, img3];
  
  return Promise.all(
    
    labels.map(async resp => {
      
      try {
        const descriptions = []
        console.log(resp);
        const MODEL_URL = `https://res.cloudinary.com/dpzaj1apd/image/upload/v1625772021/kihdqrlsljdyvjcnh2n7.jpg`;
        
        const img = await faceapi.fetchImage(resp);
      
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        
        if (detections){
          descriptions.push(detections.descriptor)
        }
      
        return new faceapi.LabeledFaceDescriptors(resp, descriptions)
      } catch (error) {
        console.log(error);
      }
      
    })

  )

}


module.exports = {
  disconnect,
  getVideo
}