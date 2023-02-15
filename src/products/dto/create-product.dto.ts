import { IsNotEmpty, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 64)
  name: string;

  @IsNotEmpty()
  @Min(5)
  price: number;
}
