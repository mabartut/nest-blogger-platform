import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module.ts';
import { appSetup } from './setup/app.setup.ts';
import { DatabaseModule } from './core/database/database.module.ts';
import { TestDatabaseModule } from '../test/helpers/test-database.module.ts';


// TODO:  не надо так называть файлы 
describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule);

    const testingAppModule: TestingModule =
      await testingModuleBuilder.compile();

    app = testingAppModule.createNestApplication();

    // Применяем глобальную конфигурацию (prefix "api", pipes и т.д.)
    appSetup(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('GET /api/users → 1234', async () => {
    const server = app.getHttpServer();

    const res = await request(server).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.text).toBe('1234');
  });

  it('GET /unknown → 404', async () => {
    const res = await request(app.getHttpServer()).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});
