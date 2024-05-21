import express from 'express';
import { isAdminRole } from '../middleware/userMiddleware';
import postCreateItem from '../controller/item/postCreateItem';

const itemRoutes = express.Router();

itemRoutes.post('/create', isAdminRole, postCreateItem);

export default itemRoutes;
