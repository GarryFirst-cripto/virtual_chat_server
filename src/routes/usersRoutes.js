import { Router } from 'express';
import dataUserValid from './middlewares/userMiddleware';
import * as userService from '../services/userServices';
import { uploadImage } from '../services/imageService';
import imageMiddleware from './middlewares/imageMiddlware';

const router = Router();

router
  .get('/:id', (req, res, next) => userService.getUserById(req.params.id)
    .then(user => res.send(user))
    .catch(next))
  .get('/', (req, res, next) => userService.getUsers()
    .then(users => res.send(users))
    .catch(next))
  .post('/login', (req, res, next) => userService.login(req.body)
    .then(user => res.send(user))
    .catch(next))
  .post('/image', imageMiddleware, (req, res, next) => uploadImage(req.file)
    .then(image => res.send(image))
    .catch(next))
  .post('/', dataUserValid, (req, res, next) => userService.createUser(req.body, res.data)
    .then(user => res.send(user))
    .catch(next))
  .put('/:id', dataUserValid, (req, res, next) => userService.updateUser(req.params.id, req.body, res.data)
    .then(user => res.send(user))
    .catch(next))
  .delete('/:id', (req, res, next) => userService.deleteUser(req.params.id)
    .then(user => res.send(user))
    .catch(next));

export default router;
