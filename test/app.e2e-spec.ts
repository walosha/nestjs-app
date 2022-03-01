import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('app test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleref = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleref.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.init();
  });
  afterAll(() => {
    app.close();
  });

  it.todo('The app has started successfully');
});
