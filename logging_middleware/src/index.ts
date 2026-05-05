import axios from 'axios';

export type LogStack = 'backend' | 'frontend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

// Define allowed packages for each stack
export const BACKEND_PACKAGES = ['controller', 'service', 'repository', 'middleware', 'route', 'handler', 'config', 'utils'] as const;
export const FRONTEND_PACKAGES = ['api', 'component', 'hook', 'page', 'state', 'style'] as const;

export type BackendPackage = typeof BACKEND_PACKAGES[number];
export type FrontendPackage = typeof FRONTEND_PACKAGES[number];

let globalAccessToken: string | null = null;

export const initLogger = (token: string) => {
    globalAccessToken = token;
};

export const Log = async (
    stack: LogStack,
    level: LogLevel,
    packageName: string,
    message: string
): Promise<void> => {
    try {
        // Ensure lowercase constraint
        const normalizedStack = stack.toLowerCase() as LogStack;
        const normalizedLevel = level.toLowerCase() as LogLevel;
        const normalizedPackage = packageName.toLowerCase();
        const normalizedMessage = message.toLowerCase();

        // Validate package according to stack
        if (normalizedStack === 'backend' && !BACKEND_PACKAGES.includes(normalizedPackage as BackendPackage)) {
            console.warn(`[Logger] Invalid backend package: ${normalizedPackage}`);
            return;
        }

        if (normalizedStack === 'frontend' && !FRONTEND_PACKAGES.includes(normalizedPackage as FrontendPackage)) {
            console.warn(`[Logger] Invalid frontend package: ${normalizedPackage}`);
            return;
        }

        const payload = {
            stack: normalizedStack,
            level: normalizedLevel,
            package: normalizedPackage,
            message: normalizedMessage
        };

        if (globalAccessToken) {
            await axios.post(
                'http://20.207.122.201/evaluation-service/logs',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${globalAccessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } else {
            console.warn(`[Logger] No access token configured. Log: ${JSON.stringify(payload)}`);
        }
    } catch (error) {
        // Handle API errors silently as per requirement
        console.error(`[Logger] Failed to send log remotely.`, error instanceof Error ? error.message : error);
    }
};
