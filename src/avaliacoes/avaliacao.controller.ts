import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Avaliacao') // Adiciona grupo no Swagger
@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  @ApiBody({
    description: 'Exemplo de criação de avaliação física',
    schema: {
      example: {
        peso: 75.2,
        estatura: 1.80,
        pressaoArterial: 120,
        frequenciaCardiaca: 78
      }
    }
  })
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Exemplo de atualização da avaliação física',
    schema: {
      example: {
        peso: 76.0,
        estatura: 1.80,
        pressaoArterial: 118,
        frequenciaCardiaca: 76
      }
    }
  })
  update(@Param('id') id: string, @Body() updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.avaliacaoService.delete(id);
  }
}
