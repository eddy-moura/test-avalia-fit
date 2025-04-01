import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestesFisicosDocument = TestesFisicos & Document;

@Schema({ timestamps: true })
export class TestesFisicos {
  @Prop({ required: true })
  remadaNeutraTRX: number;

  @Prop({ required: true})
  flexaoDeBracos: number;

  @Prop({ required: true })
  abdominais30s : number;

  @Prop({ required: true })
  barraFixaSupinada  : number;

  @Prop({ required: true })
  links  : string[];
}

export const TestesFisicosSchema = SchemaFactory.createForClass(TestesFisicos);
