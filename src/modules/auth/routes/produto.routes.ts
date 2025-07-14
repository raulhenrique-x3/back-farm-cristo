import {Router} from 'express';
import ProdutoController from '../controller/ProdutoController';

const router = Router();
const produtoController = new ProdutoController();

router.post('/',  produtoController.create);
router.get('/',  produtoController.getAll);
router.get('/:id',  produtoController.getById);
router.put('/:id',  produtoController.update);
router.delete('/:id',  produtoController.delete);
router.post('/register-products', produtoController.registerManyProducts)
router.put('/edit-products', produtoController.updateManyProducts)

export  {router as productRoutes};
