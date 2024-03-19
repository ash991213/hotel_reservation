import { DateTime } from 'luxon';

import { Res } from '@libs/utils/common/res/res.interface';

import { DEFAULT_DATE_TIME_FORMAT } from '@libs/utils/common/const/common.const';

export class ResImpl implements Res {
    constructor(res: Res) {
        this.code = res['code'];
        this.message = res['message'];
        this.data = res['data'];
    }

    when: string = DateTime.now().setZone('Asia/Seoul').toFormat(DEFAULT_DATE_TIME_FORMAT);
    code: number;
    message: string;
    data?: object | Res;
}
