import { getCustomRepository } from 'typeorm';
import userRepository from '../../repositories/userrepository';

async function testUserName(name) {
  const user = await getCustomRepository(userRepository).getOneByName(name);
  console.log(user);
  if (user) {
    return { error: true, text: 'User with such UserName allready exists !', status: 403 };
  }
  return { error: false, text: '', status: 200 };
}

function testLenUserName(value) {
  return (value && value.length > 1)
    ? { error: false, text: '', status: 200 }
    : { error: true, text: 'Name to short !', status: 403 };
}

function testUserPassword(pass) {
  if ((pass) && (pass.length < 5)) {
    return { error: true, text: 'Your password to short !', status: 403 };
  }
  return { error: false, text: '', status: 200 };
}

const dataUserValid = async (req, res, next) => {
  try {
    if (req.body) {
      const {
        id,
        username,
        password
      } = req.body;
      if (!id || id === '') {
        res.data = await testUserName(username);
      } else {
        res.data = testLenUserName(username);
      }
      if (res.data.error !== true) {
        res.data = testUserPassword(password);
      }
    } else {
      res.data = { error: true, text: 'No data in request !', status: 404 };
    }
    next();
  } catch (error) {
    res.data = { error: true, text: error, status: 404 };
    next();
  }
};

export default dataUserValid;
