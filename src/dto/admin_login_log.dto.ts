import { IsNumber,IsOptional,IsString } from "class-validator";


export class admin_login_logDTO{
    @IsString()
    @IsOptional()
    readonly kind: string;

    @IsString()
    @IsOptional()
    readonly gubun:string;

    @IsString()
    @IsOptional()
    readonly phone:string;
    
    @IsString()
    @IsOptional()
    readonly serial:string;
    
    @IsString()    
    readonly eq:string;
    
    @IsString()
    @IsOptional()
    readonly eqname:string;

    @IsString()
    @IsOptional()
    readonly timezone:string;

    @IsString()    
    readonly writetime:string;
    
    @IsString()    
    readonly activity:string;
}