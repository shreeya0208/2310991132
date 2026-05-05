import { Log, LogLevel, LogStack, BackendPackage } from 'logging_middleware';

const stack: LogStack = 'backend';

export const logger = {
    debug: (pkg: BackendPackage, message: string) => Log(stack, 'debug', pkg, message),
    info: (pkg: BackendPackage, message: string) => Log(stack, 'info', pkg, message),
    warn: (pkg: BackendPackage, message: string) => Log(stack, 'warn', pkg, message),
    error: (pkg: BackendPackage, message: string) => Log(stack, 'error', pkg, message),
    fatal: (pkg: BackendPackage, message: string) => Log(stack, 'fatal', pkg, message)
};
