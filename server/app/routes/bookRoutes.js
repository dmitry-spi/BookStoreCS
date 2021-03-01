import { Router } from 'express';
import jwtAuth from './helpers/jwtAuth';
import grantAccess from '../middleware/grantAccess';

import * as BookController from '../controllers/BookController';

const router = Router();

router.get('/', jwtAuth(), BookController.getBooks);
router.get('/p/:page', jwtAuth(), BookController.getBooks);
router.get('/p/:page/:limit', jwtAuth(), BookController.getBooks);
router.get('/get/:bookId', jwtAuth(), BookController.getBook);
router.post('/create', jwtAuth(), BookController.create);
router.post('/approve', jwtAuth(), grantAccess('update', 'book'), BookController.approveBook);

export default router;
