import { Test, TestingModule } from '@nestjs/testing';
import { CircunferenciasService } from './circunferencias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Circunferencias } from './schemas/circunferencias.schema';

describe('CircunferenciasService', () => {
  let service: CircunferenciasService;

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
        CircunferenciasService,
        {
          provide: getModelToken(Circunferencias.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<CircunferenciasService>(CircunferenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() deve salvar circunferência', async () => {
    const dto = {
      antebraco: 30,
      braco: 35,
      ombros: 50,
      torax: 90,
      cintura: 85,
      abdomem: 80,
      quadril: 95,
      coxa: 60,
      panturrilha: 40,
      links: ['https://exemplo.com']
    };

    mockModel.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockModel.create).toHaveBeenCalledWith(dto);
  });
});
