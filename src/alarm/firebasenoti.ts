import { isDefined } from 'class-validator';
import * as admin from 'firebase-admin';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';
import { staticConfigValue } from 'src/config/staticConfigValue';
import { ConfigService } from '@nestjs/config';
import { wordNational } from 'src/interface/wordNational';
import { alarmController } from './alarmController';

export class firebasenoti{

    static async PushNoti(tokens:string[],body:ecg_csv_ecgdataDTO,configService:ConfigService): Promise<boolean>{
        try{
            let path = staticConfigValue.getFirebase_sdk(configService).path
            let serAccount = require(path)       
            admin.initializeApp({
                credential: admin.credential.cert(serAccount),
              });
          }catch(E){
             console.log(E)
          }          
        return await this.setPushAlarm(tokens,body.arrStatus,body.writetime,body.address,body.bodystate,body.timezone) 
    }

   static async setPushAlarm(tokens:string[],arrStatus:string,time:string,address:string,bodystate:number,timezone:string): Promise<boolean>{
    try{      
         
      const interfaceTitle = alarmController.getTitle(arrStatus,bodystate,timezone)
      const interfaceBody = alarmController.getBody(address,time)
      const nationalCheck = !timezone?.includes('US')
      let title = nationalCheck ? interfaceTitle.ko : interfaceTitle.en
      let body = nationalCheck?  interfaceBody.ko : interfaceBody.en

      console.log(interfaceTitle.en + '여기;')

       await admin
       .messaging()
       .sendEachForMulticast({
         notification: {title,body},
         tokens: tokens,
         android: {priority:'high'},
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