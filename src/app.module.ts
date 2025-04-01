import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AlunoModule } from './aluno/aluno.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { AvaliacaoModule } from './avaliacoes/avaliacao.module';
import { CircunferenciasModule } from './avaliacoes/circunferencias.module';
import { TestesFisicosModule } from './avaliacoes/testes-fisicos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    UsuarioModule,
    AlunoModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('Conectando ao MongoDB Atlas:', uri); // Log da URL de conexão
        return { uri };
      },
    }),
    AuthModule,
    AvaliacaoModule,
    CircunferenciasModule,
    TestesFisicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
