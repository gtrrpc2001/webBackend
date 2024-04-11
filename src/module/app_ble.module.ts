import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { app_bleController } from 'src/controller/app_ble.controller';
import { app_bleEntity } from 'src/entity/app_ble.entity';
import { parentsEntity } from 'src/entity/parents.entity';
import { app_bleService } from 'src/service/app_ble.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([app_bleEntity,parentsEntity])
    ],
    controllers:[app_bleController],
    providers:[app_bleService]
})
export class app_bleModule {}