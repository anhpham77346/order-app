import express from 'express';
import userRoutes from './userRoutes';
import itemRoutes from './itemRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/item', itemRoutes);

export default routes;
