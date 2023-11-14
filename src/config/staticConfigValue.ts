import { ConfigService } from '@nestjs/config';

export class staticConfigValue{
    static getFirebase_sdk = (configService:ConfigService) =>{

        return {path: configService.get<string>('FIREBASESDKPATH')}
    }

    static getFirebase_sdk_ios = (configService:ConfigService) => { 
                
        return {
           path: configService.get<string>('FIREBASESKDIOSPATH')
        }
    }
}
    
