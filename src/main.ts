import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Order Management API')
  .setDescription('API for managing orders in e-commerce system')
  .setVersion('1.0')
  .addServer('/api/v1')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/doc', app, document);
  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}

bootstrap();