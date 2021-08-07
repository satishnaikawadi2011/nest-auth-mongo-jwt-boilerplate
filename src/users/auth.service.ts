import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService
	) {}

	async hashPassword(password: string): Promise<string> {
		const salt = randomBytes(8).toString('hex');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		const result = `${salt}.${hash.toString('hex')}`;
		return result;
	}

	private async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
		const [
			salt,
			storedHash
		] = hashedPassword.split('.');

		const hash = (await scrypt(plainPassword, salt, 32)) as Buffer;

		if (storedHash !== hash.toString('hex')) {
			return false;
		}
		return true;
	}

	async signup({ email, password, username }: CreateUserDto) {
		const usersByEmailorUsername = await this.usersService.findByEmailOrUsername(email, username);
		if (usersByEmailorUsername.length) {
			throw new BadRequestException('Email or username already in use !');
		}

		// TODO: Generate salt and hash the password
		const hashedPassword = await this.hashPassword(password);

		const user = await this.usersService.create({ email, username, password: hashedPassword });

		return user;
	}

	async signin(username: string, password: string) {
		const [
			user
		] = await this.usersService.find({ username });

		if (!user) {
			throw new NotFoundException('User not found !');
		}

		const isValid = await this.verifyPassword(user.password, password);

		if (!isValid) {
			throw new BadRequestException('Invalid credentials !');
		}

		return user;
	}
}
