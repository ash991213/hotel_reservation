import { HttpException, HttpStatus } from '@nestjs/common';

import { Res } from 'libs/utils/common/res/res.interface';
import { ResImpl } from 'libs/utils/common/res/res.implement';

export class ResException extends HttpException {
    constructor(res: Res) {
        super(new ResImpl(res), HttpStatus.BAD_REQUEST);
    }
}
