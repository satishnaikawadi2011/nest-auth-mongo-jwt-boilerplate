import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private usersService: UsersService) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest();
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			try {
				const token = req.headers.authorization.split(' ')[1];
				console.log('Got token', token);
				const decoded = await this.jwtService.verifyAsync(token, { secret: 'thisismysecret' });
				req.user = await this.usersService.findOne(decoded.id);
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		}
		else {
			console.log('No header');
			return false;
		}
	}
}
