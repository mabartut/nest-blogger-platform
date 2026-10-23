import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { appSetup } from './setup/app.setup.ts';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appSetup(app);

  const configService = app.get(ConfigService);

  const port = Number(configService.get<string>('PORT') ?? 5000);

  await app.listen(port, () => {
    console.log('Server is running on port', port);
  });
}

bootstrap();
