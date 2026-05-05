import { taskRepository, Task } from '../repository/task.repository';
import { logger } from '../utils/logger';

export const taskService = {
    getTasks: async () => {
        logger.info('service', 'processing get tasks request');
        return await taskRepository.getAll();
    },
    createTask: async (title: string) => {
        logger.info('service', 'processing create task request');
        if (!title || title.trim() === '') {
            logger.error('service', 'invalid input received: empty title');
            throw new Error('Task title cannot be empty');
        }
        const newTask: Task = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false
        };
        return await taskRepository.create(newTask);
    },
    deleteTask: async (id: string) => {
        logger.info('service', `processing delete task request for id: ${id}`);
        const success = await taskRepository.delete(id);
        if (!success) {
            logger.warn('service', `task ${id} not found for deletion`);
        }
        return success;
    }
};
