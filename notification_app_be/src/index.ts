import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authenticateAndInitLogger } from './handler/auth.handler';
import { errorMiddleware } from './middleware/error.middleware';
import taskRoutes from './route/task.route';
import notificationRoutes from './route/notification.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/notifications', notificationRoutes);

app.use(errorMiddleware);

const startServer = async () => {
    // Authenticate and initialize logging before starting the server to ensure logs are sent
    await authenticateAndInitLogger();

    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
};

startServer();
