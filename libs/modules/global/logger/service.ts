import { Injectable } from '@nestjs/common';

import { ILoggerService } from 'libs/modules/global/logger/adapter';

import { Logger, createLogger, format, transports } from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as path from 'path';

@Injectable()
export class LoggerService implements ILoggerService {
    private app: string;
    private logger: Logger;

    setApplication(app: string): void {
        this.app = app;
    }

    private dailyRotateFileTransport(level: string) {
        const logsDir = path.join(process.cwd(), 'logs');
        return new winstonDaily({
            level: level,
            datePattern: 'YYYY-MM-DD',
            dirname: logsDir + `//${level}`,
            filename: `${logsDir}/%DATE%-${level}.log`,
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
        });
    }

    initializeLogger(NODE_ENV: string) {
        this.logger = createLogger({
            level: NODE_ENV === 'prod' ? 'error' : 'debug',
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf((info) => {
                    return `${info.timestamp} [${info.level}] [${this.app}] ${info.message} ${info.context ? `[${info.context}]` : ''}`;
                }),
            ),
            transports: [
                this.dailyRotateFileTransport('info'),
                this.dailyRotateFileTransport('error'),
                this.dailyRotateFileTransport('warn'),
                new transports.Console({
                    level: NODE_ENV === 'prod' ? 'error' : 'debug',
                }),
            ],
        });
    }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace: string, context?: string) {
        this.logger.error(message, { trace, context });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(message, { context });
    }
}
