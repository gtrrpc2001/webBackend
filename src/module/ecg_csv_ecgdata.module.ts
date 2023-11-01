import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ecg_csv_ecgdataController } from 'src/controller/ecg_csv_ecgdata.controller';
import { ecg_csv_ecgdataEntity } from 'src/entity/ecg_csv_ecgdata.entity';
import { ecg_raw_history_lastEntity } from 'src/entity/ecg_raw_history_last.entity';
import { ecg_csv_ecgdataService } from 'src/service/ecg_csv_ecgdata.service';



@Module({
    imports:[
        TypeOrmModule.forFeature([ecg_csv_ecgdataEntity,ecg_raw_history_lastEntity])
    ],
    controllers:[ecg_csv_ecgdataController],
    providers:[ecg_csv_ecgdataService]
})
export class ecg_csv_ecgdataModule {}