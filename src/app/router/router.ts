import { Application, Request, Response } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';

const modulesRouters = [
  {
    path: '/api/auth',
    route: authRoutes,
  },
];

export const routes = (app: Application) => {
  // root route
  app.get('/', (req: Request, res: Response) => {
    res.send('Orion fitness shopping');
  });

  // all routes
  modulesRouters.forEach((router) => app.use(router.path, router.route));

  // not found route
  app.route('*').all((req: Request, res: Response) => {
    res.send({
      success: false,
      statusCode: 404,
      message: 'Not Found',
    });
  });
};
