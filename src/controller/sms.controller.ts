import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { parentsDTO } from '../dto/parents.dto';
import { SmsService } from 'src/service/sms.service';

@Controller('mslSMS')
@ApiTags('mslSMS')
export class smsController {
  constructor(
    private readonly smsService: SmsService,    
    ) {}  
  
  @Get("/sendSMS")
 async getSendSMS(
    @Query('phone') phone: string,
    @Query('nationalCode') nationalCode: number
    ): Promise<boolean> {            
    return await this.smsService.sendSms(phone,nationalCode);   
  }

  @Get("/checkSMS")
 async getCheckSMS(
    @Query('phone') phone: string,
    @Query('code') code: number
    ): Promise<boolean> {            
    return await this.smsService.checkSMS(phone,code);   
  } 

}