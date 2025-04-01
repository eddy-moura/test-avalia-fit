import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CircunferenciasController } from './circunferencias.controller';
import { CircunferenciasService } from './circunferencias.service';
import { Circunferencias, CircunferenciasSchema } from './schemas/circunferencias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circunferencias.name, schema: CircunferenciasSchema }])
  ],
  controllers: [CircunferenciasController],
  providers: [CircunferenciasService],
})
export class CircunferenciasModule {}
