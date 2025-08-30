import { Outlet } from "react-router-dom";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const CustomerLayout = () => {
  return (
    <div>
      <main className="p-4">
        <Navbar />
        <Outlet /> {/* render page con */}
        <Footer />
      </main>
    </div>
  );
};

export default CustomerLayout;
