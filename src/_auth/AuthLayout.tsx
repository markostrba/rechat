import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isPageLoading = useAuthStore((state) => state.isPageLoading);

  if (isAuthenticated) return <Navigate to="/" replace />;

  if (isPageLoading)
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Spinner size={null} className="text-black size-20" />
        <span className="text-xl font-medium">Loading</span>
      </div>
    );
  return (
    <div className="flex flex-1 flex-col justify-center items-center py-10">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
