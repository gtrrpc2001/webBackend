import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ecg_csv_ecgdataEntity } from "src/entity/ecg_csv_ecgdata.entity";
import { ecg_csv_ecgdataDTO } from "src/dto/ecg_csv_ecgdata.dto";
import { commonFun } from 'src/clsfunc/commonfunc';
import { commonQuery } from 'src/clsfunc/commonQuery';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';
import { MoreThanOrEqual,LessThan,LessThanOrEqual } from 'typeorm';


@Injectable()
export class ecg_csv_ecgdataService {
  ecg_raws: ecg_csv_ecgdataEntity[] = [];    
  constructor(@InjectRepository(ecg_csv_ecgdataEntity) private ecg_csv_ecgdataRepository:Repository<ecg_csv_ecgdataEntity>,
  @InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>
  ){}

  table = 'ecg_csv_ecgdata'
  select = 'eq,writetime,bpm,ecgpacket'

  async gubunKind(body:ecg_csv_ecgdataDTO): Promise<any>{   
    switch(body.kind){
        case "ecgPacket" :
            return this.ecgPacket(body.eq,body.startDate,body.endDate);
        case "ecgdataInsert":
            return this.insertEcgPacket(body);
        case null  :
            return commonFun.converterJson('result = ' + false.toString());
    } 
  }

  async insertEcgPacket(body:ecg_csv_ecgdataDTO): Promise<string>{
    var boolResult = false
    try{          
        const result = await this.setInsert(body)
        
        if(result){            
            boolResult = await this.updateLast(body)
        }
        console.log('ecgdatainsert')
        var jsonValue = 'result = ' + boolResult.toString()
        return commonFun.converterJson(jsonValue);
    }catch(E){
        //console.log(E) 
        return E;
    } 
  }

  async updateLast(body:ecg_csv_ecgdataDTO): Promise<boolean>{    
try{        
    const result = await this.ecg_raw_history_lastRepository.createQueryBuilder()
    .update(ecg_raw_history_lastEntity)        
    .set({ "writetime":body.writetime,"bpm":body.bpm})
    .where({"eq":body.eq})
    .execute()        
    console.log('updateLast')
    return true;
}catch(E){
    //console.log(E) 대기열 문제 가끔 발생
    return false;
}             
}

  async setInsert(body:ecg_csv_ecgdataDTO): Promise<boolean>{
    try{        
        const result = await this.ecg_csv_ecgdataRepository.createQueryBuilder()
        .insert()
        .into(ecg_csv_ecgdataEntity)
        .values([{
            eq:body.eq,writetime:body.writetime,timezone:body.ecgtimezone,bpm:body.bpm,ecgpacket:body.ecgPacket
        }])
        .execute()
        return true
    }catch(E){
        console.log(E)
        return false
    }
  }

  async getEcg (empid:string,startDate:string): Promise<number[]>{        
    try{
       const result = await this.ecg_csv_ecgdataRepository.createQueryBuilder('ecg_csv_ecgdata')
                            .select('ecgpacket')                                
                            .where({"eq":empid})
                            .andWhere({"writetime":MoreThanOrEqual(startDate)})
                            .getRawMany()
      const changeEcg:number[] = await commonFun.getEcgNumArr(result)      
      const Value = (result.length != 0 && empid != null)? changeEcg : [0]
      console.log(empid)                                                    
      return Value;    
    } catch(E){
        console.log(E)
    }                 
  
 }

   async ecgPacket(empid:string,startDate:string,endDate:string): Promise<string>{    
    console.log('ecgPacket')       
    const result = await commonQuery.whereIfResult(this.ecg_csv_ecgdataRepository,this.table,this.select,empid,startDate,endDate);  
    const Value = (result.length != 0 && empid != null)? commonFun.convertCsv(commonFun.converterJson(result)) : commonFun.converterJson('result = ' + '0')
    return Value;    
    } 

    async getEcgTime(empid:string,startDate:string,endDate:string): Promise<string[]>{        
        try{
           const result = await this.ecg_csv_ecgdataRepository.createQueryBuilder('ecg_csv_ecgdata')
                                .select('Mid(writetime,12,4) writetime')                                
                                .where({"eq":empid})
                                .andWhere({"writetime":MoreThanOrEqual(startDate)})
                                .andWhere({"writetime":LessThan(endDate)})
                                .groupBy('Mid(writetime,12,4)')
                                .getRawMany()                    
          console.log(empid)                                                    
          return result;    
        } catch(E){
            console.log(E)
        }                 
      
     }

     async getGraphEcgChangeValue(result: ecg_csv_ecgdataEntity[]):Promise<{ecg: number[];writetime: string;}[]>{
      let ecgArr = result.map(d => {
         const {ecgpacket} = d
         const after = ecgpacket?.replaceAll(';','')
         const changeEcg:number[] =[]                                
          after?.split('][').forEach((data:string) => {
                  const sliceEcg = data?.replaceAll('[','')?.replaceAll(']','')?.split(',')
                  sliceEcg.forEach(e => {                            
                  changeEcg.push(Number(e))
                  
              })
          })         
         return {ecg:changeEcg,writetime:d.writetime} 
     });
      return ecgArr;
    }

     async getGraphEcgValue(empid:string,startDate:string,endDate:string): Promise<any>{        
        try{
           const result = await this.ecg_csv_ecgdataRepository.createQueryBuilder('ecg_csv_ecgdata')
                                .select('ecgpacket,Mid(writetime,15,19) as writetime')                                
                                .where({"eq":empid})
                                .andWhere({"writetime":MoreThanOrEqual(startDate)})
                                .andWhere({"writetime":LessThanOrEqual(endDate)})                                
                                .getRawMany()                                               
          const changeEcg = await this.getGraphEcgChangeValue(result)                             
          return changeEcg;    
        } catch(E){
            console.log(E)
        }                 
      
     }
}


