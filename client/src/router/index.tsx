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
const Catalog = React.lazy(() => import('../pages/Catalog/Catalog'));
const Order = React.lazy(() => import('../pages/Cart/Order'));
const Customer = React.lazy(() => import('../pages/Customer/Customer'));
const CustomerOrder = React.lazy(() => import('../pages/CustomerOrder/CustomerOrder'));
const CustomerReview = React.lazy(() => import('../pages/CustomerReview/CustomerReview'));
const CustomerAnswer = React.lazy(() => import('../pages/CustomerAnswer/CustomerAnswer'));
const CheckoutPage= React.lazy(()=> import('../pages/CheckoutPage/CheckoutPage'))

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
        <Route path={AppRoutes.Catalog} element={<Catalog />} />
        <Route path={AppRoutes.Order.Path} element={<Order />} />
        <Route path={AppRoutes.Order.Children.Checkout} element={<CheckoutPage />} />
        <Route path={AppRoutes.Profile.Path} element={<Customer />} />
        <Route path={AppRoutes.Profile.Children.Order} element={<CustomerOrder />} /> 
        <Route path={AppRoutes.Profile.Children.Answer} element={<CustomerAnswer />} />
        <Route path={AppRoutes.Profile.Children.Review} element={<CustomerReview />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
