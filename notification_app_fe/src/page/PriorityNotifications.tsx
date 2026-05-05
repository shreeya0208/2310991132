import { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Chip } from '@mui/material';
import { useNotifications } from '../hook/useNotifications';
import { logger } from '../api/logger';

export const PriorityNotifications = () => {
    const { notifications, loading, fetchPriorityNotifications, markAsRead } = useNotifications();

    useEffect(() => {
        logger.info('page', 'priority notifications page loaded');
        fetchPriorityNotifications();
    }, [fetchPriorityNotifications]);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom color="error.main">Priority Notifications</Typography>
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
                Top unread notifications sorted by importance and recency.
            </Typography>
            
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDir: 'column', gap: 2, flexDirection: 'column', mt: 3 }}>
                    {notifications.length === 0 ? <Typography>No unread priority notifications.</Typography> : null}
                    {notifications.map(notif => (
                        <Card key={notif.id} sx={{ borderLeft: '4px solid', borderColor: notif.type === 'placement' ? 'primary.main' : notif.type === 'result' ? 'success.main' : 'grey.500' }}>
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <Chip label={notif.type} size="small" color={notif.type === 'placement' ? 'primary' : notif.type === 'result' ? 'success' : 'default'} />
                                    </Box>
                                    <Typography variant="body1">{notif.message}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Button variant="contained" color="primary" onClick={() => markAsRead(notif.id)}>
                                    Mark as Read
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};
