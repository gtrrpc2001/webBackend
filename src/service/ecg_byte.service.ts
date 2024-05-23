import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,MoreThanOrEqual,LessThanOrEqual,MoreThan,LessThan} from 'typeorm';
import { commonFun } from "../clsfunc/commonfunc";
import { ecg_byteEntity } from '../entity/ecg_byte.entity';
import { ecg_byteDTO } from '../dto/ecg_byte.dto';
import { ecg_raw_history_lastEntity } from '../entity/ecg_raw_history_last.entity';

@Injectable()
export class ecg_byteService {  
  constructor(
    @InjectRepository(ecg_byteEntity) private ecg_byteRepository:Repository<ecg_byteEntity>,
  @InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>
  ){}

  table = 'ecg_csv_ecgdata'
  select = 'eq,writetime,bpm,ecgpacket'

  async gubunKind(body:ecg_byteDTO): Promise<any>{   
    switch(body.kind){        
        case "ecgByteInsert":
            return this.insertEcgPacket(body);
        case null  :
            return commonFun.converterJson('result = ' + false.toString());
    } 
  }

  async insertEcgPacket(body:ecg_byteDTO): Promise<string>{
    var boolResult = false
    try{          
      // console.log(body.ecgPacket)
        const result = await this.setInsert(body)
        
        if(result){            
            boolResult = await this.updateLast(body)
        }
        console.log('ecgByteinsert')
        var jsonValue = 'result = ' + boolResult.toString()        
        return commonFun.converterJson(jsonValue);
    }catch(E){
        //console.log(E) 
        return E;
    } 
  }  

  async updateLast(body:ecg_byteDTO): Promise<boolean>{    
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

  async setInsert(body:ecg_byteDTO): Promise<boolean>{
    try{
         const buffer = commonFun.getEcgBuffer(body.ecgPacket);         
        // ecgpacket:() => `HEX(AES_ENCRYPT('${body.ecgPacket}','${key}'))`
        const result = await this.ecg_byteRepository.createQueryBuilder()
        .insert()
        .into(ecg_byteEntity)
        .values([{
            eq:body.eq,writetime:body.writetime,timezone:body.timezone,bpm:body.bpm,
            ecgpacket:buffer           
        }])
        .execute()
        return true
    }catch(E){
        console.log(E)
        return false
    }
  }  

  async getEcgChangeValue(result: any[]):Promise<number[]>{
    let ecgArr:number[] = []    
    result.map(d => {
       const {ecgpacket} = d                                     
       const ecg = commonFun.getEcgNumber(ecgpacket)
       ecg.map(d => {
         ecgArr.push(d)
       })      
   });
    return ecgArr;
 }

 async getGraphEcgChangeValue(result: ecg_byteEntity[]):Promise<{ecg: number[];writetime: string;}[]>{
  let ecgArr = result.map(d => {
     const {ecgpacket} = d                                     
     const ecg = commonFun.getEcgNumber(ecgpacket)
     return {ecg:ecg,writetime:d.writetime} 
 });
  return ecgArr;
}  

 async getEcg (empid:string,startDate:string): Promise<number[]>{        
  try{
     const result = await this.ecg_byteRepository.createQueryBuilder('ecg_byte')
                          .select('ecgpacket')                                
                          .where({"eq":empid})
                          .andWhere({"writetime":MoreThanOrEqual(startDate)})
                          .getRawMany()
    const changeEcg:number[] = await this.getEcgChangeValue(result)
    const Value = (result.length != 0 && empid != null)? changeEcg : [0]
    console.log(empid)                                                    
    return Value;    
  } catch(E){
      console.log(E)
  }                 

}

 async getEcgTime(empid:string,startDate:string,endDate:string): Promise<string[]>{        
  try{
     const result = await this.ecg_byteRepository.createQueryBuilder('ecg_byte')
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

async getGraphEcgValue(empid:string,startDate:string,endDate:string): Promise<any>{        
  try{
     const result:ecg_byteEntity[] = await this.ecg_byteRepository.createQueryBuilder('ecg_byte')
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


