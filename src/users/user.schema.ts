import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Todo } from 'src/todos/todo.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ unique: true })
	username: string;

	@Prop({ unique: true })
	email: string;

	@Prop() password: string;

	@Prop({
		type:
			[
				{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }
			]
	})
	todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
