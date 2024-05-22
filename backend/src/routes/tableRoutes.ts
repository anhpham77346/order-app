import express from 'express';
import getAllTable from '../controller/table/getAllTable';
import { isAdminRole, login } from '../middleware/userMiddleware';
import openTable from '../controller/table/openTable';
import closeTable from '../controller/table/closeTable';
import joinTable from '../controller/table/joinTable';

const tableRoutes = express.Router();

tableRoutes.get('/all', login, getAllTable);
tableRoutes.post('/open', isAdminRole, openTable);
tableRoutes.post('/close', isAdminRole, closeTable);
tableRoutes.post('/join', login, joinTable);

export default tableRoutes;
