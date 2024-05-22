import express from 'express';
import getAllTable from '../controller/table/getAllTable';
import { isAdminRole, login } from '../middleware/userMiddleware';
import openTable from '../controller/table/openTable';
import closeTable from '../controller/table/closeTable';

const tableRoutes = express.Router();

tableRoutes.get('/all', login, getAllTable);
tableRoutes.post('/open', isAdminRole, openTable);
tableRoutes.post('/close', isAdminRole, closeTable);

export default tableRoutes;
