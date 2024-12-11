import {ErrorEnum} from "../enum/error.enum";

export interface ErrorDTO {
    code: ErrorEnum;
    message: string;
}
