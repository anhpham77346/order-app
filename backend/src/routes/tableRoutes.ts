import express from 'express';
import getAllTable from '../controller/table/getAllTable';
import { login } from '../middleware/userMiddleware';

const tableRoutes = express.Router();

tableRoutes.get('/all', login, getAllTable);

export default tableRoutes;
