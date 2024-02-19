import { isDefined } from 'class-validator';
import * as admin from 'firebase-admin';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';
import { staticConfigValue } from 'src/config/staticConfigValue';
import { ConfigService } from '@nestjs/config';
import { alarmController } from './alarmController';
import { iosNoti } from './iosNoti';
import { androidNoti } from './androidNoti';

export class firebasenoti{

  static initializeApp = (kind:any) => {          
    admin.initializeApp({        
      credential: admin.credential.cert(kind),                
    });
}

static async PushNoti(tokens:string[],body:ecg_csv_ecgdataDTO,configService:ConfigService): Promise<boolean>{
    try{
      const names = ["IOS","ANDROID"]
      for(var name of names){        
        const bool = await this.setKindBrand(name,configService)
        if(bool) await this.setPushAlarm(tokens,body.arrStatus,body.writetime,body.address,body.bodystate,body.timezone) 
      }
      return true
    } catch(E){        
      console.log(E)
      console.log('alarm error')                  
      return false
    }          
}

static setKindBrand = async(name:string,configService:ConfigService):Promise<boolean> => {
  try{
    switch(name){
      case "ANDROID" :
        await androidNoti.ANDROID(configService,admin)
        break;
      default :      
        await iosNoti.IOS(configService,admin);        
        break;
    }

    return true;
  } catch(E){
    console.log(E)
    return false
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