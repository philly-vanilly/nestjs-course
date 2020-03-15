import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
      console.log("Http exception handler triggered ", JSON.stringify(exception));

      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const statusCode = exception.getStatus();

      return response.status(statusCode).json({
        status: statusCode,
        createdBy: "HttpExceptionFilter", // for debugging, eg where error came from
        errorMessage: exception.message.message
      });
    }
}
