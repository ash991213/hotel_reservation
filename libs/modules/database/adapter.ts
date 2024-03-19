import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionModel } from '@libs/modules/database/types';

export abstract class IDataBaseService {
    abstract getDefaultConnection<T = TypeOrmModuleOptions>(options?: ConnectionModel): T;
}
