import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Drop-in replacement for DatabaseModule: in-memory MongoDB that lives
// exactly as long as the connection of the Nest application using it.
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();

        return {
          uri: mongod.getUri(),
          connectionFactory: (connection) => {
            // TODO: я тут просто обрываю соединение по окончании теста 
            // - иначе будут зависшие промисы и ворнинги джеста. Некритично но не факт что монга сама стопнется
            connection.once('close', () => mongod.stop());
            return connection;
          },
        };
      },
    }),
  ],
})
export class TestDatabaseModule {}
