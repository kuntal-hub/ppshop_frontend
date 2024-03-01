import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import AuthLayout from './components/AuthLayout.jsx';
import {
  ErrorPage,
  CInfo,
  Balance,
  Entry,
  Reports,
  ViewCustomer,
  DownloadByDate,
  Account,
  DownloadByCId,
  DownloadByAccountName,
  Login,
  ForgotPassword,
  AdminPanel,
 } from "./index.js";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage/>} >

      <Route path='' element={
      <AuthLayout>
        <CInfo />
      </AuthLayout>} />

      <Route path='balance' element={
      <AuthLayout>
        <Balance />
      </AuthLayout>
      } />

      <Route path='entry' element={
      <AuthLayout>
        <Entry />
      </AuthLayout>
      } />

      <Route path='reports' element={
      <AuthLayout>
        <Reports />
      </AuthLayout>
      } />

      <Route path=':cId' element={
      <AuthLayout>
        <ViewCustomer />
      </AuthLayout>
      } />

      <Route path='account' element={
      <AuthLayout>
        <Account />
      </AuthLayout>
      } />

      <Route path='download' element={
      <AuthLayout>
        <DownloadByDate />
      </AuthLayout>
      } />

      <Route path='download/:cId' element={
      <AuthLayout>
        <DownloadByCId />
      </AuthLayout>
      } />

      <Route path='account/download/:accountName' element={
      <AuthLayout>
        <DownloadByAccountName />
      </AuthLayout>
      } />

      <Route path='login' element={
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
      } />

      <Route path='forgot-password' element={
      <AuthLayout authentication={false}>
        <ForgotPassword />
      </AuthLayout>
      } />

      <Route path='admin-panel' element={
      <AuthLayout>
        <AdminPanel />
      </AuthLayout>
      } />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
