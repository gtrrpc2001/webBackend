import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from 'src/controller/user.controller';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';
import { parentsEntity } from 'src/entity/parents.entity';
import { DeleteUserLogEntity, userEntity } from 'src/entity/user.entity';
import { userService } from 'src/service/user.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([userEntity,ecg_raw_history_lastEntity,parentsEntity,DeleteUserLogEntity])
    ],
    controllers:[userController],
    providers:[userService]
})
export class userModule {}