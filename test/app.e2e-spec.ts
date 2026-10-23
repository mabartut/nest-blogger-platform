import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DatabaseModule } from '../src/core/database/database.module.js';
import { TestDatabaseModule } from './helpers/test-database.module.js';
import { AppModule } from '../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // TODO: я не стал выносить отдельно но обычно тестовая конфигурация либо одна либо несколько под нужные сценарии
    // например разные базы или окружения, в любом случае эти конфигурации детерминированы и имеет смысл это просто выносить по файлам
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // TODO:
      // у тебя монго в докере скорее всего но тесты, в идеале это одна единственная
      // кнопка для старта - например ты разраб а я тимлид,
      // я не хочу стартовать докер и прочее и прочее, я хочу нажать одну кнопку
      // и чтобы заработало - да и если в норм компании работать будешь у тебя
      // будут ci/cd пайплайны где докер хер настроишь нормально поэтому в
      // идеале делай все через максимальную автоматизацию

      // конкретно тут я меняю регистрацию твоего реального монго на монго сервер - по
      // сути тот же бинарник но голый который нода сама может запустить
      .overrideModule(DatabaseModule)
      .useModule(TestDatabaseModule)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
