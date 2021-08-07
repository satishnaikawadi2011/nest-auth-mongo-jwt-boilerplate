import { SigninUserDto } from './dtos/signin-user.dto';
import { Body, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from './user.schema';

@Controller('auth')
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	@Post('/register')
	@Serialize(SigninResponseDto)
	createUser(@Body() body: CreateUserDto) {
		return this.authService.signup(body);
	}

	@Post('/signin')
	@Serialize(SigninResponseDto)
	signin(@Body() body: SigninUserDto) {
		return this.authService.signin(body.username, body.password);
	}

	@Get('/me')
	@UseGuards(AuthGuard)
	@Serialize(UserDto)
	whoAmI(@CurrentUser() user: UserDocument) {
		return user;
	}

	@Get('/:id')
	@Serialize(UserDto)
	@UseGuards(AuthGuard)
	async findUser(@Param('id') id: string) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found !');
		}
		return user;
	}

	@Patch('/:id')
	@Serialize(UserDto)
	updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(id, body);
	}

	@Delete('/:id')
	@Serialize(UserDto)
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
