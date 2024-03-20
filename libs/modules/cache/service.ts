import { Injectable } from '@nestjs/common';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';

import { ILoggerService } from '@libs/modules/global/logger/adapter';
import { ICacheService } from '@libs/modules/cache/adapter';
import { CacheKeyArgument, CacheKeyValue, CacheValueArgument } from '@libs/modules/cache/types';
import { ResException } from '@libs/utils/common/res/res.exception';
import { REDIS_CONNECTION_FAILED, REDIS_DELETE_FAILED, REDIS_SET_EXPIRED_FAILED, REDIS_SET_FAILED } from '@libs/utils/common/const/error.const';

@Injectable()
export class CacheService implements ICacheService {
    client: RedisClientType;

    constructor(
        private readonly config: RedisClientOptions,
        private readonly logger: ILoggerService,
    ) {
        this.client = createClient(this.config) as RedisClientType;
    }

    async isConnected(): Promise<void> {
        const ping = await this.client.ping();
        if (ping !== 'PONG') throw new ResException(REDIS_CONNECTION_FAILED);
    }

    async connect(): Promise<RedisClientType> {
        await this.client.connect();
        this.logger.log('Redis connected!');
        return this.client;
    }

    async set(key: CacheKeyArgument, value: CacheValueArgument, config?: unknown): Promise<void> {
        const setResult = await this.client.set(key, value, config);
        if (setResult !== 'OK') throw new ResException(REDIS_SET_FAILED);
    }

    async get(key: CacheKeyArgument): Promise<unknown> {
        const getResult = await this.client.get(key);
        if (!getResult) this.logger.warn(`key: ${key} not found.`, CacheService.name);

        return getResult;
    }

    async del(key: CacheKeyArgument): Promise<void> {
        const deleted = await this.client.del(key);
        if (!deleted) throw new ResException(REDIS_DELETE_FAILED);
    }

    async setMulti(redisList: CacheKeyValue[]): Promise<void> {
        const multi = this.client.multi();

        for (const model of redisList) {
            multi.rPush(model.key, model.value);
        }

        await multi.exec();
    }

    async pExpire(key: CacheKeyArgument, milliseconds: number): Promise<void> {
        const expired = await this.client.pExpire(key, milliseconds);
        if (!expired) throw new ResException(REDIS_SET_EXPIRED_FAILED);
    }

    async hGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]> {
        return await this.client.hGet(key, field);
    }

    async hSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValueArgument): Promise<number> {
        return await this.client.hSet(key, field, value);
    }

    async hGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]> {
        return await this.client.hGetAll(key);
    }
}
