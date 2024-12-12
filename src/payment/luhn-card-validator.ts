import { Injectable } from '@nestjs/common';
import {CardValidator} from "./card-validator";

@Injectable()
export class LuhnCardValidator extends CardValidator {
    protected isValidCardNumber(cardNumber: string): boolean {
        let sum = 0;
        let shouldDouble = false;

        // Check card length
        if (!/^\d{13,19}$/.test(cardNumber)) return false;

        // Luhn Algorithm
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i]);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    }
}
