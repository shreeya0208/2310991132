import { Request, Response, NextFunction } from 'express';
import { notificationService } from '../service/notification.service';
import { logger } from '../utils/logger';

export const notificationController = {
    getNotifications: async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('controller', 'received GET /notifications request');
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const type = req.query.type as string;
            
            const result = await notificationService.getNotifications(page, limit, type);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    getPriorityNotifications: async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('controller', 'received GET /notifications/priority request');
            const notifications = await notificationService.getPriorityNotifications();
            res.status(200).json({ data: notifications });
        } catch (error) {
            next(error);
        }
    },
    markAsRead: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            logger.info('controller', `received PUT /notifications/${id}/read request`);
            const updated = await notificationService.markAsRead(id);
            res.status(200).json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    }
};
