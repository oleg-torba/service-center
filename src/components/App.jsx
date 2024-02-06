import { Suspense, lazy } from 'react';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Route, Routes } from 'react-router-dom';
import Loader from './Loader/Loader';
const Home = lazy(() => import('./Pages/Home/Home'));
const Price = lazy(() => import('./Pages/Price/Price'));
const Layout = lazy(() => import('./Layout/Layout'));

export const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes basename="/public_html">
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/price" element={<Price />} />
        </Route>
        <Route path="/*" element={<Home />} />
      </Routes>
      <NotificationContainer />
    </Suspense>
  );
};
