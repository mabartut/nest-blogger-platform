import { INestApplication } from '@nestjs/common';
import { pipesSetup } from './pipes.setup.ts';
import { swaggerSetup } from './swagger.setup.ts';
import { globalPrefixSetup } from './global-prefix.setup.ts';

export function appSetup(app: INestApplication) {
  pipesSetup(app);
  globalPrefixSetup(app);
  swaggerSetup(app);
}
