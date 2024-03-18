import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const logger: Logger = new Logger(`${context.getClass().name} - ${context.getHandler().name}`);

        if (context.getClass().name === 'HealthController') return next.handle();

        const req = context.getArgByIndex(0);

        const logIfNotEmpty = (prefix: string, obj: any) => {
            if (Object.keys(obj).length > 0) {
                logger.debug(`[REQ] ${prefix}: ${JSON.stringify(obj)}`);
            }
        };

        logger.debug(`[REQ] url: (${req.method}) ${req.url}`);
        logIfNotEmpty('header', req.headers);
        logIfNotEmpty('path', req.params);
        logIfNotEmpty('query', req.query);
        logIfNotEmpty('body', req.body);

        return next.handle().pipe(tap((data) => logger.debug(`[RES] response: ${JSON.stringify(data)}`)));
    }
}
