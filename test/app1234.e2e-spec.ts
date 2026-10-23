import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.ts';
import { DatabaseModule } from '../src/core/database/database.module.ts';
import { TestDatabaseModule } from './helpers/test-database.module.ts';

// TODO:  не надо так называть файлы
describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
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

    expect(res.text).toBe('1234');
  });

  it('GET /unknown → 404', async () => {
    const res = await request(app.getHttpServer()).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});
