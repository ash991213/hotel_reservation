export interface Res {
    when?: string;
    code: number;
    message: string;
    data?: object | Res;
}
