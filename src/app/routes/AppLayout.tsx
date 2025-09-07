import { Outlet } from 'react-router-dom';
import Navbar from '../../widgets/Navbar';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 lg:mx-20 md:mx-10 mx-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
