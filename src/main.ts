import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:5000',
            package: 'payment',
            protoPath: join(__dirname, './payment/payment.proto'),
        },
    });

    await app.listen();
}
bootstrap();
