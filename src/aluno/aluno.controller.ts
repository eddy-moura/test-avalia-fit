import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto, UpdateAlunoDto } from './dto/aluno.dtos';
import { Aluno } from './schemas/aluno.schema';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async create(
    @Body() createAlunoDto: CreateAlunoDto,
  ): Promise<{ aluno: Aluno; message: string }> {
    try {
      return await this.alunoService.create(createAlunoDto);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao criar o aluno.',
      );
    }
  }

  @Get()
  async findAll(): Promise<Aluno[]> {
    console.log('Buscando todos os alunos...');
    return this.alunoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Aluno> {
    if (typeof id !== 'string') {
      throw new Error('Formato de ID inválido.');
    }
    try {
      console.log(`Buscando aluno com ID: ${id}`);
      return await this.alunoService.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Ocorreu um erro ao buscar o aluno.');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ): Promise<{ aluno: Aluno; message: string }> {
    if (typeof id !== 'string') {
      throw new Error('Formato de ID inválido.');
    }
    try {
      console.log(`✏️ Atualizando aluno com ID: ${id}`, updateAlunoDto);
      return await this.alunoService.update(id, updateAlunoDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Ocorreu um erro ao atualizar o aluno.');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    if (typeof id !== 'string') {
      throw new Error('Formato de ID inválido.');
    }
    try {
      console.log(`Removendo aluno com ID: ${id}`);
      return await this.alunoService.remove(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Ocorreu um erro ao remover o aluno.');
    }
  }
}
