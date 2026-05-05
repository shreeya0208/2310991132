import { useState, useCallback } from 'react';
import { getNotifications, getPriorityNotifications, markNotificationRead } from '../api/apiClient';
import { logger } from '../api/logger';

export interface Notification {
    id: string;
    userId: string;
    type: "event" | "result" | "placement";
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const fetchNotifications = useCallback(async (page: number, limit: number, type?: string) => {
        try {
            setLoading(true);
            logger.info('hook', `fetching notifications page ${page}`);
            const res = await getNotifications(page, limit, type);
            setNotifications(res.data.data);
            setTotal(res.data.total);
        } catch (error: any) {
            logger.error('hook', `error fetching notifications: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPriorityNotifications = useCallback(async () => {
        try {
            setLoading(true);
            logger.info('hook', 'fetching priority notifications');
            const res = await getPriorityNotifications();
            setNotifications(res.data.data);
            setTotal(res.data.data.length);
        } catch (error: any) {
            logger.error('hook', `error fetching priority notifications: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsRead = async (id: string) => {
        try {
            logger.info('hook', `marking notification ${id} as read`);
            await markNotificationRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        } catch (error: any) {
            logger.error('hook', `error marking notification as read: ${error.message}`);
        }
    };

    return { notifications, total, loading, fetchNotifications, fetchPriorityNotifications, markAsRead };
};
