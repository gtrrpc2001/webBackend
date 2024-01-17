import { isDefined } from 'class-validator';
import * as admin from 'firebase-admin';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';
import { staticConfigValue } from 'src/config/staticConfigValue';
import { ConfigService } from '@nestjs/config';
import { wordNational } from 'src/interface/wordNational';
import { alarmController } from './alarmController';

export class firebasenoti{

  static check = 0
  static async PushNoti(tokens:string[],body:ecg_csv_ecgdataDTO,configService:ConfigService): Promise<boolean>{
    try{
      let path = staticConfigValue.getFirebase_sdk(configService).path                    
      let android = require(path)
      let iosPath = staticConfigValue.getFirebase_sdk_ios(configService).path   
      let ios = require(iosPath)          
      let phone = [admin.credential.cert(android,ios)]
      // [admin.credential.cert(android),admin.credential.cert(ios)]                   
      for(var i = 0; i < phone.length; i++){
        await this.setAndroid_Ios(tokens,body,phone[i])
      }          
      return true    
      }catch{           
         return false
      }
}

static async setAndroid_Ios(tokens:string[],body:ecg_csv_ecgdataDTO,phone:any): Promise<boolean>{
  try{
    admin.initializeApp({        
      credential: admin.credential.cert(phone) ,                
    });
    this.check = 0
    return await this.setPushAlarm(tokens,body.arrStatus,body.writetime,body.address,body.bodystate,body.timezone) 
  } catch(E){        
    console.log(E)
    try{
      console.log(admin.app().name)
      if (this.check == 0) admin.app().delete();
      this.check++
      if(this.check == 2) return false;
      return await this.setAndroid_Ios(tokens,body,phone)
    }catch(E){
      console.log(E)
      console.log('alarm 부분 error 확인바람')  
      return false;    
    }    
  }          
}


static async setPushAlarm(tokens:string[],arrStatus:string,time:string,address:string,bodystate:number,timezone:string): Promise<boolean>{
  try{                      
   let title = alarmController.getTitle(arrStatus,bodystate,timezone)
   let body = alarmController.getBody(address,time,timezone)    
   console.log('성공 ' + title)
    await admin
    .messaging()
    .sendEachForMulticast({
      notification: {title,body},
      tokens: tokens,
      android: {priority:'high'},
      apns:{
        payload:{
          aps:{
            sound: bodystate == 1 ? 'heartAttackSound.wav' :'basicsound.wav'
          }                
        }
      }
    })
    .catch((error: any) => {
      console.error(error)
      return false;
    })
    return true;
  }catch(E){
    console.log(E)
    return false;
  }    
}
}