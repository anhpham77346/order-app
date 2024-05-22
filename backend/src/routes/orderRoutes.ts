import express from 'express';
import { login } from '../middleware/userMiddleware';
import orderItem from '../controller/order/orderItem';
import getOrder from '../controller/order/getOrder';

const orderRoutes = express.Router();

orderRoutes.post('/order', login, orderItem);
orderRoutes.get('/', login, getOrder);

export default orderRoutes;
