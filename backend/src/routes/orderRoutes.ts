import express from 'express';
import { login } from '../middleware/userMiddleware';
import orderItem from '../controller/order/orderItem';
import getOrder from '../controller/order/getOrder';
import getOrderById from '../controller/order/getOrderById';

const orderRoutes = express.Router();

orderRoutes.post('/order', login, orderItem);
orderRoutes.get('/', login, getOrder);
orderRoutes.get('/by-id', login, getOrderById);

export default orderRoutes;
