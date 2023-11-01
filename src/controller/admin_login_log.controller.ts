import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { admin_login_logDTO } from 'src/dto/admin_login_log.dto';
import { admin_login_logService } from 'src/service/admin_login_log.service';


@Controller('admin_login_log')
@ApiTags('admin_login_log')
export class admin_login_logController {
  constructor(private readonly admin_login_logService: admin_login_logService) {}  

  @Post("/api_getdata")
 async postLog(    
   @Body() body: admin_login_logDTO): Promise<any> {        
    return this.admin_login_logService.LogInsert(body);
  }  

}