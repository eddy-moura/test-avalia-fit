import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe('AuthService', () => {
  let authService: AuthService;

  const jwtServiceMock = {
    sign: jest.fn().mockReturnValue('some_token'),
  };

  const usuarioServiceMock = {
    buscarPorEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('deve ser definido', () => {
    expect(authService).toBeDefined();
  });

  it('deve chamar UsuarioService.buscarPorEmail e retornar um token', async () => {
    const loginDto: LoginDto = { email: 'test@test.com', senha: 'password123' };

    const usuarioMock = { email: 'test@test.com', senha: 'hashedpassword' };
    usuarioServiceMock.buscarPorEmail.mockResolvedValue(usuarioMock);

    const result = await authService.login(loginDto);

    expect(usuarioServiceMock.buscarPorEmail).toHaveBeenCalledWith(
      loginDto.email,
    );
    expect(result).toEqual({ access_token: 'some_token' });
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      email: usuarioMock.email,
      sub: usuarioMock.email,
    });
  });

  it('deve lançar UnauthorizedException se as credenciais forem inválidas', async () => {
    const loginDto: LoginDto = {
      email: 'wrong@test.com',
      senha: 'wrongpassword',
    };

    usuarioServiceMock.buscarPorEmail.mockResolvedValue(null);

    await expect(authService.login(loginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
