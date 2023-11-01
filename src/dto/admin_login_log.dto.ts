import { IsNumber,IsOptional,IsString } from "class-validator";


export class admin_login_logDTO{
    @IsString()
    readonly kind: string;

    @IsString()
    @IsOptional()
    readonly gubun:string;
    
    @IsString()    
    readonly eq:string;
    
    @IsString()
    @IsOptional()
    readonly eqname:string;

    @IsString()    
    readonly writetime:string;
    
    @IsString()    
    readonly activity:string;
}