import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  const authServiceMock = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('deve ser definido', () => {
    expect(authController).toBeDefined();
  });

  it('deve chamar o AuthService.login ao chamar authController.login', async () => {
    const loginDto: LoginDto = { email: 'test@test.com', senha: 'password123' };

    const resultadoMock = { token: 'some_token' };
    authServiceMock.login.mockResolvedValue(resultadoMock);

    const result = await authController.login(loginDto);

    expect(authServiceMock.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual(resultadoMock);
  });

  it('deve lançar erro caso o login falhe', async () => {
    const loginDto: LoginDto = {
      email: 'wrong@test.com',
      senha: 'wrongpassword',
    };

    authServiceMock.login.mockRejectedValue(
      new NotFoundException('Usuário não encontrado'),
    );

    await expect(authController.login(loginDto)).rejects.toThrow(
      NotFoundException,
    );
  });
});
