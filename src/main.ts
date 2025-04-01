import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Avalia Fit API')
    .setDescription(
      'Documentação interativa da API de Testes Físicos, Circunferências e Avaliações',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(`Server running on port ${process.env.PORT || 8080}`);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
