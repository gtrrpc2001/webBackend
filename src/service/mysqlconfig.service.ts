import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MySqlMslConfigService implements TypeOrmOptionsFactory{
    constructor(private configService:ConfigService){}

    
    createTypeOrmOptions(): TypeOrmModuleOptions {
        //console.log(this.configService.get<string>('NAME'))
        return {
            type: 'mysql',
            host:this.configService.get<string>('HOST'),
            port:+this.configService.get<number>('PORT'),
            username:this.configService.get<string>('NAME'),
            password:this.configService.get<string>('PASSWORD'), //this.configService.get<string>('ACCESS'),
            database:this.configService.get<string>('DATABASE'),
            entities:['dist/entity/*.entity.{js,ts}'],
            synchronize: false,
            //timezone:'Asia/Seoul',
            dateStrings: true
        }
    }

}