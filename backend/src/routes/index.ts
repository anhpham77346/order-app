import express from 'express';
import userRoutes from './userRoutes';
import itemRoutes from './itemRoutes';
import fileRoutes from './fileRoutes';
import tableRoutes from './tableRoutes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/item', itemRoutes);
routes.use('/file', fileRoutes);
routes.use('/table', tableRoutes);

export default routes;
