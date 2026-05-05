import { logger } from '../utils/logger';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

let tasks: Task[] = [];

export const taskRepository = {
    getAll: async (): Promise<Task[]> => {
        logger.info('repository', 'fetching all tasks from database');
        return tasks;
    },
    create: async (task: Task): Promise<Task> => {
        logger.info('repository', 'inserting new task into database');
        tasks.push(task);
        return task;
    },
    delete: async (id: string): Promise<boolean> => {
        logger.info('repository', `deleting task ${id} from database`);
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);
        return tasks.length < initialLength;
    }
};
