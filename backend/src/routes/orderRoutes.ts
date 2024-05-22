import express from 'express';
import { login } from '../middleware/userMiddleware';
import orderItem from '../controller/order/orderItem';

const orderRoutes = express.Router();

orderRoutes.post('/order', login, orderItem);

export default orderRoutes;
