import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { TestesFisicosService } from './testes-fisicos.service';
import { CreateTesteFisicoDto } from './dto/create-teste-fisico.dto';
import { UpdateTesteFisicoDto } from './dto/update-teste-fisico.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Testes Físicos')
@Controller('testes-fisicos')
export class TestesFisicosController {
  constructor(private readonly service: TestesFisicosService) {}

  @Post()
  @ApiBody({
    description: 'Exemplo de criação de teste físico',
    schema: {
      example: {
        remadaNeutraTRX: 12,
        flexaoDeBracos: 20,
        abdominais30s: 30,
        barraFixaSupinada: 10,
        links: [
          "https://video.exemplo.com/teste1",
          "https://video.exemplo.com/teste2"
        ]
      }
    }
  })
  create(@Body() dto: CreateTesteFisicoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTesteFisicoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
