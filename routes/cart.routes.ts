import express from 'express';
import * as cartController from '../controllers/cart.controller';

const router = express.Router();

router.get('/', cartController.getCart);
router.put('/', cartController.updateCart);
router.delete('/', cartController.emptyCart);
router.post('/checkout', cartController.checkout);

export default router;