import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EditorModule } from './editor/editor.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        env === 'production' ? '.env.production' : '.env.development',
    }),
    AuthModule,
    UserModule,
    EditorModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
