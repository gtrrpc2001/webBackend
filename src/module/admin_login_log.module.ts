import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { admin_login_logController } from 'src/controller/admin_login_log.controller';
import { admin_login_logEntity } from 'src/entity/admin_login_log.entity';
import { admin_login_logService } from 'src/service/admin_login_log.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([admin_login_logEntity])
    ],
    controllers:[admin_login_logController],
    providers:[admin_login_logService]
})
export class admin_login_logModule {}