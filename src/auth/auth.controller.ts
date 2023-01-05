import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/AuthCredentialDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }
  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }
}
