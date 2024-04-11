import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { parentsService } from 'src/service/parents.service';
import { parentsDTO } from '../dto/parents.dto';

@Controller('mslparents')
@ApiTags('mslparents')
export class parentsController {
  constructor(private readonly parentsService: parentsService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: parentsDTO): Promise<string> {     
    return await this.parentsService.postParent(body);
  }  
}