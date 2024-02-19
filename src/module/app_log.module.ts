import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { app_logController } from 'src/controller/app_log.controller';
import { app_logEntity } from 'src/entity/app_log.entity';
import { app_logService } from 'src/service/app_log.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([app_logEntity])
    ],
    controllers:[app_logController],
    providers:[app_logService]
})
export class app_logModule {}