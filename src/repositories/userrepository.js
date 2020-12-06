import { EntityRepository } from 'typeorm';
import BaseRepository from './baserepository';
import { Users } from './Models/user';

@EntityRepository(Users)
class UserRepository extends BaseRepository {

  async getOneLogin(data) {
    const { username, password } = data;
    const user = await this.findOne({ where: { username } });
    if (user && user.password === password) {
      return user;
    }
    return {};
  }

  async getOneByName(username) {
    const user = await this.findOne({ where: { username } });
    return user;
  }
}

export default UserRepository;
