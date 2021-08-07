import { Expose } from 'class-transformer';

export class SigninResponseDto {
	@Expose() id: string;

	@Expose() username: string;

	@Expose() email: string;

	@Expose() token: string;

	@Expose() todos: string[];
}
