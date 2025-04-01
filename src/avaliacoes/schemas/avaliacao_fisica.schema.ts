import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvaliacaoFisicaDocument = AvaliacaoFisica & Document;

@Schema({ timestamps: true })
export class AvaliacaoFisica {
  @Prop({ required: true })
  peso: number;

  @Prop({ required: true })
  estatura: number;

  @Prop({ required: true })
  pressaoArterial : number;

  @Prop({ required: true })
  frequenciaCardiaca  : number;

}

export const AvaliacaoFisicaSchema = SchemaFactory.createForClass(AvaliacaoFisica);
