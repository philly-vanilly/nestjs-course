import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';

/**
 * Pipe is just for demo purposes. Mongoose automatically casts to the expected type!
 * Also, there is a ParseIntPipe from NestJS
 */
export class ToIntegerPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): any {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('conversion to number failed: ' + value);
    }
    return val;
  }
}
