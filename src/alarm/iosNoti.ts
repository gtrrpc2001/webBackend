// import * as admin from 'firebase-admin';
// import { staticConfigValue } from 'src/config/staticConfigValue';
// import { ConfigService } from '@nestjs/config';
// import { firebasenoti } from './firebasenoti';

// export class iosNoti{

//     static iosPath = ""
//     static ios:any

//     static setPath = (configService:ConfigService)  => {        
//         this.iosPath = staticConfigValue.getFirebase_sdk_ios(configService).path   
//         this.ios = require(this.iosPath)
//     }    

//     static async IOS(configService:ConfigService): Promise<boolean>{
//         try{           
//           if(admin.apps.length != 0)
//                 admin.app().delete();

//           if(this.iosPath == "")
//             this.setPath(configService);            
            
//           firebasenoti.initializeApp(this.ios)

//           return true    
//           }catch(E){
//             console.log('여기서 빠짐')           
//             console.log(E) 
//              return false
//           }
//     }
// }
