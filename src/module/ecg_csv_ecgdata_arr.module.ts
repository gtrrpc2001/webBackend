import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ecg_csv_ecgdata_arrController } from 'src/controller/ecg_csv_ecgdata_arr.controller';
import { ecg_byteEntity } from 'src/entity/ecg_byte.entity';
import { ecg_csv_ecgdata_arrEntity } from 'src/entity/ecg_csv_ecgdata_arr.entity';
import { parentsEntity } from 'src/entity/parents.entity';
import { UserEntity } from 'src/entity/user.entity';
import { ecg_csv_ecgdata_arrService } from 'src/service/ecg_csv_ecgdata_arr.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([ecg_csv_ecgdata_arrEntity,parentsEntity,UserEntity,ecg_byteEntity])
    ],
    controllers:[ecg_csv_ecgdata_arrController],
    providers:[ecg_csv_ecgdata_arrService]
})
export class ecg_csv_ecgdata_arrModule {}