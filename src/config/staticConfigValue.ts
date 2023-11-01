import { ConfigService } from '@nestjs/config';

export class staticConfigValue{
    static getFirebase_sdk = (configService:ConfigService) =>{

        return {path: configService.get<string>('FIREBASESDKPATH')}
    }
}
    
