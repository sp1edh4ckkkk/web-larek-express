import { Router } from 'express';
import { celebrate } from 'celebrate';
import { postOrder } from '../controllers/orders';
import orderSchemaJoi from '../models/order-joi';

const router = Router();

router.post('/', celebrate({ body: orderSchemaJoi }), postOrder);

export default router;
