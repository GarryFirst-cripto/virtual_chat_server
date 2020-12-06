import { EntityRepository } from 'typeorm';
import BaseRepository from './baserepository';
import { Reactions } from './Models/reaction';

@EntityRepository(Reactions)
class ReactionRepository extends BaseRepository {

  async getReaction(data) {
    const result = await this.findOne({ where: data });
    return result;
  }
}

export default ReactionRepository;
