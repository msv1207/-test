import { Injectable } from '@nestjs/common';
import { CardValidator } from './card-validator';
import { ValidationResult } from './validation-result'
import { CardDTO } from "./dto/card.dto";

@Injectable()
export class CardService {
    constructor(private readonly cardValidator: CardValidator) {}

    validate(card: CardDTO): ValidationResult {
        return this.cardValidator.validate(card);
    }
}
