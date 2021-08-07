import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize(dto: any) {
	return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: any) {}

	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		// TODO: Run something before a request is handled by the request handler

		return handler.handle().pipe(
			map((data: any) => {
				// TODO: Run something before the response is sent out
				return plainToClass(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}
