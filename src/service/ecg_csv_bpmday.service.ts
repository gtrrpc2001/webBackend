import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,MoreThan,LessThan } from 'typeorm';
import { ecg_csv_ecgdataDTO } from "src/dto/ecg_csv_ecgdata.dto";
import { ecg_csv_bpmdayEntity } from 'src/entity/ecg_csv_bpmday.entity';
import { commonFun } from 'src/clsfunc/commonfunc';
import { commonQuery } from 'src/clsfunc/commonQuery';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';

@Injectable()
export class ecg_csv_bpmdayService {
  ecg_raws: ecg_csv_bpmdayEntity[] = [];    
  constructor(@InjectRepository(ecg_csv_bpmdayEntity) private ecg_csv_bpmdayRepository:Repository<ecg_csv_bpmdayEntity>,
  @InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>
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
      console.log(`${body.cal}--${body.calexe}--${body.step}--${body.distanceKM}--${body.arrcnt}--${body.temp}`)     
        const result = await this.ecg_raw_history_lastRepository.createQueryBuilder()
        .update(ecg_raw_history_lastEntity)        
        .set({"writetime":body.writetime ,"hrv":body.hrv,"cal":body.cal,"calexe":body.calexe,"step":body.step,
          "distanceKM":body.distanceKM,"arrcnt":body.arrcnt,"temp":body.temp,"eventcode":body.eventcode,
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

}
