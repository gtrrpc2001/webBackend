import { IsNumber,IsString } from "class-validator";


export class appversionDTO{
    
    @IsString()    
    readonly app:string;        

    @IsNumber()    
    readonly versioncode:number;
}