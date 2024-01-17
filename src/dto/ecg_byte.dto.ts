import { IsArray, IsNumber,IsOptional,IsString, isNumber } from "class-validator";


export class ecg_byteDTO{

    @IsString()
    readonly kind: string;
    
    @IsString()    
    readonly eq:string;

    @IsString()
    @IsOptional()
    readonly timezone:string;

    @IsString()
    @IsOptional()
    readonly writetime:string;   

    @IsArray()
    @IsOptional()
    readonly ecgPacket:number[];

    @IsNumber()
    @IsOptional()
    readonly bpm:number;
}