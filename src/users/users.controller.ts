import { Body, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post('/register')
	createUser(@Body() body: CreateUserDto) {
		return this.usersService.create(body);
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
