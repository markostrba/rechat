import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "@/validation/auth.validation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type TLoginForm = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useAuthStore((state) => state.login);
  const isFormLoading = useAuthStore((state) => state.isFormLoading);
  const [isPasswordView, setIsPasswordView] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TLoginForm> = async (data) => {
    try {
      const success = await login(data.email, data.password);
      form.reset();
      if (!success) return;
      navigate("/");
    } catch (err) {
      console.log("error in submit", err);
    }
  };

  return (
    <>
      <div className="w-fit text-center">
        <Card className="w-[350px] sm:w-[400px] mb-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium">Welcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 text-left"
              >
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="email" />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isPasswordView ? "text" : "password"}
                            autoComplete="current-password"
                          />
                          {!isPasswordView ? (
                            <button type="button" title="Show password">
                              <Eye
                                className="cursor-pointer absolute right-3 top-1.5 opacity-40"
                                onClick={() => setIsPasswordView(true)}
                              />
                            </button>
                          ) : (
                            <button type="button" title="Hide password">
                              <EyeOff
                                className="cursor-pointer absolute right-3 top-1.5 opacity-40"
                                onClick={() => setIsPasswordView(false)}
                              />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-right">
                        <Link
                          className="ml-1 text-blue-500 hover:opacity-70"
                          to="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full cursor-pointer mt-2 font-medium py-5"
                  disabled={isFormLoading}
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <span>
          Haven't signed up yet
          <Link to="/register" className="ml-1 text-blue-500 hover:opacity-70">
            Sign up
          </Link>
        </span>
      </div>
    </>
  );
};

export default LoginForm;
