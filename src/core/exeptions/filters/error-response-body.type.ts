import { DomainExceptionCode } from '../domain-exception-code.ts';
import { Extension } from '../domain-exeptions.ts';

export type ErrorResponseBody = {
  timestamp: string;
  path: string | null;
  message: string;
  extensions: Extension[];
  code: DomainExceptionCode;
};
