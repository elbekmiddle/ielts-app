import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('IELTS APP API')
    .setDescription('API Documentation for NestJS IELTS App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Render/Heroku kabi serverlar uchun PORT ni environmentdan olish
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📚 Swagger Docs on http://localhost:${port}/api/docs`);
  });
}
bootstrap();
