import { CardService } from '../src/payment/card.service';
import { LuhnCardValidator } from '../src/payment/luhn-card-validator';
import { CardDTO } from '../src/payment/dto/card.dto';
import { ErrorEnum } from "../src/payment/enum/error.enum";

describe('CardService', () => {
    let service: CardService;
    let validator: LuhnCardValidator;

    beforeEach(() => {
        validator = new LuhnCardValidator();
        service = new CardService(validator);
    });

    it('should validate a valid card', () => {
        const card: CardDTO = {
            cardNumber: '4111111111111111',
            expirationMonth: 12,
            expirationYear: 2028,
        };
        expect(service.validate(card).valid).toBe(true);
    });

    it('should return an error for an expired card', () => {
        const card: CardDTO = {
            cardNumber: '4111111111111111',
            expirationMonth: 1,
            expirationYear: 2021,
        };
        const result = service.validate(card);
        expect(result.valid).toBe(false);
        expect(result.error.code).toBe(ErrorEnum.Expired);
    });

    it('should return an error for an invalid card number', () => {
        const card: CardDTO = {
            cardNumber: '1111111111111',
            expirationMonth: 10,
            expirationYear: 2028,
        };
        const result = service.validate(card);
        expect(result.valid).toBe(false);
        expect(result.error.code).toBe(ErrorEnum.InvalidCardNumber);
    });
});
