import { wordNational } from 'src/interface/wordNational';
import { isDefined } from 'class-validator';

export class alarmController{
    static getBody(address:string,time:string):wordNational{
        const koBody = `${isDefined(address) ? '발생주소:' + address : ""} 시간: ${this.getTime(time)}`
        const enBody = `${isDefined(address) ? 'User Location:' + address : ""} time: ${this.getTime(time)}`
       let bodyNational:wordNational = {ko:koBody,en:enBody,ja:null,ch:null}        
       return bodyNational
      }
  
  
      static getTitle(arrStatus:string,bodystate:number,timezone:string):wordNational{                
        let kTitle = `${bodystate == 1 ? "긴급!! 심장마비" : this.getStatus(arrStatus)} 발생!`
        let eTitle = `${bodystate == 1 ? "emergency!! Heart attack issue" : ` ${this.getENGStatus(arrStatus)}`} detected!`
        let translate:wordNational = {en:eTitle,ko:kTitle,ja:null,ch:null}
        console.log(eTitle + '여기 1')
        return translate
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
}