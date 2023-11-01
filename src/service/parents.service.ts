import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { commonFun } from 'src/clsfunc/commonfunc';
import { parentsEntity } from 'src/entity/parents.entity';
import { parentsDTO } from 'src/dto/parents.dto';

@Injectable()
export class parentsService {
  time_raws: parentsEntity[] = [];
  constructor(
    @InjectRepository(parentsEntity) private parentsRepository:Repository<parentsEntity>){}
  

  async postParent(body:parentsDTO): Promise<string>{    
    let boolResult = false
    try{      
        const checkInsert = await this.selPhone(body)
        const length = checkInsert.length
        if(length != 0){
          boolResult = await this.parentUpdate(body,length)
        }else{
          boolResult = await this.setInsert(body)
        }        
        console.log(`parents -- ${body.eq}`)
        var jsonValue = 'result = ' + boolResult.toString()        
        return commonFun.converterJson(jsonValue);
    }catch(E){    
        console.log(E)
        return E;
    }
  }

  async setInsert(body:parentsDTO):Promise<boolean>{
    try{
      let index = 0
      for(let phone of body.phones){
        index += 1
       await this.parentInsert(body,phone,index)
      }
      return true;
    }catch(E){
      console.log(E)
      return false;
    } 
  }

  async parentUpdate(body:parentsDTO,length: number):Promise<boolean>{
    try{
      let index = 0
      let result
      for(let phone of body.phones){
        index += 1
        console.log(phone)
        if(length < index){
          result = await this.parentInsert(body,phone,index)
        }else{
          result = await this.parentsRepository.createQueryBuilder()
          .update(parentsEntity)
          .set({phone:phone})
          .where({"eq":body.eq}).andWhere({"phoneindex":index})
          .execute()
        } 
      }      
      return true;
    }catch(E){
      console.log(E)
      return false;
    } 
  }

  async selPhone(body:parentsDTO):Promise<parentsEntity[]>{
    try{
      const result = await this.parentsRepository.createQueryBuilder('parents')
      .select('phone,phoneindex')
      .where({"eq":body.eq})
      .getRawMany()
      return result
    }catch(E){
      console.log(E)
    }
  }

  async parentInsert(body:parentsDTO,phone:string,index:number):Promise<boolean>{
    try{
      const result = await this.parentsRepository.createQueryBuilder()
        .insert()
        .into(parentsEntity)
        .values([{
            eq:body.eq,timezone:body.timezone,writetime:body.writetime,phone:phone,token:body.token,phoneindex:index
        }])
        .execute()
        return true;
    }catch(E){
      console.log(E)
      return false;
    }    
  }

  async getTime(eq:string): Promise<any>{ 
    const e = ''
    return e;
    
  }
     
}

