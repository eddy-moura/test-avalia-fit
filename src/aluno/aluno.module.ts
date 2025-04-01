import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { Aluno, AlunoSchema } from './schemas/aluno.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Aluno.name, schema: AlunoSchema }]),
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
