import { QueryRunner } from "typeorm";
import { chatData } from '../seed-data/chatSeed';

const randomIndex = length => Math.floor(Math.random() * length);

const asyncForEach = async (fn, list) => {
  for (let i = 0; i < list.length; i++) {
    await fn(list[i]);
  }
};

export class tables_data_1606817171037 {
  name = 'tables_data_1606817171037'

  async up(queryRunner) {
    await asyncForEach(async user => {
      const { id, createdAt, username, email, password, admin, status, avatar } = user;
      const createdDate = createdAt.substr(0, 19);
      await queryRunner.query(`INSERT INTO users (id, createdAt, username, email, password, admin, status, avatar) VALUES ('${id}', '${createdDate}', '${username}', '${email}', '${password}', ${admin}, '${status}', '${avatar}')`);
    }, chatData.users);

    await asyncForEach(async post => {
      const { id, createdAt, userId, text } = post;
      const createdDate = createdAt.substr(0, 19);
      await queryRunner.query(`INSERT INTO posts (id, createdAt, userId, text) VALUES ('${id}', '${createdDate}', '${userId}', '${text}')`);
    }, chatData.posts);

    await asyncForEach(async reaction => {
      const { id, createdAt, userId, postId, isLike } = reaction;
      const createdDate = createdAt.substr(0, 19);
      await queryRunner.query(`INSERT INTO reactions (id, createdAt, userId, postId, isLike) VALUES ('${id}', '${createdDate}', '${userId}', '${postId}', ${isLike})`);
    }, chatData.postreactions);
  }

  async down(queryRunner) {
    await queryRunner.query('DELETE FROM reactions');
    await queryRunner.query('DELETE FROM posts');
    await queryRunner.query('DELETE FROM users');
  }

}