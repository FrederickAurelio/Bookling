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
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        path: "user/:username",
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  useAxiosInterceptors();
  // const isLoading = useInitialize();
  // if (isLoading) return <Spinner type="full" />;
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
