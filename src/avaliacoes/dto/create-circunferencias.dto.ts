import { IsNumber, IsPositive, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateCircunferenciaDto {
  @IsNumber()
  @IsPositive()
  antebraco: number;

  @IsNumber()
  @IsPositive()
  braco: number;

  @IsNumber()
  @IsPositive()
  ombros: number;

  @IsNumber()
  @IsPositive()
  torax: number;

  @IsNumber()
  @IsPositive()
  cintura: number;

  @IsNumber()
  @IsPositive()
  abdomem: number;

  @IsNumber()
  @IsPositive()
  quadril: number;

  @IsNumber()
  @IsPositive()
  coxa: number;

  @IsNumber()
  @IsPositive()
  panturrilha: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  links: string[];
}
