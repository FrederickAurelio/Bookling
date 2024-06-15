import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./AppLayout";
import BookDetails from "./pages/BookDetails";
import DefaultPage from "./pages/DefaultPage";
import PageNotFound from "./pages/PageNotFound";
import User from "./pages/User";
import Logins from "./pages/Logins";
import SignUp from "./features/authentication/SignUp";
import Login from "./features/authentication/Login";
import { AuthProvider } from "./context/AuthContext";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/books" replace />,
  },
  {
    path: "books",
    element: <AppLayout />,
    children: [
      {
        path: "user/:userName",
        element: <User />,
      },
      {
        path: "",
        element: <DefaultPage />,
      },
      {
        path: ":bookId",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "logins",
    element: <Logins />,
    children: [
      {
        path: "",
        element: <Navigate to="./login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const AxiosInterceptorSetup = ({ children }) => {
  useAxiosInterceptors(); // Set up Axios interceptors

  return children;
};

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptorSetup>
        <RouterProvider router={router} />
      </AxiosInterceptorSetup>
    </AuthProvider>
  );
}

export default App;
