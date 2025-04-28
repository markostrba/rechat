import AuthLayout from "./_auth/AuthLayout";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import RegisterForm from "./_auth/forms/RegisterForm.component";
import LoginForm from "./_auth/forms/LoginForm.componenent";
import { useAuthStore } from "./store/useAuthStore";
import { ReactNode, useEffect } from "react";

interface IProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: IProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  const listenAuthState = useAuthStore((state) => state.listenAuthState);

  useEffect(() => {
    const unsubcribe = listenAuthState();
    return () => unsubcribe;
  }, [listenAuthState]);

  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route
          index
          element={
            <ProtectedRoute>
              <div>chat</div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster richColors position="top-center" />
    </main>
  );
}

export default App;
