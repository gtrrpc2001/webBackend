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
  
  async getVersion(app:string): Promise<string>{
    try{              
      const result = await this.appversionRepository.createQueryBuilder()
                      .select('versioncode')                      
                      .where({"app":app})                                                                 
                      .getRawOne()        
      return commonFun.converterJson(result);                    
    }catch(E){
      console.log(E)
    }
  }

  async updateVersion(body:appversionDTO): Promise<boolean>{    
    try{   
        const result = await this.appversionRepository.createQueryBuilder()
        .update(appversionEntity)        
        .set({"versioncode":body.versioncode})
        .where({"app":body.app})
        .execute()            
        return true;
    }catch(E){
        console.log(E)
        return false;
    }             
  }

}