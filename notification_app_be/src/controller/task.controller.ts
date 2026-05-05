import { Request, Response, NextFunction } from 'express';
import { taskService } from '../service/task.service';
import { logger } from '../utils/logger';

export const taskController = {
    getTasks: async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('controller', 'received GET /tasks request');
            const tasks = await taskService.getTasks();
            res.status(200).json({ success: true, data: tasks });
        } catch (error) {
            next(error);
        }
    },
    createTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('controller', 'received POST /tasks request');
            const { title } = req.body;
            const task = await taskService.createTask(title);
            res.status(201).json({ success: true, data: task });
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id as string;
            logger.info('controller', `received DELETE /tasks/${id} request`);
            await taskService.deleteTask(id);
            res.status(200).json({ success: true, message: 'task deleted' });
        } catch (error) {
            next(error);
        }
    }
};
