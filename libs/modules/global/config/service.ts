import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvConfigService } from '@libs/modules/global/config/adapter';

@Injectable()
export class EnvConfigService extends ConfigService implements IEnvConfigService {
    constructor() {
        super();
    }

    NODE_ENV = this.get('NODE_ENV');

    LOG_LEVEL = this.get<string>('LOG_LEVEL');
    LOG_LEVEL_DB = this.get<string>('LOG_LEVEL_DB');

    database = {
        host: this.get<string>('MYSQL_HOST'),
        port: this.get<number>('MYSQL_PORT'),
        user: this.get<string>('MYSQL_USERNAME'),
        password: this.get<string>('MYSQL_PASSWORD'),
    };

    hotelsAPI = {
        port: this.get<number>('HOTEL_API_PORT'),
    };

    REDIS_URL = this.get('REDIS_URL');
}
