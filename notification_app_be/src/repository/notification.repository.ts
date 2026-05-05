import { logger } from '../utils/logger';

export interface Notification {
    id: string;
    userId: string;
    type: "event" | "result" | "placement";
    message: string;
    isRead: boolean;
    createdAt: Date;
}

let notifications: Notification[] = [];

const seedData = () => {
    const types: ("event" | "result" | "placement")[] = ["event", "result", "placement"];
    for(let i=1; i<=25; i++) {
        notifications.push({
            id: `notif-${i}`,
            userId: 'user-1',
            type: types[i % 3],
            message: `Mock notification message ${i}`,
            isRead: i % 4 === 0,
            createdAt: new Date(Date.now() - i * 3600000)
        });
    }
};
seedData();

export const notificationRepository = {
    getAll: async (): Promise<Notification[]> => {
        logger.info('repository', 'fetching all notifications from db');
        return notifications;
    },
    updateReadStatus: async (id: string, isRead: boolean): Promise<Notification | null> => {
        logger.info('repository', `updating read status for notification ${id}`);
        const notif = notifications.find(n => n.id === id);
        if (notif) {
            notif.isRead = isRead;
            return notif;
        }
        return null;
    }
};
