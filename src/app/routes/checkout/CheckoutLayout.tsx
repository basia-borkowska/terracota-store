import { Outlet } from 'react-router-dom';

const CheckoutLayout = () => {
  return (
    <div className="bg-blue-100 h-screen">
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;
