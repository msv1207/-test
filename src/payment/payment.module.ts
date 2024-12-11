import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardValidator } from "./card-validator";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'GRPC_CLIENT',
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:5000',
                    package: 'payment',
                    protoPath: join(__dirname, '../payment/payment.proto'),
                },
            },
        ]),
    ],
    controllers: [CardController],
    providers: [CardService, CardValidator],
})

export class PaymentModule {}
