import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { admin_login_logDTO } from 'src/dto/admin_login_log.dto';
import { app_logService } from 'src/service/app_log.service';



@Controller('app_log')
@ApiTags('app_log')
export class app_logController {
  constructor(private readonly app_logService: app_logService) {}  

  @Post("/api_getdata")
 async postLog(    
   @Body() body: admin_login_logDTO): Promise<any> {        
    return await this.app_logService.LogInsert(body);
  }  

  @Get("/test")
  getTest():string{    
    return''
  }

}