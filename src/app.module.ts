import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module.ts';
import { DatabaseModule } from './core/database/database.module.ts';
import { CoreModule } from './core/core.module.ts';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module.ts';
import { TestingModule } from './modules/testing/testing.module.ts';
import { APP_FILTER } from '@nestjs/core';
import { AllHttpExceptionsFilter } from './core/exeptions/filters/all-exceptions.filter.ts';
import { DomainHttpExceptionsFilter } from './core/exeptions/filters/domain-exceptions.filter.ts';

@Module({
  imports: [
    DatabaseModule,
    UserAccountsModule,
    BloggersPlatformModule,
    TestingModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllHttpExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DomainHttpExceptionsFilter,
    },
  ],
})
export class AppModule {}
