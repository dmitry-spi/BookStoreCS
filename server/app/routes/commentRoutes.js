import { Router } from 'express';
import jwtAuth from './helpers/jwtAuth';

import * as CommentController from '../controllers/CommentController';

const router = Router();

router.get('/get/:bookId', jwtAuth(), CommentController.getComments);
router.get('/get/:bookId/:page', jwtAuth(), CommentController.getComments);
router.get('/get/:bookId/:page/:limit', jwtAuth(), CommentController.getComments);
router.post('/create', jwtAuth(), CommentController.create);

export default router;
