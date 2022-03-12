import { IsEmail, IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
