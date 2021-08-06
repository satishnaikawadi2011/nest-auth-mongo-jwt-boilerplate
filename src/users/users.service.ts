import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

interface FindAttrs {
	email: string;
	username: string;
}

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

	create(createUserDto: CreateUserDto): Promise<User> {
		const user = new this.model(createUserDto);

		return user.save();
	}

	findOne(id: string) {
		if (!id) return null;
		return this.model.findById(id);
	}

	find(attrs: Partial<FindAttrs>) {
		return this.model.find(attrs);
	}

	findByEmailOrUsername(email: string, username: string) {
		return this.model.find({
			$or:
				[
					{ email },
					{ username }
				]
		});
	}

	async update(id: string, attrs: Partial<User>) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		Object.assign(user, attrs);
		return user.save();
	}

	async remove(id: string) {
		const user = await this.findOne(id);
		if (!user) {
			throw new NotFoundException('user not found!');
		}
		return user.remove();
	}
}
