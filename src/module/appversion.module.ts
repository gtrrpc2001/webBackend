import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { appversionController } from "src/controller/appversion.controller";
import { appversionEntity } from "src/entity/appversion.entity";
import { appversionService } from "src/service/appversion.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([appversionEntity])
    ],
    controllers:[appversionController],
    providers:[appversionService]
})
export class appversionModule {}