import express from 'express';
import postUserLogin from '../controller/user/postUserLogin';

const userRoutes = express.Router();

userRoutes.post('/', postUserLogin);
// router.get('/:id', userController.getUserById);

export default userRoutes;
