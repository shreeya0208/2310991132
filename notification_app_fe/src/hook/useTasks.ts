import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, deleteTask } from '../api/apiClient';
import { logger } from '../api/logger';
import type { Task } from '../component/TaskList';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            logger.info('hook', 'fetching tasks from api');
            const res = await getTasks();
            setTasks(res.data.data);
        } catch (error: any) {
            logger.error('hook', `error fetching tasks: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (title: string) => {
        try {
            logger.info('hook', 'creating task via api');
            const res = await createTask(title);
            setTasks(prev => [...prev, res.data.data]);
        } catch (error: any) {
            logger.error('hook', `error creating task: ${error.message}`);
            throw error;
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            logger.info('hook', `deleting task ${id} via api`);
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (error: any) {
            logger.error('hook', `error deleting task: ${error.message}`);
            throw error;
        }
    };

    return { tasks, loading, handleCreateTask, handleDeleteTask };
};
