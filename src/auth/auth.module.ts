import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
