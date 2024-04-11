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
    @IsString()
    readonly sleeptime:string;

    @IsOptional()
    @IsString()
    readonly uptime:string;

    @IsOptional()
    @IsString()
    readonly bpm:string;

    @IsOptional()
    @IsString()
    readonly step:string;

    
    @IsOptional()
    @IsString()
    readonly distanceKM:string;

    @IsOptional()
    @IsString()
    readonly calexe:string;

    @IsOptional()
    @IsString()
    readonly cal:string;

    @IsOptional()
    @IsString()
    readonly alarm_sms:string;

    @IsOptional()
    @IsString()
    readonly differtime:number;

    @IsOptional()
    @IsNumber()
    readonly appKey:number;
}