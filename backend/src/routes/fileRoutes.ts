import express from 'express';
import getFile from '../controller/file/getFile';

const fileRoutes = express.Router();

fileRoutes.get('/', getFile);

export default fileRoutes;
