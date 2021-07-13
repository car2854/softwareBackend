const { io } = require('../index');


const { 
  disconnect,
  getVideo
} = require('./socket');

io.on('connection', client => {
  console.log('Cliente conectado');

  // console.log(MODEL_URL);

  // loadModels();

  disconnect(client);

  getVideo(client);
});