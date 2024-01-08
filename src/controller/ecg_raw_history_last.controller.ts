import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ecg_raw_history_lastService } from 'src/service/ecg_raw_history_last.service';
import { ecg_raw_history_lastDTO } from '../dto/ecg_raw_history_last.dto';

@Controller('mslLast')
@ApiTags('mslLast')
export class ecg_raw_history_lastController {
  constructor(private readonly ecg_raw_history_lastService: ecg_raw_history_lastService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: ecg_raw_history_lastDTO): Promise<any> {        
    return await this.ecg_raw_history_lastService.gubunKind(body);
  }

  @Get("/last")
 async getLast(       
   @Query('eq') eq:string): Promise<string> {       
    return await this.ecg_raw_history_lastService.getEcg_raw_history_last(eq);
  }

  @Get("/webTable")
 async getTableListValue(): Promise<any> {  
    return await this.ecg_raw_history_lastService.gethistory_last();
  }

}
