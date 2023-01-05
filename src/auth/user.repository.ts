import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async CreateUser(authCredentialDto: AuthCredentialDto) {
    const { userName, password } = authCredentialDto;
    const user = this.create({ userName, password });
    await this.save(user);
  }
}
