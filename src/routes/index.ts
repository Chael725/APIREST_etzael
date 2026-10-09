import { Router } from 'express';
import productsRoutes from '../routes/products.routes.js';

const router: any = Router();

router.use('/products', productsRoutes);

export default router;