// src/app.js La definición de la aplicación HTTP 
import express from 'express';
import usersRoutes from './modules/users/users.routes.js';


const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// users API
app.use('/users', usersRoutes);

export default app;
