import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Aluno extends Document {
  @Prop({ type: String, required: true })
  nome: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    match: /^(\d{2}-\d{4,5}-\d{4}|\d{10,11})$/,
  })
  telefone: string;

  @Prop({ type: String, unique: true, required: false })
  email?: string;

  @Prop({ type: Date, required: true })
  dataNascimento: Date;

  @Prop({ type: String, required: true, enum: ['Masculino', 'Feminino'] })
  genero: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Avaliacao' }], default: [] })
  avaliacoes: Types.ObjectId[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
