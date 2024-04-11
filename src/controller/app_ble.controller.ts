import { Controller, Get,Post,Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { admin_login_logDTO } from 'src/dto/admin_login_log.dto';
import { app_bleService } from 'src/service/app_ble.service';

@Controller('app_ble')
@ApiTags('app_ble')
export class app_bleController {
  constructor(private readonly app_bleService: app_bleService) {}  

  @Post("/api_getdata")
 async postLog(    
   @Body() body: admin_login_logDTO): Promise<any> {        
    return await this.app_bleService.LogInsert(body);
  }  

  @Get("/test")
  getTest():string{    
    return''
  }

}