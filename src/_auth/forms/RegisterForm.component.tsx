import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { registerSchema } from "@/validation/auth.validation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type TRegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const register = useAuthStore((state) => state.register);
  const isFormLoading = useAuthStore((state) => state.isFormLoading);
  const [isPasswordView, setIsPasswordView] = useState(false);
  const [isConfirmPasswordView, setIsConfirmPasswordView] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TRegisterForm> = async (data) => {
    try {
      const success = await register(data.email, data.password, data.username);
      form.reset();
      if (!success) return;

      navigate("/login");
    } catch (err) {
      console.log("error in submit", err);
    }
  };

  return (
    <>
      <div className="w-fit text-center">
        <Card className="w-[350px] sm:w-[400px] mb-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium">
              Create a new account
            </CardTitle>
            <CardDescription>
              To use Rechat, Please enter your details
            </CardDescription>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="username" />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
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
                            autoComplete="new-password"
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
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={isConfirmPasswordView ? "text" : "password"}
                            autoComplete="new-password"
                          />
                          {!isConfirmPasswordView ? (
                            <button type="button" title="Show password">
                              <Eye
                                className="cursor-pointer absolute right-3 top-1.5 opacity-40"
                                onClick={() => setIsConfirmPasswordView(true)}
                              />
                            </button>
                          ) : (
                            <button type="button" title="Hide password">
                              <EyeOff
                                className="cursor-pointer absolute right-3 top-1.5 opacity-40"
                                onClick={() => setIsConfirmPasswordView(false)}
                              />
                            </button>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer mt-2 font-medium py-5"
                  disabled={isFormLoading}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <span>
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-500 hover:opacity-70">
            Log in
          </Link>
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
