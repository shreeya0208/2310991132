import React from 'react';
import { logger } from '../api/logger';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => Promise<void>;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
    const handleDelete = async (id: string) => {
        logger.info('component', `user clicked delete on task ${id}`);
        try {
            await onDelete(id);
        } catch (error: any) {
            logger.error('component', `failed to delete task ${id}: ${error.message}`);
        }
    };

    if (tasks.length === 0) {
        return <div className="empty-state">No tasks yet. Create one above!</div>;
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <li key={task.id} className="task-item">
                    <span className="task-title">{task.title}</span>
                    <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(task.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};
