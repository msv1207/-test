import {Controller, UsePipes} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CardService } from "./card.service";
import { ValidationResult } from "./validation-result";
import { CardRequestDTO } from "./dto/card-request.dto";
import { GrpcPipe } from "./grpc.pipe";

@Controller()
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @GrpcMethod('CardService', 'Validate')
    @UsePipes(new GrpcPipe())
    validate(request: CardRequestDTO): ValidationResult {
        return this.cardService.validate(request);
    }
}
