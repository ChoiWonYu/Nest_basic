import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from './type/PayloadType';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //PassportStrategy 클래스 상속
  //Strategy인자를 받는다. passport를 사용할 때 기본 strategy가 jwt이기 때문
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository, //토큰이 유효한지 확인한 후 payload 내부 user 이름으로 repository를 통해 resource를 가져올 것이므로 주입해준다.
  ) {
    super({
      //PassportStrategy 클래스를 상속하면 반드시 super를 통해 필수 옵션을 전달해야 한다.
      secretOrKey: 'Secret1234',
      //SecretText
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //Token을 어떤 타입으로 전달 받을 건지에 대한 옵션
    });
  }
  async validate(payload: IPayload) {
    const { userName } = payload;
    const user: User = await this.userRepository.findOneBy({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
    //Guard 미들웨어를 통해 user를 req에서 가져올 수 있다.
  }
}
