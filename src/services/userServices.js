import { getCustomRepository } from 'typeorm';
import userRepository from '../repositories/userrepository';

export const getUsers = async () => {
  const users = await getCustomRepository(userRepository).getAll();
  return users;
};

export const getUserById = async id => {
  const user = getCustomRepository(userRepository).getOne(id);
  return user;
};

export const login = async body => {
  const user = await getCustomRepository(userRepository).getOneLogin(body);
  return { user };
};

export const createUser = async (body, data) => {
  if (data.error === true) {
    const { text } = data;
    return { message: text };
  }
  const user = await getCustomRepository(userRepository).addOne(body);
  return { user, message: '' };
};

export const updateUser = async (userId, user, data) => {
  if (data.error === true) {
    const { text } = data;
    return { message: text };
  }
  const updUser = await getCustomRepository(userRepository).updateOne(userId, user);
  return { user: updUser, message: '' };
};

export const deleteUser = async userId => {
  const result = await getCustomRepository(userRepository).delete(userId);
  return result;
};
