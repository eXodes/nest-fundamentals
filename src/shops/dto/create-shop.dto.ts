import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({
    description: 'The name of the shop',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The link to the shop',
  })
  @IsString()
  readonly link: string;

  @IsString({ each: true })
  readonly categories: string[];

  @IsString()
  readonly city: string;

  @IsString()
  readonly state: string;
}
