import { IsNumber, IsOptional, IsPositive, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class UpdateCircunferenciaDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  antebraco?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  braco?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  ombros?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  torax?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cintura?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  abdomem?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quadril?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  coxa?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  panturrilha?: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  links?: string[];
}
