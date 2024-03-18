export type CacheKeyArgument = string | Buffer;
export type CacheValueArgument = string | Buffer;

export type CacheKeyValue = {
    key: CacheKeyArgument;
    value: CacheValueArgument | CacheValueArgument[];
};

export type RedisNode = {
    host?: string;
    port?: number;
    db?: number;
    password?: string;
    keyPrefix?: string;
};

export type RedisNodesConfig = {
    name: string;
    nodes: RedisNode[];
};
