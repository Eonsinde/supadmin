import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppProvider } from 'context/AppContext';
// layout import
import AppLayout from "layouts/AppLayout";
import AuthLayout from "layouts/Authlayout";
// components import
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import ErrorPage from "pages/ErrorPage";
import Products from "pages/Products";
import Transactions from "pages/Transactions";
import Geography from "pages/Geography";
import Customers from "pages/Customers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"  ;


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/home",
        element: <Dashboard />,
      },
      {
        path: "dashboard/profile",
        element: <Profile />,
      },
      {
        path: "dashboard/products",
        element: <Products />,
      },
      {
        path: "dashboard/transactions",
        element: <Transactions />,
      },
      {
        path: "dashboard/geography",
        element: <Geography />,
      },
      {
        path: "dashboard/customers",
        element: <Customers />,
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
        element: <><Login /></>,
        // loader: redirectIfUser,
      },
      // {
      //   path: "logout",
      //   action: logoutUser,
      // },
    ],
  }
]);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} /> 
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
