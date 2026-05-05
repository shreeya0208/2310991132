import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3001,
    EVALUATION_SERVICE_URL: 'http://20.207.122.201/evaluation-service'
};
