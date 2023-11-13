import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ecg_csv_ecgdataDTO } from "src/dto/ecg_csv_ecgdata.dto";
import { ecg_csv_ecgdata_arrEntity } from 'src/entity/ecg_csv_ecgdata_arr.entity';
import { commonFun } from 'src/clsfunc/commonfunc';
import { MoreThan,LessThan,In } from 'typeorm';
import { commonQuery } from 'src/clsfunc/commonQuery';
import { parentsEntity } from 'src/entity/parents.entity';
import { firebasenoti } from 'src/alarm/firebasenoti';
import { isDefined } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { userEntity } from 'src/entity/user.entity';

@Injectable()
export class ecg_csv_ecgdata_arrService {
  ecg_raws: ecg_csv_ecgdata_arrEntity[] = [];    
  constructor(
    @InjectRepository(ecg_csv_ecgdata_arrEntity) private ecg_csv_ecgdata_arrRepository:Repository<ecg_csv_ecgdata_arrEntity>,
    @InjectRepository(parentsEntity) private parentsRepository:Repository<parentsEntity>,
    @InjectRepository(userEntity) private userRepository:Repository<userEntity>,
    private configService:ConfigService
    ){}

    table = 'ecg_csv_ecgdata_arr'
    select = 'writetime,ecgpacket'
    testSel = 'idx,writetime,ecgpacket,address'


  async gubunKind(body:ecg_csv_ecgdataDTO): Promise<any>{   
    switch(body.kind){
        case "arrEcgData" :
            return this.arrEcgData (body.eq,body.startDate,body.endDate);
        case "arrEcgInsert":
            return this.insertEcgPacket(body);
        case null  :
            return commonFun.converterJson('result = ' + false.toString());
    } 
  }

  async insertEcgPacket(body:ecg_csv_ecgdataDTO): Promise<string>{
    var boolResult = false
    try{    
        const arrInsert = await this.setInsert(body)  
        if(arrInsert){
          const parentsArr = await this.getSelToken(body)           
          boolResult = await this.callPushAlarm(parentsArr,body)
          //console.log(`boolean 값 안받아짐 -- ${boolResult}`)
        }        
        var jsonValue = `result =  ${boolResult}`
        return commonFun.converterJson(jsonValue);
    }catch(E){
        console.log(E)
        return E;
    }  
    
  }

  async callPushAlarm(parentsArr:parentsEntity[],body:ecg_csv_ecgdataDTO):Promise<boolean>{
    try{
      if(parentsArr.length != 0){
        let tokens : string[] = commonFun.getTokens(parentsArr)
        let i = 0;        
        if(tokens.length != 0)
          return await firebasenoti.PushNoti(tokens,body,this.configService)
        else
          return false;
       }
    }catch{
      return false;
    }
    
  }

  async getSelToken(body:ecg_csv_ecgdataDTO) : Promise<parentsEntity[]>{
    try{
      const result = await this.parentsRepository.createQueryBuilder('parents')
      .select('token')
      .where({"eq":body.eq})
      .getRawMany()
      return result;
    }catch(E){
      console.log(E)
    }    
  }

  async setInsert(body:ecg_csv_ecgdataDTO): Promise<boolean>{
    try{
      const result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder()
      .insert()
      .into(ecg_csv_ecgdata_arrEntity)
      .values([{
          eq:body.eq,writetime:body.writetime,bodystate:body.bodystate,ecgpacket:body.ecgPacket,address:body.address
      }])
      .execute()
      console.log('arrinsert')
      return true
    }catch(E){
      console.log(E)
    }    
  }

   async arrEcgData (empid:string,startDate:string,endDate:string): Promise<string>{    
    console.log('arrEcgData')
      try{
        const result = await commonQuery.whereIfResult(this.ecg_csv_ecgdata_arrRepository,this.table,this.select,empid,startDate,endDate);     
        const Value = (result.length != 0 && empid != null)? commonFun.convertCsv(commonFun.converterJson(result)) : commonFun.converterJson('result = ' + '0')
        return Value;    
      } catch(E){
          console.log(E)
      }                 
    
   }
   
   async testArr (idx:number,empid:string,startDate:string,endDate:string): Promise<string>{        
      try{
        let result
        if(startDate != ''){
          result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder('ecg_csv_ecgdata_arr')
                              .select(this.testSel)    
                              .where({"idx":MoreThan(idx)})
                              .andWhere({"eq":empid})
                              .andWhere({"writetime":MoreThan(startDate)})
                              .andWhere({"writetime":LessThan(endDate)})
                              .getRawMany()
        }else{
          result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder()
                              .select(this.testSel)    
                              .where({"idx":MoreThan(idx)})
                              .andWhere({"eq":empid})
                              .andWhere({"writetime":LessThan(endDate)})
                              .getRawMany()
        }                                                   
        
        const Value = (result.length != 0 && empid != null)? commonFun.convertCsv(commonFun.converterJson(result)) : commonFun.converterJson('result = ' + '0')
        console.log(empid)                              
        return Value;    
      } catch(E){
          console.log(E)
      }                 
    
   } 

   async countArr (empid:string,startDate:string,endDate:string): Promise<string>{        
    try{
      
       const result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder('ecg_csv_ecgdata_arr')
                            .select('count(eq) as arrCnt')                                
                            .where({"eq":empid})
                            .andWhere({"writetime":MoreThan(startDate)})
                            .andWhere({"writetime":LessThan(endDate)})
                            .getRawOne()
      let Value = (result.length != 0 && empid != null)? commonFun.converterJson(result) : commonFun.converterJson('result = ' + '0')      
      const info = await commonQuery.getProfile(this.userRepository,parentsEntity,empid)
      if(result.length != 0 && !info.includes('result')){
       const arr = Value?.replace('{','')       
       const profile = info?.replace('}',',')
       Value =  profile + arr
      }
      console.log(Value)                                                    
      return Value;    
      //return Value
    } catch(E){
        console.log(E)
    }                 
  
 } 

 async graphArrCount (empid:string,startDate:string,endDate:string,len:number):Promise<string>{
  try{
      const startLen = commonFun.getStartLen(len)
      console.log(`${startLen} -- ${len}`)
      const result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder('ecg_csv_ecgdata_arr')
                      .select(`MID(writetime,${startLen},2) writetime,COUNT(ecgpacket) count`)
                      .where({"eq":empid})
                      .andWhere({"writetime":MoreThan(startDate)})
                      .andWhere({"writetime":LessThan(endDate)})
                      .groupBy(`MID(writetime,${startLen},2)`)
                      .having('COUNT(ecgpacket)')                      
                      .getRawMany()
      const Value = (result.length != 0 && empid != null)? commonFun.converterJson(result) : commonFun.converterJson('result = ' + '0')                   
      return Value
  }catch(E){
    console.log(E)
  }
 }
 
}