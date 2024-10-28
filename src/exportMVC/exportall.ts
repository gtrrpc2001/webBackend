import { ecg_csv_ecgdata_arrModule } from "src/module/ecg_csv_ecgdata_arr.module";
import { ecg_csv_bpmdayModule } from "src/module/ecg_csv_bpmday.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ecg_csv_datadayModule } from "src/module/ecg_csv_dataday.module";
import { ecg_raw_history_lastModule } from "src/module/ecg_raw_history_last.module";
import { admin_login_logModule } from "src/module/admin_login_log.module";
import { parentsModule } from "src/module/parents.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MySqlMslConfigService } from "src/service/mysqlconfig.service";
import { userModule } from "src/module/user.module";
import { ecg_byteModule } from "src/module/ecg_byte.module";
import { appversionModule } from "src/module/appversion.module";
import { smsModule } from "src/module/sms.module";
import { app_logModule } from "src/module/app_log.module";
import { app_bleModule } from "src/module/app_ble.module";
import { ecg_stressModule } from "src/module/ecg_stress.module";
import { PrometheusService } from "src/service/prometheus.service";
import { Hospital_patientModule } from "src/service/hospital_patient.module";



export class allModule {

    static appImport = [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        TypeOrmModule.forRootAsync({
            useClass: MySqlMslConfigService,
            inject: [MySqlMslConfigService]
        }),
        PrometheusModule.registerAsync({ global: true, useClass: PrometheusService }),

        ecg_csv_ecgdata_arrModule, ecg_csv_bpmdayModule, ecg_csv_datadayModule,
        ecg_raw_history_lastModule, userModule, admin_login_logModule,
        parentsModule, ecg_byteModule, appversionModule, smsModule, app_logModule, app_bleModule, ecg_stressModule, hospital


    ]
}



