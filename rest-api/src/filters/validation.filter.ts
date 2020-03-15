import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {ValidationException} from './validation.exception';

// if you use Partial on the controller body, will not be triggered!
@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    console.log("Validation exception handler triggered ", JSON.stringify(exception));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(400).json({
      statusCode: 400,
      createdBy: "ValidationFilter",
      validationErrors: exception.validationErrors
    });
  }
}
