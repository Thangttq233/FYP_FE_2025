// src/App.tsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import LoginPage from "@/pages/auth/Login";
import NotFound from "@/pages/auth/NotFound";
import HomePage from "@/pages/customer/HomePage";
// Layouts
import CustomerLayout from "@/pages/customer/CustomerLayout";
import ManageLayout from "@/pages/manage/ManageLayout";

// Pages
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
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
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
