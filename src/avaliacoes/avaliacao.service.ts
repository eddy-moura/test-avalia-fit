import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AvaliacaoFisica, AvaliacaoFisicaDocument } from './schemas/avaliacao_fisica.schema';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectModel(AvaliacaoFisica.name)
    private readonly avaliacaoModel: Model<AvaliacaoFisicaDocument>,
  ) {}

  /** 🔹 Criar uma nova Avaliação Física */
  async create(createAvaliacaoDto: CreateAvaliacaoDto): Promise<AvaliacaoFisica> {
    console.log('🟢 Criando Avaliação Física:', createAvaliacaoDto);
    return this.avaliacaoModel.create(createAvaliacaoDto);

  }

  /** 🔹 Buscar todas as Avaliações Físicas */
  async findAll(): Promise<AvaliacaoFisica[]> {
    return this.avaliacaoModel.find().exec();
  }

  /** 🔹 Buscar uma Avaliação Física pelo ID */
  async findOne(id: string): Promise<AvaliacaoFisica> {
    const avaliacao = await this.avaliacaoModel.findById(id).exec();
    if (!avaliacao) {
      throw new NotFoundException(`⚠️ Avaliação Física com ID ${id} não encontrada.`);
    }
    return avaliacao;
  }

  /** 🔹 Atualizar uma Avaliação Física */
  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto): Promise<AvaliacaoFisica> {
    const avaliacao = await this.avaliacaoModel
      .findByIdAndUpdate(id, updateAvaliacaoDto, { new: true })
      .exec();

    if (!avaliacao) {
      throw new NotFoundException(`⚠️ Avaliação Física com ID ${id} não encontrada.`);
    }
    return avaliacao;
  }

  /** 🔹 Deletar uma Avaliação Física */
  async delete(id: string): Promise<{ message: string }> {
    const avaliacao = await this.avaliacaoModel.findByIdAndDelete(id).exec();
    if (!avaliacao) {
      throw new NotFoundException(`⚠️ Avaliação Física com ID ${id} não encontrada.`);
    }
    return { message: '✅ Avaliação Física removida com sucesso!' };
  }
}
