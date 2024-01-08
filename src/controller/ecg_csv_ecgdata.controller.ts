import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ecg_csv_ecgdataService } from 'src/service/ecg_csv_ecgdata.service';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';

@Controller('mslecg')
@ApiTags('mslecg')
export class ecg_csv_ecgdataController {
  constructor(private readonly ecg_csv_ecgdataService: ecg_csv_ecgdataService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: ecg_csv_ecgdataDTO): Promise<any> {        
    return await this.ecg_csv_ecgdataService.gubunKind(body);
  }

  @Get("/test")
 async getTest(       
   @Query('eq') eq:string): Promise<any> {       
    return await this.ecg_csv_ecgdataService.ecgPacket(eq,"2023-08-31","2023-09-01");
  }

  @Get("/Ecg")
 async getEcg(       
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   ): Promise<number[]> {       
    return await this.ecg_csv_ecgdataService.getEcg(eq,startDate);
  }
  
@Get("/EcgTime")
  async getEcgTime(
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string,
  ):Promise<string[]>{
    return await this.ecg_csv_ecgdataService.getEcgTime(eq,startDate,endDate);
  }

  @Get("/GraphEcg")
 async getGraphEcg(       
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   @Query('endDate') endDate:string,
   ): Promise<number[]> {       
    return await this.ecg_csv_ecgdataService.getGraphEcgValue(eq,startDate,endDate);
  }

}

