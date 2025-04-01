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
  const port = process.env.PORT ?? 3000;
  console.log(`🚀 Servidor rodando na porta ${port}`);
  await app.listen(port);
}
bootstrap();
