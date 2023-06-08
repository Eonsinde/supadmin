import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from './context/AppContext';
// layout import
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/Authlayout";
// components import
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import PageLoader from "./components/loaders/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//core
import "primereact/resources/primereact.min.css";     

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Products = React.lazy(() => import('./pages/Products'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Transactions = React.lazy(() => import('./pages/Transactions'));
const Geography = React.lazy(() => import('./pages/Geography'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/home",
        element: 
          <React.Suspense fallback={<PageLoader />}>
            <Dashboard />
          </React.Suspense>,
      },
      {
        path: "dashboard/profile",
        element: 
          <React.Suspense fallback={<PageLoader />}>
            <Profile />
          </React.Suspense>,
      },
      {
        path: "dashboard/products",
        element: 
          <React.Suspense fallback={<PageLoader />}>
            <Products />
          </React.Suspense>,
      },
      {
        path: "dashboard/transactions",
        element: 
          <React.Suspense fallback={<PageLoader />}>
            <Transactions />
          </React.Suspense>,
      },
      {
        path: "dashboard/geography",
        element: 
          <React.Suspense fallback={<PageLoader />}>
            <Geography />
          </React.Suspense>,
      },
      {
        path: "dashboard/customers",
        element: 
          <React.Suspense fallback={<PageLoader />}>
          < Customers />
          </React.Suspense>,
      },
    ]
  },
  {
    path: "/accounts/authorization",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <><Login /></>
      },
    ],
  }
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} /> 
      <ToastContainer />
    </AppProvider>
  )
}

export default App
