export abstract class IEnvConfigService {
    NODE_ENV: string;

    LOG_LEVEL: string;
    LOG_LEVEL_DB: string;

    database: {
        host: string;
        port: number;
        user: string;
        password: string;
    };

    hotelsAPI: {
        port: number;
    };

    REDIS_URL: string;
}
