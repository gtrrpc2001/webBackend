import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('user')
export class userEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    gubun:string;

    @Column({type:'varchar'})
    businessNum:string;

    @Column({type:'varchar'})
    businessName:string;

    @Column({type:'varchar'})
    department:string;

    @Column({type:'varchar'})
    rank:string;
    
    @Column({type:'varchar'})
    eqname:string;

    @Column({type:'varchar'})
    phone:string;

    @Column({type:'varchar'})
    number:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    address:string;
    
    @Column({type:'varchar'})
    eq:string;         

    @Column({type:'text'})
    password:string;
    
    @Column({type:'text'})
    temporaryPwd:string;

    @Column({type:'varchar'})
    sex:string;

    @Column({type:'varchar'})
    height:string;

    @Column({type:'varchar'})
    weight:string;

    @Column({type:'varchar'})
    age:string;
    
    @Column({type:'date'})
    birth:string;

    @Column({type:'varchar'})
    work:string;   

    @Column({type:'varchar'})
    memo:string;

    @Column({type:'varchar'})
    authority:string;     

    @Column({type:'date'})
    sdate:string;

    @Column({type:'date'})
    edate:string;

    @Column({type:'varchar'})
    approval:string;

    @Column({type:'varchar'})
    contractSign:string;

    @Column({type:'datetime'})
    workSdate:string;

    @Column({type:'datetime'})
    workEdate:string;

    @Column({type:'int'})
    tryLogin:Int32;
    
    @Column({type:'int'})
    lock:Int32;

    @Column({type:'datetime'})
    lockdate:string; 

    @Column({type:'datetime'})
    signupdate:string;

    @Column({type:'int'})
    sleeptime:Int32;

    @Column({type:'int'})
    uptime:Int32;  

    @Column({type:'int'})
    bpm:Int32;

    @Column({type:'int'})
    step:Int32;

    @Column({type:'int'})
    distanceKM:Int32;

    @Column({type:'int'})
    calexe:Int32;

    @Column({type:'int'})
    cal:Int32;

    @Column({type:'int'})
    alarm_sms:Int32;

    @Column({type:'int'})
    differtime:Int32;

    @Column({type:'varchar'})
    protecteq:string; 

    @Column({type:'int'})
    appKey:Int32;
}

@Entity('delete_user_log')
export class DeleteUserLogEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    gubun:string;

    @Column({type:'varchar'})
    businessNum:string;

    @Column({type:'varchar'})
    businessName:string;

    @Column({type:'varchar'})
    department:string;

    @Column({type:'varchar'})
    rank:string;
    
    @Column({type:'varchar'})
    eqname:string;

    @Column({type:'varchar'})
    phone:string;

    @Column({type:'varchar'})
    number:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    address:string;
    
    @Column({type:'varchar'})
    eq:string;         

    @Column({type:'text'})
    password:string;
    
    @Column({type:'text'})
    temporaryPwd:string;

    @Column({type:'varchar'})
    sex:string;

    @Column({type:'varchar'})
    height:string;

    @Column({type:'varchar'})
    weight:string;

    @Column({type:'varchar'})
    age:string;
    
    @Column({type:'date'})
    birth:string;

    @Column({type:'varchar'})
    work:string;   

    @Column({type:'varchar'})
    memo:string;

    @Column({type:'varchar'})
    authority:string;     

    @Column({type:'date'})
    sdate:string;

    @Column({type:'date'})
    edate:string;

    @Column({type:'varchar'})
    approval:string;

    @Column({type:'varchar'})
    contractSign:string;

    @Column({type:'datetime'})
    workSdate:string;

    @Column({type:'datetime'})
    workEdate:string;

    @Column({type:'int'})
    tryLogin:Int32;
    
    @Column({type:'int'})
    lock:Int32;

    @Column({type:'datetime'})
    lockdate:string; 

    @Column({type:'datetime'})
    signupdate:string;

    @Column({type:'int'})
    sleeptime:Int32;

    @Column({type:'int'})
    uptime:Int32;  

    @Column({type:'int'})
    bpm:Int32;

    @Column({type:'int'})
    step:Int32;

    @Column({type:'int'})
    distanceKM:Int32;

    @Column({type:'int'})
    calexe:Int32;

    @Column({type:'int'})
    cal:Int32;

    @Column({type:'int'})
    alarm_sms:Int32;

    @Column({type:'int'})
    differtime:Int32;

    @Column({type:'varchar'})
    protecteq:string; 
    
}