import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CircunferenciasaDocument = Circunferencias & Document;

@Schema({ timestamps: true })
export class Circunferencias {
  @Prop({ required: true })
  antebraco: number;

  @Prop({ required: true})
  braco: number;

  @Prop({ required: true })
  ombros : number;

  @Prop({ required: true })
  torax  : number;
  
  @Prop({ required: true })
  cintura  : number;
  
  @Prop({ required: true })
  abdomem  : number;
  
  @Prop({ required: true })
  quadril  : number;
  
  @Prop({ required: true })
  coxa  : number;
  
  @Prop({ required: true })
  panturrilha  : number;

  @Prop({ required: true })
  links  : string[];  
}

export const CircunferenciasSchema = SchemaFactory.createForClass(Circunferencias);
