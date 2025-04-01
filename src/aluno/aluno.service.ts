import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aluno } from './schemas/aluno.schema';
import { CreateAlunoDto, UpdateAlunoDto } from './dto/aluno.dtos';

@Injectable()
export class AlunoService {
  constructor(@InjectModel(Aluno.name) private alunoModel: Model<Aluno>) {}

  async create(
    createAlunoDto: CreateAlunoDto,
  ): Promise<{ aluno: Aluno; message: string }> {
    const alunoExistente = await this.alunoModel.findOne({
      telefone: createAlunoDto.telefone,
      usuarioId: createAlunoDto.usuarioId,
    });

    if (alunoExistente) {
      throw new Error(
        'Já existe um aluno com este telefone para este usuário.',
      );
    }

    const aluno = new this.alunoModel(createAlunoDto);
    await aluno.save();

    return { aluno, message: 'Aluno criado com sucesso!' };
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunoModel.find().exec();
  }

  async findById(id: string): Promise<Aluno> {
    const aluno = await this.alunoModel.findById(id).exec();
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  async update(
    id: string,
    updateAlunoDto: UpdateAlunoDto,
  ): Promise<{ aluno: Aluno; message: string }> {
    const aluno = await this.alunoModel
      .findOneAndUpdate({ _id: id }, updateAlunoDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return { aluno, message: 'Aluno atualizado com sucesso!' };
  }

  async remove(id: string): Promise<{ message: string }> {
    const aluno = await this.alunoModel.findByIdAndDelete(id).exec();
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return { message: 'Aluno removido com sucesso!' };
  }
}
