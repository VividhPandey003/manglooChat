// Importing necessary modules and files
import express from 'express';          // Importing Express
import dotenv from 'dotenv';             // Importing dotenv for environment variables
import authRoutes from './routes/auth.routes.js';     // Importing authentication routes
import connectToMongoDB from './db/connectToMongoDB.js'; // Importing function to connect to MongoDB

// Setting up the port for the server
const PORT = process.env.PORT || 5001;

// Creating an instance of Express
const app = express();

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Adding middleware to parse JSON requests
app.use(express.json());    // This will parse JSON requests from req.body

// Adding authentication routes under the '/api/auth' path
app.use('/api/auth', authRoutes);

// Starting the server and connecting to MongoDB
app.listen(PORT, () => {
    connectToMongoDB();   // Calling function to connect to MongoDB
    console.log(`Server running on port ${PORT}`)
});


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

