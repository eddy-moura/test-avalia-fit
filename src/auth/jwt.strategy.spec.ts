import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioService } from '../usuario/usuario.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  const usuarioServiceMock = {
    buscarPorEmail: jest.fn(),
  };

  const configServiceMock = {
    get: jest.fn().mockReturnValue('secretKey'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('deve ser definido', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('deve chamar UsuarioService.buscarPorEmail ao validar o payload', async () => {
    const payload = { email: 'test@test.com' };
    const usuarioMock = { email: 'test@test.com', senha: 'hashedpassword' };

    usuarioServiceMock.buscarPorEmail.mockResolvedValue(usuarioMock);

    const result = await jwtStrategy.validate(payload);

    expect(usuarioServiceMock.buscarPorEmail).toHaveBeenCalledWith(
      payload.email,
    );
    expect(result).toEqual(usuarioMock);
  });

  it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
    const payload = { email: 'wrong@test.com' };

    usuarioServiceMock.buscarPorEmail.mockResolvedValue(null);

    await expect(jwtStrategy.validate(payload)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('deve retornar o usuário se encontrado', async () => {
    const payload = { email: 'test@test.com' };
    const usuarioMock = { email: 'test@test.com', senha: 'hashedpassword' };

    usuarioServiceMock.buscarPorEmail.mockResolvedValue(usuarioMock);

    const result = await jwtStrategy.validate(payload);

    expect(result).toEqual(usuarioMock);
  });
});
