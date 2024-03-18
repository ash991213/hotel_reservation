import { ValidationError, ValidationPipe } from '@nestjs/common';

import { Res } from 'libs/utils/common/res/res.interface';
import { ResException } from 'libs/utils/common/res/res.exception';

import { INVALID_PARAM } from 'libs/utils/common/const/error.const';

interface ValidationErrorDetails {
    parameter: string;
    value: any;
    reason: string[];
}

const validationErrorHandling: any = (upperProperty: string | null, errors: ValidationError[]) => {
    return errors.flatMap((error: ValidationError): ValidationErrorDetails[] => {
        const property: string = (upperProperty ? `${upperProperty} - ` : '') + error.property;
        const value: any = error.value || null;
        const reason: string[] = error.constraints ? Object.values(error.constraints) : [];

        let errorList: ValidationErrorDetails[] = reason.length > 0 ? [{ parameter: property, value, reason }] : [];

        if (error.children && error.children.length > 0) {
            const childrenErrorList: ValidationErrorDetails[] = validationErrorHandling(property, error.children);
            errorList = [...errorList, ...childrenErrorList];
        }

        return errorList;
    });
};

export const validationErrorThrow = (errorType: Res, errors: ValidationError[]) =>
    new ResException({
        ...errorType,
        ...{ data: { list: validationErrorHandling(null, errors) } },
    });

export const validationParamErrorThrow = (errors: ValidationError[]) => validationErrorThrow(INVALID_PARAM, errors);

export const validationPipeConfig = new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    whitelist: true,
    disableErrorMessages: false,
    stopAtFirstError: true,
    exceptionFactory: validationParamErrorThrow,
});
