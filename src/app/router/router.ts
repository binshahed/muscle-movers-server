import { Application, Request, Response } from 'express';
import { productRouter } from '../modules/product/product.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { brandRouter } from '../modules/brand/brand.routes';
import { categoryRouter } from '../modules/category/category.routes';
import { orderRouter } from '../modules/order/order.routes';

const modulesRouters = [
  {
    path: '/api/auth',
    route: authRoutes,
  },
  {
    path: '/api/products',
    route: productRouter,
  },
  {
    path: '/api/brand',
    route: brandRouter,
  },
  {
    path: '/api/category',
    route: categoryRouter,
  },
  {
    path: '/api/order',
    route: orderRouter,
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
