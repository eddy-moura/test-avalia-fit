import { Test, TestingModule } from '@nestjs/testing';
import { TestesFisicosService } from './testes-fisicos.service';
import { getModelToken } from '@nestjs/mongoose';
import { TestesFisicos } from './schemas/testes_fisicos.schema';

describe('TestesFisicosService', () => {
  let service: TestesFisicosService;

  const mockModel = {
    new: jest.fn().mockResolvedValue({}),
    constructor: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestesFisicosService,
        {
          provide: getModelToken(TestesFisicos.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<TestesFisicosService>(TestesFisicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() deve chamar o model e retornar o novo teste', async () => {
    const dto = {
      remadaNeutraTRX: 10,
      flexaoDeBracos: 15,
      abdominais30s: 20,
      barraFixaSupinada: 5,
      links: ['https://teste.com']
    };

    mockModel.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockModel.create).toHaveBeenCalledWith(dto);
  });
});
