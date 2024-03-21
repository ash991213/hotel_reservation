import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import { AppModule } from '@apps/hotels/src/modules/app.module';

import { LoggingInterceptor } from '@libs/utils/interceptors/logger.interceptor';
import { validationPipeConfig } from '@libs/utils/validations/validation.util';
import { AllExceptionsFilter } from '@libs/utils/filters/common.exception.filter';

import { IEnvConfigService } from '@libs/modules/global/config/adapter';

import { name } from '@apps/hotels/package.json';
import { ILoggerService } from '@libs/modules/global/logger/adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(IEnvConfigService);
    const loggerService = app.get(ILoggerService);
    loggerService.setApplication(name);

    app.useLogger(loggerService);

    app.enableCors();

    app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.useGlobalPipes(validationPipeConfig);

    app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

    await app.listen(configService.hotelsAPI.port);
}
bootstrap();
