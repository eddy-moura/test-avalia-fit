import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestesFisicos, TestesFisicosDocument } from './schemas/testes_fisicos.schema';
import { CreateTesteFisicoDto } from './dto/create-teste-fisico.dto';
import { UpdateTesteFisicoDto } from './dto/update-teste-fisico.dto';

@Injectable()
export class TestesFisicosService {
  constructor(
    @InjectModel(TestesFisicos.name)
    private readonly testesFisicosModel: Model<TestesFisicosDocument>,
  ) {}

  async create(createDto: CreateTesteFisicoDto): Promise<TestesFisicos> {
    return this.testesFisicosModel.create(createDto);
  }

  async findAll(): Promise<TestesFisicos[]> {
    return this.testesFisicosModel.find().exec();
  }

  async findOne(id: string): Promise<TestesFisicos> {
    const found = await this.testesFisicosModel.findById(id).exec();
    if (!found) throw new NotFoundException(`Teste Físico ID ${id} não encontrado.`);
    return found;
  }

  async update(id: string, updateDto: UpdateTesteFisicoDto): Promise<TestesFisicos> {
    const updated = await this.testesFisicosModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Teste Físico ID ${id} não encontrado.`);
    return updated;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleted = await this.testesFisicosModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Teste Físico ID ${id} não encontrado.`);
    return { message: 'Teste Físico deletado com sucesso!' };
  }
}
