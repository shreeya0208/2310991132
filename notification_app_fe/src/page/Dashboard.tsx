import React from 'react';
import { TaskForm } from '../component/TaskForm';
import { TaskList } from '../component/TaskList';
import { useTasks } from '../hook/useTasks';

export const Dashboard: React.FC = () => {
    const { tasks, loading, handleCreateTask, handleDeleteTask } = useTasks();

    return (
        <div className="dashboard-container">
            <div className="glass-panel">
                <header className="header">
                    <h1>Task Dashboard</h1>
                    <p>Manage your notifications and tasks smoothly.</p>
                </header>

                <TaskForm onSubmit={handleCreateTask} />
                
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>Loading tasks...</div>
                ) : (
                    <TaskList tasks={tasks} onDelete={handleDeleteTask} />
                )}
            </div>
        </div>
    );
};
