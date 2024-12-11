import {PaymentDTO} from "./payment.dto";

export interface CardDTO extends PaymentDTO {
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
}

