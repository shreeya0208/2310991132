import React, { useState } from 'react';
import { logger } from '../api/logger';

interface TaskFormProps {
    onSubmit: (title: string) => Promise<void>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            logger.warn('component', 'user attempted to submit empty task');
            return;
        }

        try {
            setLoading(true);
            logger.info('component', 'user submitted new task form');
            await onSubmit(title);
            setTitle('');
        } catch (error: any) {
            logger.error('component', `task submission failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                className="task-input"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
};
