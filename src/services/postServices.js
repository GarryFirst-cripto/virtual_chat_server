import { getCustomRepository } from 'typeorm';
import postRepository from '../repositories/postrepository';
import reactionRepository from '../repositories/reactionrepository';

export const getPosts = async () => {
  const result = await getCustomRepository(postRepository).getAllPosts();
  return result;
};

export const getPostById = async id => {
  const post = await getCustomRepository(postRepository).getOne(id);
  return post;
};

export const createPost = async post => {
  const result = await getCustomRepository(postRepository).addOne(post);
  return result;
};

export const updatePost = async post => {
  const { id } = post;
  const result = await getCustomRepository(postRepository).updateOne(id, post);
  return result;
};

export const deletePost = async postId => {
  const result = await getCustomRepository(postRepository).delete(postId);
  return result;
};

export const setPostReaction = async data => {
  const { userId, postId, isLike } = data;
  const reaction = await getCustomRepository(reactionRepository).getReaction({ userId, postId });
  if (!reaction) {
    getCustomRepository(reactionRepository).addOne(data);
    if (isLike) {
      return { newLike: 1, newDislake: 0 };
    }
    return { newLike: 0, newDislake: 1 };
  }
  if (reaction.isLike === isLike) {
    getCustomRepository(reactionRepository).delete(reaction.id);
    if (isLike) {
      return { newLike: -1, newDislake: 0 };
    }
    return { newLike: 0, newDislake: -1 };
  }
  getCustomRepository(reactionRepository).updateOne(reaction.id, { isLike });
  if (isLike) {
    return { newLike: 1, newDislake: -1 };
  }
  return { newLike: -1, newDislake: 1 };
};
