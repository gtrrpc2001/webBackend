import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { ecg_csv_ecgdataDTO } from "src/dto/ecg_csv_ecgdata.dto";
import { ecg_csv_bpmdayEntity } from 'src/entity/ecg_csv_bpmday.entity';
import { commonFun } from 'src/clsfunc/commonfunc';
import { commonQuery } from 'src/clsfunc/commonQuery';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';
import { ecg_csv_ecgdata_arrEntity } from 'src/entity/ecg_csv_ecgdata_arr.entity';

@Injectable()
export class ecg_csv_bpmdayService {
  ecg_raws: ecg_csv_bpmdayEntity[] = [];    
  constructor(@InjectRepository(ecg_csv_bpmdayEntity) private ecg_csv_bpmdayRepository:Repository<ecg_csv_bpmdayEntity>,
  @InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>,
  @InjectRepository(ecg_csv_ecgdata_arrEntity) private ecg_csv_ecgdata_arrRepository:Repository<ecg_csv_ecgdata_arrEntity>
  ){}

    table = 'ecg_csv_bpmday'
    select = 'idx,eq,writetime,timezone,bpm,temp,hrv'


  async gubunKind(body:ecg_csv_ecgdataDTO): Promise<any>{   
    switch(body.kind){
        case "BpmData" :
            return this.BpmData (body.eq,body.startDate,body.endDate);
        case "BpmDataInsert":    
            return this.InsertBpmData(body);
        case null  :
            return commonFun.converterJson('result = ' + false.toString());
    } 
  }
  
  async InsertBpmData(body:ecg_csv_ecgdataDTO): Promise<string> {
    var boolResult = false    
    console.log(`InsertBpmData --- ${body.writetime}`)
    try{
        const result = await this.setInsert(body)
        if(result){
         boolResult = await this.updateLast(body)
        }
        
        var jsonValue = 'result = ' + boolResult.toString()
        return commonFun.converterJson(jsonValue);
    }catch(E){
        console.log(E)
        return E;
    }  
  }

  async updateLast(body:ecg_csv_ecgdataDTO): Promise<boolean>{    
    try{   
      console.log(`${body.timezone}`)     
        const timezone = body.timezone.includes('+') ? body.timezone : (body.timezone.includes('-') ? body.timezone : ('+' + body.timezone).trim())
        const result = await this.ecg_raw_history_lastRepository.createQueryBuilder()
        .update(ecg_raw_history_lastEntity)        
        .set({"writetime":body.writetime ,"timezone":timezone ,"hrv":body.hrv,"cal":body.cal,"calexe":body.calexe,"step":body.step,
          "distanceKM":body.distanceKM,"arrcnt":body.arrcnt,"temp":body.temp,"battery":body.battery,
          "isack":body.isack,"log":body.log
          })
        .where({"eq":body.eq})
        .execute()    
        console.log('updateLast')
        return true;
    }catch(E){
        console.log(E)
        return false;
    }             
  }

  async setInsert(body:ecg_csv_ecgdataDTO):Promise<boolean>{
    try{
      const result = await this.ecg_csv_bpmdayRepository.createQueryBuilder()
      .insert()
      .into(ecg_csv_bpmdayEntity)
      .values([{
          eq:body.eq,timezone:body.timezone,writetime:body.writetime,bpm:body.bpm,
          temp:body.temp,hrv:body.hrv
      }])
      .execute()
      return true
    }catch(E){
      console.log(E)
      return false
    }   
  }

   async BpmData (empid:string,startDate:string,endDate:string): Promise<string>{    
    console.log('BpmData')           
    const result = await commonQuery.whereIfResult(this.ecg_csv_bpmdayRepository,this.table,this.select,empid,startDate,endDate);             
    const Value = (result.length != 0 && empid != null)? commonFun.convertCsv(commonFun.converterJson(result)) : commonFun.converterJson('result = ' + '0')                
    return Value;    
    }
    
    async getWebBpm (empid:string,startDate:string,endDate:string):Promise<string>{
      try{ 
        const select = 'bpm,hrv,writetime'
        const result = await this.ecg_csv_bpmdayRepository.createQueryBuilder(this.table)
                        .select(select)
                        .where({"eq":empid})
                        .andWhere({'writetime':MoreThan(startDate)})
                        .andWhere({'writetime':LessThan(endDate)})
                        .orderBy('MID(writetime,12,8)','ASC')
                        .getRawMany()
        return commonFun.converterJson(result)
      }catch(E){
        console.log(E)
      }
    }

    async webGraphBpmHrvArr(empid:string,startDate:string,endDate:string): Promise<string>{
      try{        
        const subQuery = await this.subQueryArr(empid,startDate,endDate)
        const result = await this.ecg_csv_bpmdayRepository.createQueryBuilder('a')
                        .select('a.writetime,a.bpm,a.hrv,b.count')
                        .leftJoin(subQuery,'b','MID(a.writetime,1,18) = MID(b.writetime,1,18)')
                        .where({"eq":empid})
                        .andWhere({"writetime":MoreThanOrEqual(startDate)})
                        .andWhere({"writetime":LessThan(endDate)})                        
                        .orderBy('writetime','ASC')
                        .getRawMany()        
        return commonFun.converterJson(result);                    
      }catch(E){
        console.log(E)
      }

    }

    async subQueryArr(eq:string,writetime:string,endDate:string): Promise<string>{
      const subSelect = 'COUNT(ecgpacket) count,writetime'
      try{
        const result = await this.ecg_csv_ecgdata_arrRepository.createQueryBuilder()
        .subQuery()
        .select(subSelect)
        .from(ecg_csv_ecgdata_arrEntity,'')
        .where(`eq = '${eq}'`)
        .andWhere(`writetime >= '${writetime}'`)          
        .andWhere(`writetime < '${endDate}'`)
        .groupBy('writetime')
        .having('COUNT(ecgpacket)')          
        .getQuery()
        return result
      }catch(E){
        console.log(E)
      }
    }

}