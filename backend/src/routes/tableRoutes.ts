import express from 'express';
import getAllTable from '../controller/table/getAllTable';
import { isAdminRole, login } from '../middleware/userMiddleware';
import openTable from '../controller/table/openTable';
import closeTable from '../controller/table/closeTable';
import joinTable from '../controller/table/joinTable';
import postCreateTable from '../controller/table/postCreateTable';
import deleteTable from '../controller/table/deleteTable';

const tableRoutes = express.Router();

tableRoutes.get('/all', login, getAllTable);
tableRoutes.post('/open', isAdminRole, openTable);
tableRoutes.post('/close', isAdminRole, closeTable);
tableRoutes.post('/join', login, joinTable);
tableRoutes.post('/create', isAdminRole, postCreateTable);
tableRoutes.post('/delete', isAdminRole, deleteTable);

export default tableRoutes;
