import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestesFisicos, TestesFisicosSchema } from './schemas/testes_fisicos.schema';
import { TestesFisicosController } from './testes-fisicos.controller';
import { TestesFisicosService } from './testes-fisicos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: TestesFisicos.name, schema: TestesFisicosSchema }])],
  controllers: [TestesFisicosController],
  providers: [TestesFisicosService],
})
export class TestesFisicosModule {}
