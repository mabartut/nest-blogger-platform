import { applyDecorators } from '@nestjs/common';
import { isString, Length } from 'class-validator';
import { Trim } from '../transform/trim.ts';

export const IsStringWithTrim = (min: number, max: number) =>
  applyDecorators(isString, Length(min, max), Trim);
