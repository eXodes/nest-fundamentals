import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ShopsModule } from '../../src/shops/shops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateShopDto } from '../../src/shops/dto/create-shop.dto';

describe('ShopsController (e2e)', () => {
  let app: INestApplication;

  const shop = {
    name: 'Minishop',
    link: 'https://www.minishop.com/',
    categories: ['lifestyle'],
    city: 'Kuala Lumpur',
    state: 'Malaysia',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ShopsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'test-user',
          password: 'test-password',
          database: 'nest-testing',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('/shops (POST)', () => {
    return request(app.getHttpServer())
      .post('/shops')
      .send(shop as CreateShopDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedShop = expect.objectContaining({
          ...shop,
          categories: expect.arrayContaining(
            shop.categories.map((name) => expect.objectContaining({ name })),
          ),
        });
        expect(body).toEqual(expectedShop);
      });
  });

  it.todo('/shops (GET)');
  it.todo('/shops/:id (GET)');
  it.todo('/shops/:id (PATCH)');
  it.todo('/shops/:id (DELETE)');

  afterAll(async () => {
    await app.close();
  });
});
