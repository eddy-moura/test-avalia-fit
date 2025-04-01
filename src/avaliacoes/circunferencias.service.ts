import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Circunferencias, CircunferenciasaDocument } from './schemas/circunferencias.schema';
import { CreateCircunferenciaDto } from './dto/create-circunferencias.dto';
import { UpdateCircunferenciaDto } from './dto/update-circunferencias.dto';

@Injectable()
export class CircunferenciasService {
  constructor(
    @InjectModel(Circunferencias.name)
    private readonly circunferenciasModel: Model<CircunferenciasaDocument>,
  ) {}

  async create(createCircunferenciaDto: CreateCircunferenciaDto): Promise<Circunferencias> {
    return this.circunferenciasModel.create(createCircunferenciaDto);

  }

  async findAll(): Promise<Circunferencias[]> {
    return this.circunferenciasModel.find().exec();
  }

  async findOne(id: string): Promise<Circunferencias> {
    const circunferencia = await this.circunferenciasModel.findById(id).exec();
    if (!circunferencia) {
      throw new NotFoundException(`Circunferência com ID ${id} não encontrada.`);
    }
    return circunferencia;
  }

  async update(id: string, updateCircunferenciaDto: UpdateCircunferenciaDto): Promise<Circunferencias> {
    const circunferencia = await this.circunferenciasModel
      .findByIdAndUpdate(id, updateCircunferenciaDto, { new: true })
      .exec();

    if (!circunferencia) {
      throw new NotFoundException(`Circunferência com ID ${id} não encontrada.`);
    }
    return circunferencia;
  }

  async delete(id: string): Promise<{ message: string }> {
    const circunferencia = await this.circunferenciasModel.findByIdAndDelete(id).exec();
    if (!circunferencia) {
      throw new NotFoundException(`Circunferência com ID ${id} não encontrada.`);
    }
    return { message: 'Circunferência removida com sucesso!' };
  }
}
