import express from 'express';
import postUserLogin from '../controller/user/postUserLogin';
import postUserRegister from '../controller/user/postUserRegister';
import getInfoUser from '../controller/user/getInfoUser';
import { login } from '../middleware/userMiddleware';

const userRoutes = express.Router();

userRoutes.post('/login', postUserLogin);
userRoutes.post('/register', postUserRegister);
userRoutes.get('/info', login, getInfoUser);

export default userRoutes;
