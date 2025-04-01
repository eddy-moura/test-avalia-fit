import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoFisica, AvaliacaoFisicaSchema } from './schemas/avaliacao_fisica.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AvaliacaoFisica.name, schema: AvaliacaoFisicaSchema }])],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
})
export class AvaliacaoModule {}
