import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';
import { ecg_csv_bpmdayService } from 'src/service/ecg_csv_bpmday.service';


@Controller('mslbpm')
@ApiTags('mslbpm')
export class ecg_csv_bpmdayController {
  constructor(private readonly ecg_csv_bpmdayService: ecg_csv_bpmdayService) {}  

  @Post("/api_data")
 async postAll(    
   @Body() body: ecg_csv_ecgdataDTO): Promise<any> {            
    return this.ecg_csv_bpmdayService.gubunKind(body);
  }

  @Get("/api_getdata")
 async getBpm(    
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   @Query('endDate') endDate:string): Promise<string> {        
    return this.ecg_csv_bpmdayService.BpmData(eq,startDate,endDate);
  }

  @Get("/webBpm")
 async getWebBpm(       
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   @Query('endDate') endDate:string): Promise<string> {       
    return this.ecg_csv_bpmdayService.getWebBpm(eq,startDate,endDate);
  }

  @Get("/webGraphBpmHrvArr")
 async getGraph(       
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   @Query('endDate') endDate:string): Promise<any> {       
    return await this.ecg_csv_bpmdayService.webGraphBpmHrvArr(eq,startDate,endDate);
  }

  @Get("/test")
 async getTest(       
   @Query('eq') eq:string): Promise<string> {       
    return this.ecg_csv_bpmdayService.BpmData(eq,"2023-08-30","2023-08-31");
  }

}
