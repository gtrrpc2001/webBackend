// import * as admin from 'firebase-admin';
// import { staticConfigValue } from 'src/config/staticConfigValue';
// import { ConfigService } from '@nestjs/config';
// import { firebasenoti } from './firebasenoti';

// export class androidNoti{

//     static path = ""  
//     static android:any

//     static setPath = (configService:ConfigService)  => {        
//         this.path = staticConfigValue.getFirebase_sdk(configService).path   
//         this.android = require(this.path)
//     }    

//     static async ANDROID(configService:ConfigService): Promise<boolean>{
//         try{
                     
//           if(admin.apps.length != 0)
//                 admin.app().delete();          

//           if(this.path == "")
//             this.setPath(configService);            
            
//           firebasenoti.initializeApp(this.android)

//           return true    
//           }catch(E){
//             console.log('여기서 빠짐')           
//             console.log(E) 
//              return false
//           }
//     }
      
// }
