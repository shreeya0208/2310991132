import { Router } from 'express';
import { notificationController } from '../controller/notification.controller';

const router = Router();

router.get('/priority', notificationController.getPriorityNotifications);
router.get('/', notificationController.getNotifications);
router.put('/:id/read', notificationController.markAsRead);

export default router;
