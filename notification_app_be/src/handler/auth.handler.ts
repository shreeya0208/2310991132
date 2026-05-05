import axios from 'axios';
import { config } from '../config';
import { logger } from '../utils/logger';
import { initLogger } from 'logging_middleware';

export const authenticateAndInitLogger = async () => {
    try {
        logger.info('handler', 'initializing authentication with evaluation service');
        
        const credentials = {
            email: process.env.USER_EMAIL || "test@example.com",
            name: process.env.USER_NAME || "User",
            mobileNo: process.env.USER_MOBILE || "0000000000",
            githubUsername: "shreeya0208",
            rollNo: "2310991132",
            accessCode: process.env.ACCESS_CODE || "access123"
        };

        // Attempt to register
        try {
            await axios.post(`${config.EVALUATION_SERVICE_URL}/register`, credentials);
            logger.info('handler', 'registration successful or already registered');
        } catch (err: any) {
            logger.warn('handler', `registration step returned error (might be already registered): ${err.message}`);
        }

        // Authenticate
        const authResponse = await axios.post(`${config.EVALUATION_SERVICE_URL}/auth`, {
            rollNo: credentials.rollNo,
            email: credentials.email,
            clientID: "29367ed5-0cc2-4aaf-9d0c-e43142504b11",
            clientSecret: "cGfqtJjdAhpASess"
        });

        const { clientID, clientSecret, access_token } = authResponse.data;

        if (access_token) {
            initLogger(access_token);
            logger.info('handler', 'logger initialized with access token');
            return access_token;
        } else {
            logger.warn('handler', 'no access token received from auth api');
        }

    } catch (error: any) {
        logger.error('handler', `failed to authenticate: ${error.message}`);
    }
};
