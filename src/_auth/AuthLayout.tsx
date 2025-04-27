import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center py-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
