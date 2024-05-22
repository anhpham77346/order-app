import express from 'express';
import { isAdminRole } from '../middleware/userMiddleware';
import postCreateItem from '../controller/item/postCreateItem';
import getAllItem from '../controller/item/getAllItem';
import deleteItem from '../controller/item/deleteItem';

const itemRoutes = express.Router();

itemRoutes.post('/create', isAdminRole, postCreateItem);
itemRoutes.get('/all', getAllItem);
itemRoutes.post('/delete', isAdminRole, deleteItem);

export default itemRoutes;
