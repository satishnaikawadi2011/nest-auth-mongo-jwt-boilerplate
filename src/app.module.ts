import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports:
		[
			MongooseModule.forRoot(`mongodb+srv://satishnaikawadi:satish2001@cluster0.ebdzk.mongodb.net/nest-auth-mongo-jwt-boilerplate
?retryWrites=true&w=majority`)
		],
	controllers:
		[
			AppController
		],
	providers:
		[
			AppService
		]
})
export class AppModule {}
