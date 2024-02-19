import { ecg_raw_history_lastEntity } from "src/entity/ecg_raw_history_last.entity";
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ecg_raw_history_lastDTO } from "../dto/ecg_raw_history_last.dto";
import { commonFun } from 'src/clsfunc/commonfunc';
import { ecg_csv_datadayEntity } from "src/entity/ecg_csv_dataday.entity";

@Injectable()
export class ecg_raw_history_lastService {
  ecg_raws: ecg_raw_history_lastEntity[] = [];    
  constructor(@InjectRepository(ecg_raw_history_lastEntity) private ecg_raw_history_lastRepository:Repository<ecg_raw_history_lastEntity>,
  @InjectRepository(ecg_csv_datadayEntity) private ecg_csv_datadayRepository:Repository<ecg_csv_datadayEntity>
  ){}

  async gubunKind(body:ecg_raw_history_lastDTO): Promise<any>{   
    switch(body.kind){
        case "getdata" :
            return this.getEcg_raw_history_last(body.eq);
        case null  :
            return false;
    } 
  }

  select = 'eq,eqname,writetime,hrv,cal,calexe,step,distanceKM,arrcnt,temp,eventcode,bodystate,isack,log'
  
   async getEcg_raw_history_last(empid:string): Promise<string>{        
    const result: ecg_raw_history_lastEntity[] = await this.ecg_raw_history_lastRepository.createQueryBuilder('ecg_raw_history_last')
    .select('bpm')    
    .where({"eq":empid})    
    .getRawMany() 

    console.log(empid)
    const Value = (result.length != 0 && empid != null)? commonFun.convertCsv(commonFun.converterJson(result)) : commonFun.converterJson('result = ' + '0')
    
    return Value;
    
    }      

    async gethistory_last(): Promise<string>{
      const select = 'a.idx,a.eq,eqname,a.bpm,a.hrv,mid(a.temp,1,5) temp,'+
      'b.step step, b.distanceKM distanceKM, b.cal cal, b.calexe calexe, b.arrcnt arrcnt,a.timezone,'+
      'a.writetime,'+
      'case '+ 
      "when MID(a.timezone,1,1) = '-' then DATE_ADD(a.writetime,INTERVAL cast(MID(a.timezone,2,2) AS unsigned) + 9 HOUR)"+
      " when MID(a.timezone,1,1) = '+' AND cast(MID(a.timezone,2,2) AS UNSIGNED) < 9 AND a.timezone NOT LIKE '%KR%' then DATE_ADD(a.writetime,INTERVAL 9 - cast(MID(a.timezone,2,2) AS unsigned) HOUR)" +
      " when MID(a.timezone,1,1) = '+' AND cast(MID(a.timezone,2,2) AS UNSIGNED) > 9 then DATE_SUB(a.writetime,INTERVAL 9 - cast(MID(a.timezone,2,2) AS UNSIGNED) HOUR)"+
      ' ELSE a.writetime END'+
      ' AS changeTime'              
      try{
        const subQuery = await this.subQueryDataDay()
        const result = await this.ecg_raw_history_lastRepository.createQueryBuilder('a')
        .select(select)         
        .leftJoin(subQuery,'b','a.eq = b.eq AND Mid(a.writetime,1,10) = b.writetime')
        .orderBy('changeTime' ,'DESC')   
        .getRawMany()  
        
        const Value = (result.length != 0)? commonFun.converterJson(result) : commonFun.converterJson('result = ' + '0')       
        
        return Value;
      }catch(E){
        console.log(E)
      }      
    }
      
    async subQueryDataDay(): Promise<string>{
      const subSelect = 'eq ,Mid(writetime,1,10) writetime,sum(step) step,sum(distanceKM) distanceKM,sum(cal) cal,sum(calexe) calexe,sum(arrcnt) arrcnt'
      try{
        
        const result = await this.ecg_csv_datadayRepository.createQueryBuilder()
        .subQuery()
        .select(subSelect)
        .from(ecg_csv_datadayEntity,'')                    
        .groupBy('eq,Mid(writetime,1,10)')          
        .getQuery()          

        return result

      }catch(E){
        console.log(E)
      }
    }

}