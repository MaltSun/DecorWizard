import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './router';
import { CircularProgress, Box } from '@mui/material';

const Main = React.lazy(() => import('../pages/Main/Main'));
const Questions = React.lazy(() => import('../pages/Questions/Questions'));
const Result = React.lazy(() => import('../pages/Result/Result'));
const History = React.lazy(() => import('../pages/GenerationHistory/GenerationHistory'));
const ForgotPassword = React.lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const Authorization = React.lazy(() => import('../pages/Authorization/Authorization'));
const Registration = React.lazy(() => import('../pages/Signup/Signup'));

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <CircularProgress size={200} />
  </Box>
);

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={AppRoutes.Main} element={<Main />} />
        <Route path={AppRoutes.Questions} element={<Questions />} />
        <Route path={AppRoutes.Result} element={<Result />} />
        <Route path={AppRoutes.History} element={<History />} />
        <Route path={AppRoutes.ForgotPassword} element={<ForgotPassword />} />
        <Route path={AppRoutes.Login} element={<Authorization />} />
        <Route path={AppRoutes.Registration} element={<Registration />} />

        <Route path="*" element={<Main />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
