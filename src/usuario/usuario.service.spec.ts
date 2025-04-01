import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsuarioService } from './usuario.service';
import { Usuario } from './schemas/usuario.schema';
import { NotFoundException } from '@nestjs/common';

const mockUsuario = {
  _id: '1',
  nome: 'Teste',
  email: 'teste@example.com',
  senha: 'hashedpassword',
};

const mockUsuarioModel = {
  create: jest.fn().mockResolvedValue(mockUsuario),
  find: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue([mockUsuario]) }),
  findById: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsuario) }),
  findOne: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsuario) }),
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsuario) }),
  findByIdAndDelete: jest
    .fn()
    .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUsuario) }),
};

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: getModelToken(Usuario.name), useValue: mockUsuarioModel },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um usuário', async () => {
    const dto = {
      nome: 'Teste',
      email: 'teste@example.com',
      senha: 'senha123',
    };
    const result = await service.criar(dto);
    expect(result).toEqual(mockUsuario);
    expect(mockUsuarioModel.create).toHaveBeenCalledWith({
      ...dto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      senha: expect.any(String),
    });
  });

  it('deve listar todos os usuários', async () => {
    const usuarios = [{ nome: 'User1', email: 'user1@email.com' }];
    mockUsuarioModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue(usuarios),
    });

    const result = await service.listarTodos();

    expect(mockUsuarioModel.find).toHaveBeenCalled();
    expect(result).toEqual(usuarios);
  });

  it('deve buscar um usuário por ID', async () => {
    const usuario = { nome: 'User1', email: 'user1@email.com' };
    mockUsuarioModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(usuario),
    });

    const result = await service.buscarPorId('1');

    expect(mockUsuarioModel.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(usuario);
  });

  it('deve lançar erro ao buscar um usuário por ID inexistente', async () => {
    mockUsuarioModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    await expect(service.buscarPorId('1')).rejects.toThrow(NotFoundException);
  });
});
