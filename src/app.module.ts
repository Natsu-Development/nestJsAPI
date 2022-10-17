import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestJs_exp'),
  ],
})
export class AppModule {}
