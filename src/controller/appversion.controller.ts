import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { appversionDTO } from 'src/dto/appversion.dto';
import { appversionService } from 'src/service/appversion.service';

@Controller('appversion')
@ApiTags('appversion')
export class appversionController {
  constructor(private readonly appversionService: appversionService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: appversionDTO): Promise<any> {        
    return await this.appversionService.updateVersion(body);
  }

  @Get("/getVersion")
 async getTest(       
   @Query('app') app:string,
   @Query('gubun') gubun:string
   ): Promise<string> {       
    return await this.appversionService.getVersion(app,gubun);
  }
}