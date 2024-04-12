import { IsNumber,IsOptional,IsString } from "class-validator";
import { Double,Int32 } from "typeorm";

export class userDTO{
    
    @IsOptional()
    @IsString()
    readonly kind: string;
    
    @IsString()
    readonly eq:string;

    @IsOptional()
    @IsString()
    readonly password:string;
    
    @IsOptional()
    @IsString()
    readonly eqname:string;

    @IsOptional()
    @IsString()
    readonly email:string;

    @IsOptional()
    @IsString()
    readonly phone:string;    

    @IsOptional()
    @IsString()
    readonly sex:string;

    @IsOptional()
    @IsString()
    readonly height:string;

    @IsOptional()
    @IsString()
    readonly weight:string;

    @IsOptional()
    @IsString()
    readonly age:string;
    
    @IsOptional()
    @IsString()
    readonly birth:string;
    
    @IsOptional()
    @IsNumber()
    readonly sleeptime:number;

    @IsOptional()
    @IsNumber()
    readonly uptime:number;

    @IsOptional()
    @IsNumber()
    readonly bpm:number;

    @IsOptional()
    @IsNumber()
    readonly step:number;

    
    @IsOptional()
    @IsNumber()
    readonly distanceKM:number;

    @IsOptional()
    @IsNumber()
    readonly calexe:number;

    @IsOptional()
    @IsNumber()
    readonly cal:number;

    @IsOptional()
    @IsNumber()
    readonly alarm_sms:number;

    @IsOptional()
    @IsNumber()
    readonly differtime:number;

    @IsOptional()
    @IsNumber()
    readonly appKey:number;
}