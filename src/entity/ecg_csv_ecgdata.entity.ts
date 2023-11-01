import { Entity, Column, PrimaryGeneratedColumn, Double, Int32 } from 'typeorm';

@Entity('ecg_csv_ecgdata')
export class ecg_csv_ecgdataEntity{

    @PrimaryGeneratedColumn()
    idx: number;

    @Column({type:'varchar'})
    eq:string;

    @Column({type:'datetime'})
    writetime:string;

    @Column({type:'varchar'})
    timezone:string;

    @Column({type:'int'})
    bpm:Int32;

    @Column({type:'text'})
    ecgpacket:string; 
}