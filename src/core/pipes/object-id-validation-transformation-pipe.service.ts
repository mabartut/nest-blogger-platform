import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
import { DomainException } from '../exeptions/domain-exeptions.ts';
import { DomainExceptionCode } from '../exeptions/domain-exception-code.ts';

@Injectable()
export class ObjectIdValidationTransformationPipeService implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (metadata.metatype !== Types.ObjectId) {
      return value;
    }

    if (!isValidObjectId(value)) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: `Invalid objectId: ${value}`,
      });
    }
    return new Types.ObjectId(value);
  }
}

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!isValidObjectId(value)) {
      throw new DomainException({
        code: DomainExceptionCode.BadRequest,
        message: `Invalid objectId: ${value}`,
      });
    }

    return value;
  }
}
