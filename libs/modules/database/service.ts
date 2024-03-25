import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IDataBaseService } from '@libs/modules/database/adapter';
import { ConnectionModel } from '@libs/modules/database/types';

@Injectable()
export class DataBaseService implements IDataBaseService {
    getDefaultConnection<T extends TypeOrmModuleOptions = TypeOrmModuleOptions>(config: ConnectionModel): T {
        return {
            type: 'mysql',
            host: config.host,
            port: config.port,
            username: config.user,
            password: config.password,
            database: config.dbName,
            entities: config.entities,
        } as T;
    }
}
