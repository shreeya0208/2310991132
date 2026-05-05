import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Pagination, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { useNotifications } from '../hook/useNotifications';
import { logger } from '../api/logger';

export const AllNotifications = () => {
    const { notifications, total, loading, fetchNotifications, markAsRead } = useNotifications();
    const [page, setPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState('all');
    const limit = 10;

    useEffect(() => {
        logger.info('page', 'all notifications page loaded');
        fetchNotifications(page, limit, typeFilter);
    }, [page, typeFilter, fetchNotifications]);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>All Notifications</Typography>
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Type</InputLabel>
                    <Select
                        value={typeFilter}
                        label="Filter by Type"
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="event">Event</MenuItem>
                        <MenuItem value="result">Result</MenuItem>
                        <MenuItem value="placement">Placement</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDir: 'column', gap: 2, flexDirection: 'column' }}>
                    {notifications.length === 0 ? <Typography>No notifications found.</Typography> : null}
                    {notifications.map(notif => (
                        <Card key={notif.id} sx={{ bgcolor: notif.isRead ? 'background.default' : 'action.selected' }}>
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                                        <Chip label={notif.type} size="small" color={notif.type === 'placement' ? 'primary' : notif.type === 'result' ? 'success' : 'default'} />
                                        {!notif.isRead && <Chip label="New" size="small" color="error" />}
                                    </Box>
                                    <Typography variant="body1">{notif.message}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </Typography>
                                </Box>
                                {!notif.isRead && (
                                    <Button variant="outlined" onClick={() => markAsRead(notif.id)}>
                                        Mark as Read
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Pagination 
                    count={Math.ceil(total / limit)} 
                    page={page} 
                    onChange={(_, val) => setPage(val)} 
                    color="primary" 
                />
            </Box>
        </Box>
    );
};
