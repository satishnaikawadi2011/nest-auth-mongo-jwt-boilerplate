import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
	@MinLength(4)
	@IsString()
	username: string;

	@IsEmail() email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(12)
	password: string;
}
