import AuthLayout from "./_auth/AuthLayout";
import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import RegisterForm from "./_auth/forms/RegisterForm.component";
function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<div>login</div>} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </main>
  );
}

export default App;
