import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  criar(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.criar(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  listarTodos() {
    return this.usuarioService.listarTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuarioService.buscarPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.atualizar(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.usuarioService.deletar(id);
  }
}
