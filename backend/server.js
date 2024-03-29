import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

const PORT =  process.env.PORT || 5001;

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
NOT USING THIS AS THIS WOULD CREATE SEVERAL ROUTES, INSTEAD WE WILL USE MIDDLEWARE - routes

app.get('api/auth/signup' , (req, res) => {
    console.log('signup route');
});

app.get('api/auth/signup' , (req, res) => {
    console.log('login route');
});

app.get('api/auth/logout' , (req, res) => {
    console.log('logout route');
});
*/

