import { SigninUserDto } from './dtos/signin-user.dto';
import { Body, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Post('/register')
	createUser(@Body() body: CreateUserDto) {
		return this.authService.signup(body);
	}

	@Post('/signin')
	signin(@Body() body: SigninUserDto) {
		return this.authService.signin(body.username, body.password);
	}

	@Get('/:id')
	async findUser(@Param('id') id: string) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found !');
		}
		return user;
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(id, body);
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
