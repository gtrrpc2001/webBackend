import { ecg_csv_ecgdata_arrModule } from "src/module/ecg_csv_ecgdata_arr.module";
import { ecg_csv_bpmdayModule } from "src/module/ecg_csv_bpmday.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ecg_csv_datadayModule } from "src/module/ecg_csv_dataday.module";
import { ecg_csv_ecgdataModule } from "src/module/ecg_csv_ecgdata.module";
import { ecg_raw_history_lastModule } from "src/module/ecg_raw_history_last.module";
import { admin_login_logModule } from "src/module/admin_login_log.module";
import { parentsModule } from "src/module/parents.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MySqlMslConfigService } from "src/service/mysqlconfig.service";
import { userModule } from "src/module/user.module";



export class allModule{

    static appImport = [
        ConfigModule.forRoot({
            isGlobal:true,
            envFilePath:'.env',
        }),

        TypeOrmModule.forRootAsync({
            useClass:MySqlMslConfigService,
            inject:[MySqlMslConfigService]
        }),
            
        ecg_csv_ecgdata_arrModule,ecg_csv_bpmdayModule,ecg_csv_datadayModule,
        ecg_csv_ecgdataModule,ecg_raw_history_lastModule,userModule,admin_login_logModule,
        parentsModule
        
    ]
}
    


