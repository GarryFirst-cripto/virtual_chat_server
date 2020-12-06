import { EntityRepository } from "typeorm";
import BaseRepository from './baserepository';
import { Posts } from './Models/post';
import { Reactions } from "./Models/reaction";

@EntityRepository(Posts)
class PostRepository extends BaseRepository {
  async getAllPosts() {
    const posts = await this.createQueryBuilder('post')
    .select('post.*')
    .addSelect("user.username", "username")
    .addSelect("user.status", "status")
    .addSelect("user.avatar", "avatar")
    .addSelect(subQuery => {
        return subQuery
            .select('count(*)')
            .where("reaction.postId = post.id and reaction.isLike = true")
            .from(Reactions, "reaction");
    }, "likes")
    .addSelect(subQuery => {
      return subQuery
          .select('count(*)')
          .where("reaction.postId = post.id and reaction.isLike = false")
          .from(Reactions, "reaction");
    }, "dislikes")
    .leftJoin(
        'post.user',
        'user'
    )
    .getRawMany();

    return posts;
  };
}

export default PostRepository;
