import { Outlet } from "react-router-dom";

const ManageLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">Admin Sidebar</aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ManageLayout;
