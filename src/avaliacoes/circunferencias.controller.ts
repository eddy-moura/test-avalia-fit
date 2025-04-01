import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CircunferenciasService } from './circunferencias.service';
import { CreateCircunferenciaDto } from './dto/create-circunferencias.dto';
import { UpdateCircunferenciaDto } from './dto/update-circunferencias.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Circunferencias') // Organiza no Swagger
@Controller('circunferencias')
export class CircunferenciasController {
  constructor(private readonly circunferenciasService: CircunferenciasService) {}

  @Post()
  @ApiBody({
    description: 'Exemplo de criação de circunferências',
    schema: {
      example: {
        antebraco: 30,
        braco: 35,
        ombros: 50,
        torax: 90,
        cintura: 85,
        abdomem: 80,
        quadril: 95,
        coxa: 60,
        panturrilha: 40,
        links: ["https://exemplo.com/imagem1", "https://exemplo.com/imagem2"]
      }
    }
  })
  create(@Body() createCircunferenciaDto: CreateCircunferenciaDto) {
    return this.circunferenciasService.create(createCircunferenciaDto);
  }

  @Get()
  findAll() {
    return this.circunferenciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circunferenciasService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Exemplo de atualização das circunferências',
    schema: {
      example: {
        antebraco: 32,
        braco: 36,
        ombros: 51,
        torax: 91,
        cintura: 84,
        abdomem: 79,
        quadril: 94,
        coxa: 59,
        panturrilha: 41,
        links: ["https://exemplo.com/atualizado1"]
      }
    }
  })
  update(@Param('id') id: string, @Body() updateCircunferenciaDto: UpdateCircunferenciaDto) {
    return this.circunferenciasService.update(id, updateCircunferenciaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.circunferenciasService.delete(id);
  }
}
