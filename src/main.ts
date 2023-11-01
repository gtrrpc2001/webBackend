import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './module/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );
  
  const config = new DocumentBuilder()
  .setTitle('msl')
  .setDescription('API description')
  .setVersion('1.0')
  .build()

  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api',app,document);
  app.enableCors({    
    origin:true,
    methods:['POST', 'PUT', 'DELETE', 'GET'],
    credentials:true
  }); 
  await app.listen('40080');
}
bootstrap();
