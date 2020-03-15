import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';

@Catch() // catching any Exception so nothing inside @Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log("Fallback exception handler triggered ", JSON.stringify(exception));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(500).json({
      status: 500,
      createdBy: "FallbackExceptionFilter", // for debugging, eg where error came from
      errorMessage: exception.message ? exception.message : "Unexpected error occurred"
    });
  }
}
