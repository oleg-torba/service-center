import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { RegisterForm } from './Registration/Register';
import { LoginForm } from './Registration/Login';
import { PrivateRoute } from './Routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from './Registration/LogOut';
import { lazy } from 'react';
import { getCurrentUserAction } from '../Redux/AuthorizationApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useFetchCurrentUserQuery } from '../Redux/AuthorizationApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';
const Home = lazy(() => import('./Pages/Home/Home'));
const Price = lazy(() => import('./Pages/Price/Price'));
const Layout = lazy(() => import('./Layout/Layout'));
export const App = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: result, isSuccess } = useFetchCurrentUserQuery(
    token ? token : skipToken
  );
  useEffect(() => {
    if (isSuccess) {
      dispatch(getCurrentUserAction(result));
    }
  }, [isSuccess, result, dispatch, navigate]);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path="price"
            element={
              <PrivateRoute>
                <Price />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <UserMenu />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};
