var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cabanasRouter = require('./routes/cabanas');
var pescaRouter = require('./routes/pesca');
var reservasRouter = require('./routes/reservas');
var turneroRouter = require('./routes/turnero');
var pagosRouter = require('./routes/pagos');
var contactoRouter = require('./routes/contacto');

var app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:4001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cabanas', cabanasRouter);
app.use('/pesca', pescaRouter);
app.use('/reservas', reservasRouter);
app.use('/turnero', turneroRouter);
app.use('/pagos', pagosRouter);
app.use('/contacto', contactoRouter);

module.exports = app;
