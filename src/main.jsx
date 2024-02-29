import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
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
 } from "./index.js";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage/>} >

      <Route path='' element={<CInfo />} />

      <Route path='balance' element={<Balance />} />

      <Route path='entry' element={<Entry />} />

      <Route path='reports' element={<Reports />} />

      <Route path=':cId' element={<ViewCustomer />} />

      <Route path='account' element={<Account />} />

      <Route path='download' element={<DownloadByDate />} />

      <Route path='download/:cId' element={<DownloadByCId />} />

      <Route path='account/download/:accountName' element={<DownloadByAccountName />} />

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
