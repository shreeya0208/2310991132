import { Log } from 'logging_middleware';
import type { LogStack, FrontendPackage } from 'logging_middleware';

const stack: LogStack = 'frontend';

export const logger = {
    debug: (pkg: FrontendPackage, message: string) => Log(stack, 'debug', pkg, message),
    info: (pkg: FrontendPackage, message: string) => Log(stack, 'info', pkg, message),
    warn: (pkg: FrontendPackage, message: string) => Log(stack, 'warn', pkg, message),
    error: (pkg: FrontendPackage, message: string) => Log(stack, 'error', pkg, message),
    fatal: (pkg: FrontendPackage, message: string) => Log(stack, 'fatal', pkg, message)
};
