import { IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class ecg_raw_history_lastDTO{
    @IsString()
    readonly kind: string;
    
    @IsString()
    readonly eq:string;
}