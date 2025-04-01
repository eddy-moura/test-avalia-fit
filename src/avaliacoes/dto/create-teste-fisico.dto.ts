import { IsNumber, IsPositive, IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateTesteFisicoDto {
  @IsNumber()
  @IsPositive()
  remadaNeutraTRX: number;

  @IsNumber()
  @IsPositive()
  flexaoDeBracos: number;

  @IsNumber()
  @IsPositive()
  abdominais30s: number;

  @IsNumber()
  @IsPositive()
  barraFixaSupinada: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  links: string[];
}
    