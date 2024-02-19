import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('app_log')
export class app_logEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    eq:string;

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'varchar'})
    gubun:string;    
    
    @Column({type:'varchar'})
    activity:string;
}