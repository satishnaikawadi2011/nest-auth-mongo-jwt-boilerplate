import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.schema';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoDto } from './dtos/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
	constructor(private todoService: TodosService) {}

	@Post()
	@UseGuards(AuthGuard)
	@Serialize(TodoDto)
	createTodo(@Body() body: CreateTodoDto, @CurrentUser() user: User) {
		return this.todoService.create(body, user);
	}
}
