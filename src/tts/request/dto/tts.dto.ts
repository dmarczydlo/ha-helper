import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TtsDto {
  @IsString()
  @Length(2, 4000)
  @IsNotEmpty()
  text: string;
}
