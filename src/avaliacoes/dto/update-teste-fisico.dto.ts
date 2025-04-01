import { IsNumber, IsOptional, IsPositive, IsArray, IsString } from 'class-validator';

export class UpdateTesteFisicoDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  remadaNeutraTRX?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  flexaoDeBracos?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  abdominais30s?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  barraFixaSupinada?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  links?: string[];
}
