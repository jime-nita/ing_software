const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

connectDB();

const app = express(); 
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/resenas', require('./routes/resenasRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));

app.use('/api/productos', require('./routes/productosRoutes')); 
app.use('/api/publicaciones', require('./routes/publicacionRoutes')); 

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port} <3`))