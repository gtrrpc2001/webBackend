import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ecg_stressService } from '../service/ecg_stress.service';

@Controller('mslecgstress')
@ApiTags('mslecgstress')
export class ecg_stressController {
  constructor(private readonly ecg_stressService: ecg_stressService) {}  


  @Get("/ecgStressData")
 async getArrEcgData(       
   @Query('eq') eq:string,
   @Query('startDate') sDate:string,
   @Query('endDate') eDate:string): Promise<any> {       
    return await this.ecg_stressService.getStressData(eq,sDate,eDate);
  } 
}