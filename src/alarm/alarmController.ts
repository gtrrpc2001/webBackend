import { wordNational } from 'src/interface/wordNational';
import { isDefined } from 'class-validator';
import { parentsEntity } from 'src/entity/parents.entity';
import { ConfigService } from '@nestjs/config';
import { firebasenoti } from './firebasenoti';
import { commonFun } from 'src/clsfunc/commonfunc';
import { Repository } from 'typeorm';

export class alarmController{
  static getBody(address:string,time:string,timezone:string):string{
    switch(true){
      case timezone?.includes('US'):
        return `${isDefined(address) ? 'User Location:' + address : ""} time: ${this.getTime(time)}`
      case timezone?.includes('MO'):
        return `${isDefined(address) ? '使用者位置:' + address : ""} 时间: ${this.getTime(time)}`
      default :          
        return `${isDefined(address) ? '발생주소:' + address : ""} 시간: ${this.getTime(time)}`
    }
  }
  
  static getBleTitle(timezone:string):string{

    switch(true){
      case timezone?.includes('US'):
        return `bluetooth of user`
      case timezone?.includes('MO'):
        return `用户蓝牙`          
      default :
        return `사용자 블루투스`
    }                                                 
  }

  static getBleBody(activity:string,time:string,timezone:string):string{
    const check = this.getBleActivityCheck(activity)
    switch(true){
      case timezone?.includes('US'):
        return `${time} - ${activity}`
      case timezone?.includes('MO'):
        return `${time} - ${check ? '连接' : '断开'}`
      default :      
        return `${time} - ${check ? '연결' : '해제'}`
    }                                                 
  }

  static getBleActivityCheck(activity:string):boolean{
    return !activity.includes('Dis')
  }
  
      static getTitle(arrStatus:string,bodystate:number,timezone:string):string{

        switch(true){
          case timezone?.includes('US'):
            return `${bodystate == 1 ? "emergency!! Heart attack issue" : ` ${this.getENGStatus(arrStatus)}`} detected!`
          case timezone?.includes('MO'):
            return `${bodystate == 1 ? "紧急状况!!" : ` ${this.getChStatus(arrStatus)}`}`
          default :
            return `${bodystate == 1 ? "긴급!! 심장마비" : this.getStatus(arrStatus)} 발생!`
        }                                                 
      }
  
      static getStatus(arrStatus:string): string{
        switch(arrStatus){
          case "slow":
            return "느린맥박"  
          case "fast":
            return "빠른맥박"  
          case "irregular":
           return  "연속적인 비정상맥박"  
        default :
          return "비정상맥박"
        }
      }

      static getENGStatus(arrStatus:string):string{
        switch(arrStatus){          
          case "irregular":
           return  "Heavy I.H.R."  
        case "arr" :
          return "I.H.R."
        case "slow":
            return "Slow heart rhythm"  
        case "fast":
            return "Fast heart rhythm"    
        }
      }

      static getChStatus(arrStatus:string):string{
        switch(arrStatus){          
          case "irregular":
           return  "检测到心律不齐!"  
        case "arr" :
          return "检测到心律不规则!"
        case "slow":
            return " 检测到心率偏低!"  
        case "fast":
            return "检测到心率偏高!"    
        }
      }

      static getTime(time:string):string{    
        let resultTime = this.splitTime(time)
        console.log(`여기테스트---${resultTime}`)
        return resultTime
      }

      static splitTime(time:string):string{
        let resultTime:string[]
        switch(time.length){
          case 19 :
            resultTime = time.split(' ')
            return resultTime[1]
          default :
            let afterTimes = time.split('T')
            resultTime = afterTimes[1].split('.')
            return resultTime[0]
        } 
      }

      static async getSelToken(tokenRepository:Repository<parentsEntity>,eq:string) : Promise<parentsEntity[]>{
        try{
          const result = await tokenRepository.createQueryBuilder('parents')
          .select('token')
          .where({"eq":eq})
          .getRawMany()
          return result;
        }catch(E){
          console.log(E)
        }    
      }

      static async callPushAlarm(parentsArr:parentsEntity[],body:any,configService:ConfigService,ble:boolean=false):Promise<boolean>{
        try{
          if(parentsArr.length != 0){
            let tokens : string[] = commonFun.getTokens(parentsArr)
            let i = 0;                
            if(tokens.length != 0)
              return await firebasenoti.PushNoti(tokens,body,configService,ble)
            else
              return false;
           }
        }catch{
          return false;
        }    
      }
}