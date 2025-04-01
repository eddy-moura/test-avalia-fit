import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoService } from './avaliacao.service';
import { getModelToken } from '@nestjs/mongoose';
import { AvaliacaoFisica } from './schemas/avaliacao_fisica.schema';

describe('AvaliacaoService', () => {
  let service: AvaliacaoService;

  const mockModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvaliacaoService,
        {
          provide: getModelToken(AvaliacaoFisica.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<AvaliacaoService>(AvaliacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() deve salvar avaliação', async () => {
    const dto = {
      peso: 70,
      estatura: 1.75,
      pressaoArterial: 120,
      frequenciaCardiaca: 75
    };

    mockModel.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockModel.create).toHaveBeenCalledWith(dto);
  });
});
