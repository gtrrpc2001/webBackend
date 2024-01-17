import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ecg_csv_ecgdataDTO } from 'src/dto/ecg_csv_ecgdata.dto';
import { ecg_csv_ecgdata_arrService } from 'src/service/ecg_csv_ecgdata_arr.service';

@Controller('mslecgarr')
@ApiTags('mslecgarr')
export class ecg_csv_ecgdata_arrController {
  constructor(private readonly ecg_csv_ecgdata_arrService: ecg_csv_ecgdata_arrService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: ecg_csv_ecgdataDTO): Promise<any> {        
    return this.ecg_csv_ecgdata_arrService.gubunKind(body);
  }

  @Get("/arrEcgData")
 async getArrEcgData(       
   @Query('eq') eq:string,
   @Query('startDate') startDate:string,
   @Query('endDate') endDate:string): Promise<string> {       
    return this.ecg_csv_ecgdata_arrService.arrEcgData(eq,startDate,endDate);
  }

  @Get("/arrWritetime")
 async getArrWritetime(         
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string): Promise<any> {       
    return await this.ecg_csv_ecgdata_arrService.arrWritetime(eq,startDate,endDate);
  }

  @Get("/test")
 async getTest(   
  @Query('idx') idx:number,    
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string): Promise<any> {       
    return this.ecg_csv_ecgdata_arrService.testArr(idx,eq,startDate,endDate);
  }

  @Get("/arrCnt")
 async getCount(   
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string): Promise<any> {       
    return await this.ecg_csv_ecgdata_arrService.countArr(eq,startDate,endDate);
  }

  @Get("/arrCount")
 async getOnlyCount(   
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string): Promise<any> {       
    return await this.ecg_csv_ecgdata_arrService.onlyArrCount(eq,startDate,endDate);
  }

  @Get("/graphArrCnt")
 async getGraphArrCount(   
  @Query('eq') eq:string,
  @Query('startDate') startDate:string,
  @Query('endDate') endDate:string,
  @Query('len') len:number
  ): Promise<any> {       
    return await this.ecg_csv_ecgdata_arrService.graphArrCount(eq,startDate,endDate,len);
  }

  @Get("/arrPreEcgData")
 async getArrPreEcgData(   
  @Query('eq') eq:string,
  @Query('date') date:string): Promise<any> {       
    return await this.ecg_csv_ecgdata_arrService.arrPreEcgData(eq,date);
  }

}