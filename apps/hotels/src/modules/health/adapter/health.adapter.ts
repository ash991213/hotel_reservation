import { ResImpl } from 'libs/utils/common/res/res.implement';

export abstract class IHealthService {
    abstract healthCheck(): Promise<ResImpl>;
}
