

import morgan from 'morgan';
import express from 'express';
import authRoute from './routers/authrouters';
// import { connect } from 'http2'; 
import conectDBMongo from './config/db';
import productRoutes from './routers/authrouters';

// Inicializar el servidor de express 
const app = express();

// Asignar el número de puerto
const PORT = 3000;

app.use(express.json()); // .Todo lo que reciba es de tipo JSON
app.use(morgan('dev'));  // Mostrar logs de las peticiones

app.use('/api/vi/auth', authRoute); // ruta principal
app.use('/api', productRoutes);

conectDBMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`El servidor funciona con el puerto: ${PORT}`);
        console.log("El servidor está funcionando:", PORT);
    });
});
