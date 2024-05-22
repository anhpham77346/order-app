import express from 'express';
import userRoutes from './userRoutes';
import itemRoutes from './itemRoutes';
import fileRoutes from './fileRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/item', itemRoutes);
routes.use('/file', fileRoutes);

export default routes;
