import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: process.env.GRPC_URL || '0.0.0.0:5000',
            package: process.env.GRPC_PACKAGE || 'payment',
            protoPath: join(__dirname, process.env.PROTO_PATH || './payment/payment.proto'),
        },
    });

    await app.listen();
}
bootstrap();
