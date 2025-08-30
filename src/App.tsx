import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LoginForm from "@/pages/auth/LoginForm";
import NotFound from "@/pages/auth/NotFound";
import HomePage from "@/pages/customer/HomePage";
import Profile from "@/pages/customer/Profile";
import CustomerLayout from "@/pages/customer/CustomerLayout";
import ManageLayout from "@/pages/manage/ManageLayout";

const AdminDashboard = () => <div>Admin Dashboard</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <CustomerLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute allowedRoles={["Customer"]}>
                <Profile />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ManageLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <AdminDashboard /> }],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
