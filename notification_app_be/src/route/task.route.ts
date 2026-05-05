import { Router } from 'express';
import { taskController } from '../controller/task.controller';

const router = Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);

export default router;
