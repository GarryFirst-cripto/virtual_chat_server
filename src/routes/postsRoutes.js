import { Router } from 'express';
import * as postService from '../services/postServices';

const router = Router();

router
  .get('/:id', (req, res, next) => postService.getPostById(req.params.id)
    .then(post => res.send(post))
    .catch(next))
  .get('/', (req, res, next) => postService.getPosts()
    .then(posts => res.send(posts))
    .catch(next))
  .post('/reaction', (req, res, next) => postService.setPostReaction(req.body)
    .then(post => res.send(post))
    .catch(next))
  .post('/', (req, res, next) => postService.createPost(req.body)
    .then(post => res.send(post))
    .catch(next))
  .put('/', (req, res, next) => postService.updatePost(req.body)
    .then(post => res.send(post))
    .catch(next))
  .delete('/:id', (req, res, next) => postService.deletePost(req.params.id)
    .then(post => res.send(post))
    .catch(next));

export default router;
