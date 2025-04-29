import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Link } from "react-router";
import { forgotPasswordSchema } from "@/validation/auth.validation";
import { ChevronLeft } from "lucide-react";

type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const isFormLoading = useAuthStore((state) => state.isFormLoading);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const onSubmit: SubmitHandler<TForgotPasswordForm> = async (data) => {
    console.log("forgot password", data);
    await forgotPassword(data.email);
  };

  return (
    <>
      <div className="w-fit text-center">
        <Card className="w-[350px] sm:w-[400px] mb-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium">
              Forgot password?
            </CardTitle>
            <CardDescription>
              Enter your email address below to receive a link to reset your
              password.
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
                <Button
                  type="submit"
                  className="w-full cursor-pointer mt-2 font-medium py-5"
                  disabled={isFormLoading}
                >
                  Send Email
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="">
            <Link to="/login" className="opacity-90 hover:opacity-70 flex">
              <ChevronLeft />
              Back to Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
