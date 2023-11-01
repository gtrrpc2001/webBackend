import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userDTO } from '../dto/user.dto';
import { commonFun } from 'src/clsfunc/commonfunc';
import { userEntity } from 'src/entity/user.entity';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';
import { parentsEntity } from 'src/entity/parents.entity';
import { isDefined } from 'class-validator';
import { commonQuery } from 'src/clsfunc/commonQuery';

@Injectable()
export class userService {
  ecg_raws: userEntity[] = [];
  constructor(
  @InjectRepository(userEntity) private userRepository:Repository<userEntity>,
  @InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>,
  @InjectRepository(parentsEntity) private parentsRepository:Repository<parentsEntity>
  ){}
  

  async gubunKind(body:userDTO): Promise<any>{   
    switch(body.kind){
        case "checkIDDupe" :
            return this.checkIDDupe(body.eq);
        case "checkLogin" :
            return this.checkLogin(body.eq,body.password,null,null)
        case "getProfile" :
            return this.getProfile(body.eq)
        case "checkReg" :
            return this.checkReg(body)
        case "setProfile" :
            return this.setProfile(body)
        case "updatePWD" :
            return this.updatePWD(body)
        case null  :
            return commonFun.converterJson('result = ' + false.toString());

    } 
    
  }

  async setProfile(body:userDTO): Promise<string>{
    var boolResult = false
    try{        
        const result = await this.userRepository.createQueryBuilder()
        .update(userEntity)        
        .set({
            "eqname":body.eqname,"email":body.email,"phone":body.phone,"sex":body.sex,"height":body.height,"weight":body.weight,
            "age":body.age,"birth":body.birth,"sleeptime":body.sleeptime,"uptime":body.uptime,"bpm":body.bpm,
            "step":body.step,"distanceKM":body.distanceKM,"cal":body.cal,"calexe":body.calexe,
            "alarm_sms":body.alarm_sms,"differtime":body.differtime
        })
        .where({"아이디":body.eq})
        .execute()
        boolResult = true
        var jsonValue = 'result = ' + boolResult.toString()
        console.log('setProfile')
        return commonFun.converterJson(jsonValue);
    }catch(E){
        console.log(E)
        return E;
    }
  }

  async checkReg(body:userDTO): Promise<string>{
    var boolResult = false
    try{    
       const insertChecked =  await this.setInsert(body)
        if(insertChecked){          
          const datatime = commonFun.getWritetime()
          const result = await this.ecg_raw_history_lastRepository.createQueryBuilder()
           .insert()
           .into(ecg_raw_history_lastEntity)
           .values([{
                eq:body.eq,eqname:body.eqname,writetime:datatime
           }])
           .execute()

           console.log(`${body.eq}--${body.eqname}`)
            boolResult = true;
        }
        var jsonValue = 'result = ' + boolResult.toString()
        return commonFun.converterJson(jsonValue);
    }catch(E){
        console.log(E)
        return E;
    }  
    
  }  

  async setInsert(body:userDTO):Promise<boolean>{
    try{
        const result = await this.userRepository.createQueryBuilder()
        .insert()
        .into(userEntity)
        .values([{
            eq:body.eq,password:body.password,eqname:body.eqname,email:body.email,phone:body.phone,sex:body.sex,
            height:body.height,weight:body.weight,age:body.age,birth:body.birth,sleeptime:body.sleeptime,
            uptime:body.uptime,bpm:body.bpm,step:body.step,distanceKM:body.distanceKM,
            cal:body.cal,calexe:body.calexe,alarm_sms:body.alarm_sms,differtime:body.differtime
        }])
        .execute()        
        return true
    }catch(E){
        console.log(E)
    }    
  }
    
    async getProfile(empid:string): Promise<string>{
        //프로필정보 -- 보호자 번호까지 받아옴    
        return await commonQuery.getProfile(this.userRepository,parentsEntity,empid)
           
      }

