import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,MoreThanOrEqual,LessThanOrEqual,MoreThan,LessThan} from 'typeorm';
import { commonFun } from "src/clsfunc/commonfunc";
import { ecg_byteEntity } from 'src/entity/ecg_byte.entity';
import { ecg_byteDTO } from 'src/dto/ecg_byte.dto';
import { ecg_csv_ecgdataEntity } from 'src/entity/ecg_csv_ecgdata.entity';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';

@Injectable()
export class ecg_byteService {  
  constructor(
    @InjectRepository(ecg_byteEntity) private ecg_byteRepository:Repository<ecg_byteEntity>,
  @InjectRepository(ecg_csv_ecgdataEntity) private ecg_csv_ecgdataRepository:Repository<ecg_csv_ecgdataEntity>,
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

    async getTest(empid:string,startDate:string,endDate:string): Promise<string>{        
        try{            
           const result = await this.ecg_byteRepository.createQueryBuilder()
                                .select('writetime,ecgpacket')                                
                                .where({"eq":empid})
                                .andWhere({"writetime":MoreThanOrEqual(startDate)})
                                .andWhere({"writetime":LessThanOrEqual(endDate)})                                
                                .getRawMany()
            const value = await this.getChangeValue(result)                          
          return commonFun.converterJson(value);    
        } catch(E){
            console.log(E)
        }         
    }

    async getChangeValue(result: any[]){
     return result.map(d => {
        const {writetime,ecgpacket} = d                                     
        const ecg = commonFun.getEcgNumber(ecgpacket)
        return {writetime,ecg}
    });
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

 async getEcg (empid:string,startDate:string): Promise<number[]>{        
  try{
     const result = await this.ecg_csv_ecgdataRepository.createQueryBuilder('ecg_csv_ecgdata')
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
     const result = await this.ecg_byteRepository.createQueryBuilder('ecg_csv_ecgdata')
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

async getGraphEcgValue(empid:string,startDate:string,endDate:string): Promise<number[]>{        
  try{
     const result = await this.ecg_byteRepository.createQueryBuilder('ecg_csv_ecgdata')
                          .select('ecgpacket')                                
                          .where({"eq":empid})
                          .andWhere({"writetime":MoreThanOrEqual(startDate)})
                          .andWhere({"writetime":LessThanOrEqual(endDate)})                                
                          .getRawMany()                                               
    const changeEcg:number[] = await this.getEcgChangeValue(result)                              
    return changeEcg;    
  } catch(E){
      console.log(E)
  }                 

}
}


