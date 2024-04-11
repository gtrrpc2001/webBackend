import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commonFun } from 'src/clsfunc/commonfunc';
import { appversionDTO } from 'src/dto/appversion.dto';
import { appversionEntity } from 'src/entity/appversion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class appversionService {  
  constructor(@InjectRepository(appversionEntity) private appversionRepository:Repository<appversionEntity>
  ){}
  
  async getVersion(app:string,gubun:string): Promise<string>{
    try{
      const select = (gubun == "ios") ? 'versioncode' : 'versioncode,apkkey'
      const result = await this.appversionRepository.createQueryBuilder()
                      .select(select)                      
                      .where({"app":app})
                      .andWhere({"gubun":gubun})
                      .getRawOne()        
      return commonFun.converterJson(result);                    
    }catch(E){
      console.log(E)
    }
  }

  async updateVersion(body:appversionDTO): Promise<boolean>{    
    try{   
      let set
      if(body.gubun == "ios"){
        set = {"versioncode":body.versioncode}
      }else{
        set = {"versioncode":body.versioncode,"apkkey":body.apkkey}
      }
      const result = await this.appversionRepository.createQueryBuilder()
        .update(appversionEntity)        
        .set(set)
        .where({"app":body.app})
        .andWhere({"gubun":body.gubun})  
        .execute()            
        return true;
    }catch(E){
        console.log(E)
        return false;
    }             
  }

}