import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { admin_login_logDTO } from 'src/dto/admin_login_log.dto';
import { app_bleEntity } from 'src/entity/app_ble.entity';
import { ConfigService } from '@nestjs/config';
import {alarmController} from 'src/alarm/alarmController';
import { parentsEntity } from 'src/entity/parents.entity';

@Injectable()
export class app_bleService {  
  constructor(
    @InjectRepository(app_bleEntity) private app_bleRepository:Repository<app_bleEntity>,
    @InjectRepository(parentsEntity) private parentsRepository:Repository<parentsEntity>,
    private configService:ConfigService
  ){}
 
  async LogInsert(body:admin_login_logDTO): Promise<any>{   
    try{        
        var boolResult = false
        const result = await this.app_bleRepository.createQueryBuilder()
                        .insert()
                        .into(app_bleEntity)
                        .values([{
                            eq:body.eq,phone:body.phone,writetime:body.writetime,activity:body.activity,serial:body.serial
                        }])
                        .execute()        
        
        const parentsArr = await alarmController.getSelToken(this.parentsRepository,body.eq)
        boolResult = await alarmController.callPushAlarm(parentsArr,body,this.configService,true) 
        
        var jsonValue = 'result = ' + boolResult.toString()
        console.log('app_log - insert')
        return jsonValue;
    }catch(E){
        console.log(E)
        return E;
    }
  }  
}