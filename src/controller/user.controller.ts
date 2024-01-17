import { Controller, Get,Post,Body,Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userDTO } from '../dto/user.dto';
import { userService } from 'src/service/user.service';

@Controller('msl')
@ApiTags('msl')
export class userController {
  constructor(private readonly userService: userService) {}  

  @Post("/api_getdata")
 async postAll(    
   @Body() body: userDTO): Promise<any> {        
    return await this.userService.gubunKind(body);
  }
  checkIDDupe

  @Get("/CheckIDDupe")
 async getCheckIDDupe(       
   @Query('empid') empid:string): Promise<string> {       
    return await this.userService.checkIDDupe(empid);
  }

  @Get("/findID")
 async getFindID(       
   @Query('eqname') name:string,
   @Query('phone') phone:string,
   @Query('birth') birth:string): Promise<string> {       
    return await this.userService.findID(name,phone,birth);
  }

  @Get("/Profile")
 async getProfile(       
   @Query('empid') empid:string): Promise<string> {   
    console.log(empid)   
    return await this.userService.getProfile(empid);
  }

  @Get("/CheckLogin")
 async getCheckLogin(       
   @Query('empid') empid:string,
   @Query('pw') pw:string,
   @Query('phone') phone:string,
   @Query('token') token:string): Promise<any> {    
    return await this.userService.checkLogin(empid,pw,phone,token);
  }  
}