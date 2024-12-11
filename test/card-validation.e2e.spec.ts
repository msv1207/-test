import { INestMicroservice } from '@nestjs/common';
import {ClientGrpc, MicroserviceOptions, Transport} from '@nestjs/microservices';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

describe('CardService', () => {
  let app: INestMicroservice;
  let client: ClientGrpc;
  let cardService: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: 'payment',
        protoPath: join(__dirname, '../src/payment/payment.proto'),
      },
    });

    await app.listen();

    client = app.get('GRPC_CLIENT');
    cardService = client.getService('CardService');
  });

  afterAll(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should validate a valid card', async () => {
    const payload = {
      cardNumber: '4111111111111111',
      expirationMonth: 12,
      expirationYear: new Date().getFullYear() + 2,
    };
    const response = await cardService.validate(payload).toPromise();
    expect(response.valid).toBe(true);
  });

  it('should invalidate a card with invalid number', async () => {
    const payload = {
      cardNumber: '1234567890123',
      expirationMonth: 12,
      expirationYear: new Date().getFullYear() + 2,
    };
    const response = await cardService.validate(payload).toPromise();
    expect(response.valid).toBe(false);
  });

  it('should invalidate a card with expired date', async () => {
    const payload = {
      cardNumber: '4111111111111111',
      expirationMonth: 1,
      expirationYear: 2020,
    };
    const response = await cardService.validate(payload).toPromise();
    expect(response.valid).toBe(false);
  });

  it('get bad request', async () => {
    const payload = {
      cardNumber: 4111111,
      expirationMonth: 'test',
      expirationYear: 'test',
    };

    try {
      await cardService.validate(payload).toPromise();
      fail('Expected a Bad Request error, but the call succeeded.');
    } catch (error) {
      expect(error.code).toBe(3);
      expect(error.details).toContain('Card number must be between 13 and 19 digits long');
      expect(error.details).toContain('Expiration month must be between 1 and 12');
      expect(error.details).toContain('Expiration year is too far in the past');
    }
  });
});
