import { Injectable } from "@nestjs/common";
import { CacheModuleOptions, CacheOptionsFactory } from "@nestjs/cache-manager";
import * as redisStore from 'cache-manager-redis-store'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CachConfigService implements CacheOptionsFactory {
    constructor(private configService:ConfigService){}
    
    createCacheOptions(): CacheModuleOptions {        
        const config: CacheModuleOptions = {
            store:redisStore,
            host: this.configService.get<string>('REDISHOST'),            
            port: this.configService.get<Number>('REDISPORT'),
            ttl:180,
            max: 1000,            
            password:this.configService.get<string>('PASSWORD'),
            db:this.configService.get<Number>('REDISDB')
        };
        console.log(config.store)
        return config;
    }
    
}