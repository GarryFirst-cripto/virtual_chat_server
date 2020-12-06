import usersRoutes from './usersRoutes';
import postsRoutes from './postsRoutes';

export default app => {
  app.use('/users', usersRoutes);
  app.use('/posts', postsRoutes);
};
