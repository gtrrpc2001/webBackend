import {Module } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {SmsService} from '../service/sms.service';
import { smsController } from 'src/controller/sms.controller';
import { smsEntity } from 'src/entity/sms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from 'src/entity/user.entity';
 


@Module({
  imports: [
    TypeOrmModule.forFeature([smsEntity,userEntity]),    
    CacheModule.register({ 
    ttl: 5000, // 시간(밀리초)
    max: 1000 , // 캐시에 담길 최대 데이터 개수
    isGlobal: true, // 캐시모듈을 전역설정
}),
  ],
  providers: [
    SmsService
  ],
    controllers:[smsController]
})
export class smsModule {}
