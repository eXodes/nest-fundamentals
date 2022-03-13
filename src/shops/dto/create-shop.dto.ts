import { IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly link: string;

  @IsString({ each: true })
  readonly categories: string[];

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;
}
