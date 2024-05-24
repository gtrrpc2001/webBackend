import {Module } from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {SmsService} from '../service/sms.service';
import { smsController } from 'src/controller/sms.controller';
import { smsEntity } from 'src/entity/sms.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CachConfigService } from 'src/service/cache.service';
 


@Module({
  imports: [
    TypeOrmModule.forFeature([smsEntity,UserEntity]),    
    CacheModule.registerAsync({isGlobal:true, useClass:CachConfigService,inject:[CachConfigService]})
  ],
  providers: [
    SmsService
  ],
    controllers:[smsController]
})
export class smsModule {}
