import { INestApplication, ValidationPipe } from '@nestjs/common';
import { errorFormatter } from '../core/exeptions/error-formatter.ts';
import { DomainException } from '../core/exeptions/domain-exeptions.ts';
import { DomainExceptionCode } from '../core/exeptions/domain-exception-code.ts';

export function pipesSetup(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,

      exceptionFactory: (errors) => {
        const formattedErrors = errorFormatter(errors);

        throw new DomainException({
          code: DomainExceptionCode.ValidationError,
          message: 'Validation failed',
          extensions: formattedErrors,
        });
      },
    }),
  );
}
