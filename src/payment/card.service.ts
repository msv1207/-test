import { Injectable } from '@nestjs/common';
import { LuhnCardValidator } from './luhn-card-validator';
import { ValidationResult } from './validation-result'
import { CardDTO } from "./dto/card.dto";

@Injectable()
export class CardService {
    constructor(private readonly cardValidator: LuhnCardValidator) {}

    validate(card: CardDTO): ValidationResult {
        return this.cardValidator.validate(card);
    }
}
