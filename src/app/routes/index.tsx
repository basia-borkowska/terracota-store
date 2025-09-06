import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { pathnames } from '../../shared/lib/pathnames';

const AppLayout = lazy(() => import('./AppLayout'));
const CheckoutLayout = lazy(() => import('./checkout/CheckoutLayout'));

const Home = lazy(() => import('./Home'));
const Products = lazy(() => import('./Products'));
const Product = lazy(() => import('./Product'));
const Compare = lazy(() => import('./Compare'));
const Favorites = lazy(() => import('./Favorites'));
const Cart = lazy(() => import('./checkout/Cart'));
const Shipping = lazy(() => import('./checkout/Shipping'));
const Payment = lazy(() => import('./checkout/Payment'));
const Review = lazy(() => import('./checkout/Review'));
const Confirmation = lazy(() => import('./checkout/Confirmation'));
const NotFound = lazy(() => import('./NotFound'));

export const router = createBrowserRouter([
  {
    path: pathnames.home,
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: pathnames.products, element: <Products /> },
      { path: pathnames.product, element: <Product /> },
      { path: pathnames.compare, element: <Compare /> },
      { path: pathnames.favorites, element: <Favorites /> },
      {
        path: pathnames.checkout.root,
        element: <CheckoutLayout />,
        children: [
          { index: true, element: <Cart /> },
          {
            path: pathnames.checkout.shipping,
            element: <Shipping />,
          },
          {
            path: pathnames.checkout.payment,
            element: <Payment />,
          },
          { path: pathnames.checkout.review, element: <Review /> },
          {
            path: pathnames.checkout.confirmation,
            element: <Confirmation />,
          },
        ],
      },
      { path: pathnames.notFound, element: <NotFound /> },
    ],
  },
]);
