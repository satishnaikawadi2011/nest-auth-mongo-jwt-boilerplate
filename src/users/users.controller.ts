import { Body, Delete, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('/register')
	createUser(@Body() body: CreateUserDto) {
		return this.usersService.create(body);
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
