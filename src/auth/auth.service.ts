import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  private async compareSenha(
    senha: string,
    senhaHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(senha, senhaHash);
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioService.buscarPorEmail(loginDto.email);

    if (!usuario || !(await this.compareSenha(loginDto.senha, usuario.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: usuario.email, sub: usuario.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
