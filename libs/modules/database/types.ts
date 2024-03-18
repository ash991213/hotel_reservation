export type ConnectionModel = {
    host: string;
    port: string | number;
    user: string;
    password: string;
    dbName: string;
    entities: string[];
};
