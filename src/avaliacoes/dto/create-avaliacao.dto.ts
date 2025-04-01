import { IsNumber, IsPositive } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNumber()
  @IsPositive()
  peso: number;

  @IsNumber()
  @IsPositive()
  estatura: number;

  @IsNumber()
  @IsPositive()
  pressaoArterial: number;

  @IsNumber()
  @IsPositive()
  frequenciaCardiaca: number;
}
