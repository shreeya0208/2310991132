import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export const getTasks = () => api.get('/tasks');
export const createTask = (title: string) => api.post('/tasks', { title });
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

export const getNotifications = (page: number, limit: number, type?: string) => {
    let url = `/notifications?page=${page}&limit=${limit}`;
    if (type && type !== 'all') {
        url += `&type=${type}`;
    }
    return api.get(url);
};

export const getPriorityNotifications = () => api.get('/notifications/priority');

export const markNotificationRead = (id: string) => api.put(`/notifications/${id}/read`);
