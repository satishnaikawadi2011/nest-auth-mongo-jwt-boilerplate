import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports:
		[
			MongooseModule.forFeature([
				{ name: Todo.name, schema: TodoSchema }
			]),
			JwtModule.register({
				secret: 'thisismysecret',
				signOptions: { expiresIn: '7d' }
			}),
			UsersModule
		],
	providers:
		[
			TodosService
		],
	controllers:
		[
			TodosController
		]
})
export class TodosModule {}
