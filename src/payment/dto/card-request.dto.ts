import { IsNumber, IsString, Matches, Max, Min } from 'class-validator';

export class CardRequestDTO {
    @IsString()
    @Matches(/^\d{13,19}$/, { message: 'Card number must be between 13 and 19 digits long' })
    cardNumber: string;

    @IsNumber()
    @Min(1, { message: 'Expiration month must be between 1 and 12' })
    @Max(12, { message: 'Expiration month must be between 1 and 12' })
    expirationMonth: number;

    @IsNumber()
    @Min(new Date().getFullYear() - 50, { message: 'Expiration year is too far in the past' })
    @Max(new Date().getFullYear() + 50, { message: 'Expiration year is too far in the future' })
    expirationYear: number;
}
