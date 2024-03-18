export abstract class ILoggerService {
    abstract setApplication(app: string): void;
    abstract initializeLogger(NODE_ENV: string): void;
    abstract log(message: string): void;
    abstract error(message: string, trace: string, context?: string): void;
    abstract warn(message: string, context?: string): void;
    abstract debug(message: string, context?: string): void;
    abstract verbose(message: string, context?: string): void;
}
