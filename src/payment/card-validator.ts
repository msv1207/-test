import { Injectable } from '@nestjs/common';
import {ValidationResult} from "./validation-result";
import {PaymentValidator} from "./payment-validator";
import {CardDTO} from "./dto/card.dto";
import { ErrorEnum } from "./enum/error.enum";

@Injectable()
export class CardValidator implements PaymentValidator {
    validate(cardDTO: CardDTO): ValidationResult {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        // Check Expiration Date
        if (cardDTO.expirationYear < currentYear || (cardDTO.expirationYear === currentYear && cardDTO.expirationMonth < currentMonth)) {
            // Left hardcoded massage because in future can be changed by lang functions with status
            return {valid: false, error: {code: ErrorEnum.Expired, message: 'Card expired'}};
        }

        if (!this.isValidCardNumber(cardDTO.cardNumber)) {
            return {valid: false, error: {code: ErrorEnum.InvalidCardNumber, message: 'Invalid card number'}};
        }

        return {valid: true};
    }

    private isValidCardNumber(cardNumber: string): boolean {
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