      async checkLogin(empid:string,pw:string,phone:string,token:string): Promise<string>{
        var boolResult = false
        if(isDefined(phone)){
            boolResult = await this.CheckLoginGuardianApp(empid,pw,phone,token)
        }else{
            boolResult = await this.userCheckLogin(empid,pw)        
        }
        var jsonValue = 'result = ' + boolResult.toString()
        console.log(`${empid}------${pw}-----${jsonValue}`)    
        return commonFun.converterJson(jsonValue);
        } 
        
        async userCheckLogin(empid:string,pw:string):Promise<boolean>{
            try{
             const result = await this.userRepository.createQueryBuilder('user')
             .select('eq,password')    
             .where({"eq":empid}).andWhere({"password":pw})    
             .getRawMany() 
             if(result.length != 0 && (empid != null && pw != null)){        
                 return true;
             }else{
                 return false;
             } 
            }catch(E){
              console.log(E)
              return false;
            }     
           }

           async CheckLoginGuardianApp(empid:string,pw:string,phone:string,token: string): Promise<boolean>{
            // 보호자앱 phone 번호까지 로그인 할떄 체크 후 token update    
            let boolResult = false
            if(isDefined(empid) && isDefined(pw) && isDefined(phone)){    
             boolResult = await this.guardianLoginCheck(empid,pw,phone)
             console.log(`보호자앱 로그인 체크 ${boolResult}`)  
             
             if(boolResult && isDefined(token)){
                const parentsResult = await this.tokenUpdateGuardianApp(empid,phone,token)
                return parentsResult
             }   
            }
            return boolResult
          }

          async guardianLoginCheck(empid:string,pw:string,phone:string):Promise<boolean>{
            try{
                let select = 'b.eq,b.phone,a.password'
                let condition = `a.eq = b.eq and b.phone = ${phone}`
                const result = await this.userRepository.createQueryBuilder('a')
                .select(select)
                .leftJoin(parentsEntity,'b',condition)
                .where({"eq":empid}).andWhere({"password":pw})
                .getRawOne()
        
                if(!isDefined(result))
                    return false;
        
                return result.length != 0 ? true : false
            }catch(E){
                console.log(E)
                return false;
            }    
          }

          async tokenUpdateGuardianApp(empid:string,phone:string,token: string): Promise<boolean>{
            try{               

                 await this.parentsRepository.createQueryBuilder()
                 .update(parentsEntity)
                 .set({token:token})
                 .where({"eq":empid}).andWhere({"phone":phone})
                 .execute()
                 


                 return true;
            }catch(E){
                 console.log(E)
                 return false;
            }    
           }

  async checkIDDupe(eq:string): Promise<string>{
    var boolResult = false    
    console.log('checkIDDupe') 
    const result: userEntity[] = await this.userRepository.createQueryBuilder('user')
    .select('eq')    
    .where({"eq":eq})    
    .getRawMany()
    if(result.length == 0 && eq != null){        
        boolResult = true
    }
    
    var jsonValue = 'result = ' + boolResult.toString()
    
    return commonFun.converterJson(jsonValue);
    }

    async findID(name:string,phone:string,birth:string): Promise<string>{
        var boolResult = false    
        console.log('checkIDDupe') 
        const result: userEntity[] = await this.userRepository.createQueryBuilder('user')
        .select('eq')    
        .where({"eqname":name}).andWhere({"phone":phone}).andWhere({"birth":birth})    
        .getRawMany()
        if(result.length != 0 && (name != "" && phone != "" && birth != "")){
            return commonFun.converterJson(result);
        }else{
            var jsonValue = 'result = ' + boolResult.toString()
            return commonFun.converterJson(jsonValue);
        }              
    }

    async updatePWD(body:userDTO): Promise<string>{
        var boolResult = false
    try{        
        const result = await this.userRepository.createQueryBuilder()
        .update(userEntity)        
        .set({ "password":body.password})
        .where({"eq":body.eq})
        .execute()
        boolResult = true
        var jsonValue = 'result = ' + boolResult.toString()
        console.log('updatePWD')
        return commonFun.converterJson(jsonValue);
    }catch(E){
        console.log(E)
        return E;
    }             
    }
    
}

