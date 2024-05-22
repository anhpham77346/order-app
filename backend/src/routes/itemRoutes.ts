import express from 'express';
import { isAdminRole } from '../middleware/userMiddleware';
import postCreateItem from '../controller/item/postCreateItem';
import getAllItem from '../controller/item/getAllItem';

const itemRoutes = express.Router();

itemRoutes.post('/create', isAdminRole, postCreateItem);
itemRoutes.get('/all', isAdminRole, getAllItem);

export default itemRoutes;
