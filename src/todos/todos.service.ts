import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Todo } from './todo.schema';

@Injectable()
export class TodosService {
	constructor(@InjectModel(Todo.name) private model: Model<Todo>, private usersService: UsersService) {}

	async create(todoDto: CreateTodoDto, user: User) {
		const todo = await this.model.create(todoDto);
		todo.user = user;
		const [
			u
		] = await this.usersService.find({ username: user.username });
		u.todos.push(todo._id);
		await u.save();
		const savedTodo = await todo.save();
		return { ...todo.toObject(), user: savedTodo._id };
	}
}
