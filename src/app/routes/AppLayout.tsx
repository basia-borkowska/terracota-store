import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="bg-orange-50 h-screen">
      <section className="mx-auto max-w-6xl p-6">
        <Outlet />
      </section>
    </div>
  );
};

export default AppLayout;
