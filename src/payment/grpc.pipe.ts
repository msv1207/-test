import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { status as Status } from "@grpc/grpc-js";

@Injectable()
export class GrpcPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        if (!metadata.metatype) {
            return value;
        }

        const object = plainToInstance(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length) {
            const errorMessages = errors
                .map(err =>
                    Object.values(err.constraints || {}).join(', ')
                )
                .join('; ');

            throw new RpcException({
                code: Status.INVALID_ARGUMENT,
                message: 'Bad Request: ' + errorMessages
            });
        }

        return value;
    }
}
