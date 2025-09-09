import { Outlet } from 'react-router-dom';
import Navbar from '../../widgets/navbar/Navbar';
import { Footer } from '../../widgets/Footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
