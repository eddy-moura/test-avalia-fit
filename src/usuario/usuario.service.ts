import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) {}

  async criar(dto: CreateUsuarioDto): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(dto.senha, salt);

    return this.usuarioModel.create({
      ...dto,
      senha: senhaCriptografada,
    });
  }

  async listarTodos(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async buscarPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findOne({ email }).exec();

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  async atualizar(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioAtualizado = await this.usuarioModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!usuarioAtualizado) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuarioAtualizado;
  }

  async deletar(id: string): Promise<void> {
    const resultado = await this.usuarioModel.findByIdAndDelete(id).exec();

    if (!resultado) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
