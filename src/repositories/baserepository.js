import { Repository } from 'typeorm';

export default class BaseRepository extends Repository {
  async getAll() {
    return await this.find();
  }

  async getOne(id) {
    const result = await this.findOne({ where: { id } });
    return result;
  }

  async addOne(data) {
    const result = await this.create(data);
    return result.save();
  }

  async updateOne(id, data) {
    data.updatedAt = new Date();
    await this.update(id, data);
    const user = await this.findOne({ where: { id } });
    return user;
  }

  async delete(id) {
    const data = { id };
    const user = await this.getOne(id);
    return user.remove({ data });
  }
}
