import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports:
		[
			MongooseModule.forFeature([
				{ name: User.name, schema: UserSchema }
			]),
			JwtModule.register({
				secret: 'thisismysecret',
				signOptions: { expiresIn: '7d' }
			})
		],
	providers:
		[
			UsersService,
			AuthService
		],
	controllers:
		[
			UsersController
		]
})
export class UsersModule {}
