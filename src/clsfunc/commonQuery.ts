import { MoreThanOrEqual,LessThan,LessThanOrEqual } from 'typeorm';
import { commonFun } from './commonfunc';

export class commonQuery{
    static async whereIfResult(Repository:any,table:string,select:string,empid:string,startDate:string,endDate:string): Promise<any>{
        var result: any        
        if(startDate == "" && endDate == ""){
            result = await Repository.createQueryBuilder(table)
            .select(select)    
            .where({"eq":empid})            
            .getRawMany()
        }else if(endDate == ""){        
            result = await Repository.createQueryBuilder(table)
            .select(select)    
            .where({"eq":empid}).andWhere({"writetime":MoreThanOrEqual(startDate)})
            .getRawMany()
        }else if(startDate == ""){
            result = await Repository.createQueryBuilder(table)
            .select(select)    
            .where({"eq":empid}).andWhere({"writetime":LessThan(endDate)})
            .getRawMany()
        }else{                        
            result = await Repository.createQueryBuilder(table)
            .select(select)            
            .where({"eq":empid}).andWhere({"writetime":MoreThanOrEqual(startDate)}).andWhere({"writetime":LessThan(endDate)})
            .getRawMany()
        }
        return result;
    }

    static async getProfile(Repository:any,parentsEntity:any,empid:string):Promise<string>{
        let boolResult = false
        try{
            let select = 'a.eq,a.eqname,a.email,a.phone as userphone,a.sex,a.height,a.weight,a.age,a.birth,a.signupdate,'+
            'a.sleeptime,a.uptime,a.bpm,a.step,a.distanceKM,a.cal,' +
            'a.calexe,a.alarm_sms,a.differtime,b.phone'
            const result = await Repository.createQueryBuilder('a')        
        .select(select)    
        .leftJoin(parentsEntity,'b','a.eq = b.eq')    
        .where({"eq":empid})    
        .getRawOne()    
        console.log(result)
        const jsonValue = (result.length != 0 && empid != null)? result : 'result = ' + boolResult.toString()     
        return commonFun.converterJson(jsonValue);
        }catch(E){
            console.log(E)
        }
    }

}
