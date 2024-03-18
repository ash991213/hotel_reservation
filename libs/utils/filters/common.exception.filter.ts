import { ArgumentsHost, BadRequestException, BadGatewayException, Catch, ExceptionFilter, ForbiddenException, HttpException, Logger, NotFoundException, GatewayTimeoutException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { Res } from 'libs/utils/common/res/res.interface';
import { ResImpl } from 'libs/utils/common/res/res.implement';

import { BAD_GATEWAY, GATEWAY_TIMEOUT, INTERNAL_SERVER_ERROR, INVALID_PARAM, NOT_HAVE_ACCESS, UNAUTHORIZED_ERROR, WRONG_APPROACH } from 'libs/utils/common/const/error.const';

import * as os from 'os';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const hostname = os.hostname();

        const ctx = host.switchToHttp();

        let httpResponseBody: Res;

        if (exception instanceof BadRequestException) {
            httpResponseBody = INVALID_PARAM;
        } else if (exception instanceof UnauthorizedException) {
            httpResponseBody = UNAUTHORIZED_ERROR;
        } else if (exception instanceof ForbiddenException) {
            httpResponseBody = NOT_HAVE_ACCESS;
        } else if (exception instanceof NotFoundException) {
            httpResponseBody = WRONG_APPROACH;
        } else if (exception instanceof BadGatewayException) {
            httpResponseBody = BAD_GATEWAY;
        } else if (exception instanceof GatewayTimeoutException) {
            httpResponseBody = GATEWAY_TIMEOUT;
        }

        if (!httpResponseBody) {
            httpResponseBody = INTERNAL_SERVER_ERROR;
            new Logger(AllExceptionsFilter.name).error(`[${hostname}] - Error : ${JSON.stringify(exception['response'])}`, exception.stack);
            httpAdapter.reply(ctx.getResponse(), new ResImpl(httpResponseBody), HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            new Logger(AllExceptionsFilter.name).error(`[${hostname}] - Error : ${JSON.stringify(httpResponseBody)}`, exception.stack);
            httpAdapter.reply(ctx.getResponse(), new ResImpl(httpResponseBody), exception.getStatus());
        }
    }
}
