import { notificationRepository, Notification } from '../repository/notification.repository';
import { logger } from '../utils/logger';

const getPriorityWeight = (type: string): number => {
    switch(type) {
        case 'placement': return 3;
        case 'result': return 2;
        case 'event': return 1;
        default: return 0;
    }
};

export const notificationService = {
    getNotifications: async (page: number, limit: number, type?: string) => {
        logger.info('service', 'processing get notifications request');
        let all = await notificationRepository.getAll();
        
        if (type) {
            all = all.filter(n => n.type === type);
        }
        
        // Sorting by recency
        all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginated = all.slice(startIndex, endIndex);
        
        return {
            data: paginated,
            total: all.length,
            page,
            limit
        };
    },
    
    getPriorityNotifications: async (topN: number = 10) => {
        logger.info('service', 'processing get priority notifications request');
        const all = await notificationRepository.getAll();
        const unread = all.filter(n => !n.isRead);

        unread.sort((a, b) => {
            const weightA = getPriorityWeight(a.type);
            const weightB = getPriorityWeight(b.type);
            
            if (weightA !== weightB) {
                return weightB - weightA;
            }
            
            return b.createdAt.getTime() - a.createdAt.getTime();
        });

        return unread.slice(0, topN);
    },

    markAsRead: async (id: string) => {
        logger.info('service', `processing mark as read for notification ${id}`);
        const updated = await notificationRepository.updateReadStatus(id, true);
        if (!updated) {
            logger.error('service', `notification not found for id ${id}`);
            throw new Error("Notification not found");
        }
        return updated;
    }
};
