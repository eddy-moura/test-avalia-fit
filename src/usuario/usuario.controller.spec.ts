import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  const mockUsuarioService = {
    criar: jest.fn(),
    listarTodos: jest.fn(),
    buscarPorId: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<UsuarioController>(UsuarioController);
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('criar', () => {
    it('deve criar um novo usuário', async () => {
      const createDto: CreateUsuarioDto = {
        nome: 'Teste',
        email: 'teste@example.com',
        senha: 'senha123',
      };

      const usuarioMock = {
        id: '1',
        ...createDto,
      };

      mockUsuarioService.criar.mockResolvedValue(usuarioMock);

      const result = await controller.criar(createDto);

      expect(mockUsuarioService.criar).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(usuarioMock);
    });
  });

  describe('listarTodos', () => {
    it('deve retornar uma lista de usuários', async () => {
      const usuariosMock = [
        { id: '1', nome: 'Usuário 1', email: 'usuario1@example.com' },
        { id: '2', nome: 'Usuário 2', email: 'usuario2@example.com' },
      ];

      mockUsuarioService.listarTodos.mockResolvedValue(usuariosMock);

      const result = await controller.listarTodos();

      expect(mockUsuarioService.listarTodos).toHaveBeenCalled();
      expect(result).toEqual(usuariosMock);
    });

    it('deve retornar uma lista vazia quando não houver usuários', async () => {
      mockUsuarioService.listarTodos.mockResolvedValue([]);

      const result = await controller.listarTodos();

      expect(mockUsuarioService.listarTodos).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar um usuário pelo ID', async () => {
      const usuarioMock = {
        id: '1',
        nome: 'Usuário Teste',
        email: 'teste@example.com',
      };

      mockUsuarioService.buscarPorId.mockResolvedValue(usuarioMock);

      const result = await controller.buscarPorId('1');

      expect(mockUsuarioService.buscarPorId).toHaveBeenCalledWith('1');
      expect(result).toEqual(usuarioMock);
    });

    it('deve retornar null quando o usuário não for encontrado', async () => {
      mockUsuarioService.buscarPorId.mockResolvedValue(null);

      const result = await controller.buscarPorId('999');

      expect(mockUsuarioService.buscarPorId).toHaveBeenCalledWith('999');
      expect(result).toBeNull();
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um usuário existente', async () => {
      const updateDto: UpdateUsuarioDto = {
        nome: 'Usuário Atualizado',
        email: 'atualizado@example.com',
      };

      const usuarioAtualizadoMock = {
        id: '1',
        ...updateDto,
      };

      mockUsuarioService.atualizar.mockResolvedValue(usuarioAtualizadoMock);

      const result = await controller.atualizar('1', updateDto);

      expect(mockUsuarioService.atualizar).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(usuarioAtualizadoMock);
    });

    it('deve retornar null quando tentar atualizar um usuário inexistente', async () => {
      const updateDto: UpdateUsuarioDto = {
        nome: 'Usuário Inexistente',
        email: 'inexistente@example.com',
      };

      mockUsuarioService.atualizar.mockResolvedValue(null);

      const result = await controller.atualizar('999', updateDto);

      expect(mockUsuarioService.atualizar).toHaveBeenCalledWith(
        '999',
        updateDto,
      );
      expect(result).toBeNull();
    });
  });

  describe('deletar', () => {
    it('deve deletar um usuário existente', async () => {
      mockUsuarioService.deletar.mockResolvedValue(true);

      const result = await controller.deletar('1');

      expect(mockUsuarioService.deletar).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('deve retornar false quando tentar deletar um usuário inexistente', async () => {
      mockUsuarioService.deletar.mockResolvedValue(false);

      const result = await controller.deletar('999');

      expect(mockUsuarioService.deletar).toHaveBeenCalledWith('999');
      expect(result).toBe(false);
    });
  });
});
