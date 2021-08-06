import { IsString, MaxLength, MinLength } from 'class-validator';

export class SigninUserDto {
	@MinLength(4)
	@IsString()
	username: string;

	@IsString()
	@MinLength(6)
	@MaxLength(12)
	password: string;
}
