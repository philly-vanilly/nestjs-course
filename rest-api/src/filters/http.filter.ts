import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

// if you use Partial on the controller body, will not be triggered!
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
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
