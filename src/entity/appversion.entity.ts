import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('appversion')
export class appversionEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    app:string;   

    @Column({type:'int'})
    versioncode:Int32;
}