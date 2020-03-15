import {BadRequestException} from '@nestjs/common';

// if you use Partial on the controller body, will not be thrown!
export class ValidationException extends BadRequestException {
    constructor(public validationErrors: string[]) {
        super();
    }
}
