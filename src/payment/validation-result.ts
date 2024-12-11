import {ErrorDTO} from "./dto/error.dto";

export interface ValidationResult {
    valid: boolean;
    error?: ErrorDTO;
}
