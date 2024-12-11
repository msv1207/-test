import {ValidationResult} from "./validation-result";
import {PaymentDTO} from "./dto/payment.dto";

export interface PaymentValidator {
    validate(paymentDTO: PaymentDTO): ValidationResult;
}
