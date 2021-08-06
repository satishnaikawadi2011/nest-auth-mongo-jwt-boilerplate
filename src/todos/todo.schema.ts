import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';
import * as mongoose from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
	@Prop() title: string;

	@Prop() description: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
