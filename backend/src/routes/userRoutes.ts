import express from 'express';
import postUserLogin from '../controller/user/postUserLogin';
import postUserRegister from '../controller/user/postUserRegister';

const userRoutes = express.Router();

userRoutes.post('/login', postUserLogin);
userRoutes.post('/register', postUserRegister);

export default userRoutes;
