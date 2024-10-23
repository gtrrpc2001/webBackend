import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ecg_stressController } from "../controller/ecg_stress.controller";
import { ecg_stressEntity } from "../entity/ecg_stress.entity";
import { ecg_stressService } from "../service/ecg_stress.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ecg_stressEntity])
    ],
    controllers: [ecg_stressController],
    providers: [ecg_stressService]
})
export class ecg_stressModule { }