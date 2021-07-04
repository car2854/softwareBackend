require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor
const app = express();

// Configurar CORS
app.use(cors());

// Lecutra y parseo del body
app.use( express.json() )

// Base de datos
dbConnection();

// Directorio publico
app.use(express.static('public'));

// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/profesor', require('./routes/profesor') );
app.use( '/api/estudiante', require('./routes/estudiante') );
app.use( '/api/materia', require('./routes/materia') );
app.use( '/api/examen', require('./routes/examen') );

app.get('*', (req, res) => {
  res.sendFile( path.resolve(__dirname, 'public/index.html') );
});

app.listen( process.env.PORT, () => {
  	console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});