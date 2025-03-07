import { Router } from 'express';
import { boardController } from '../controllers/board.controller.js';

const router = Router();
router.get('/:board', boardController.showBoard);
router.get('/:board/thread/:id', boardController.showThread);

export default router;