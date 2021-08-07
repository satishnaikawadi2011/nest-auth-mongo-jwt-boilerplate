import { Expose, Transform } from 'class-transformer';

export class TodoDto {
	@Expose() _id: string;

	@Expose() title: string;

	@Expose() description: string;

	@Expose() user: string;
}
