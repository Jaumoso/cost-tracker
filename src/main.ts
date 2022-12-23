/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cost-Tracker')
    .setDescription('Cost-Tracker API documentation. Here you can find easily all the calls that he application backend can make.')
    .setVersion('1.0')
/*     .addTag('cost-tracker') */
    .build();

    const options: SwaggerDocumentOptions =  {

      deepScanRoutes: true,

      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey
    };

    const customOptions: SwaggerCustomOptions = {
      customSiteTitle: 'Cost-Tracker API Docs'
  }

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors();
  await app.listen(3000);
  
  /* console.log(`Application is running on: ${await app.getUrl()}`); */
  console.log(`\nTo see API documentation go to: ${await app.getUrl()}/api \n`);
  console.log(`To download Swagger API JSON file go to: ${await app.getUrl()}/api-json`);
}
bootstrap();
