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

const registerSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters long",
      })
      .max(15, { message: "Username length must be below 15 characters" }),
    password: z
      .string()
      .min(8, {
        message: "Password length must be at least 8 characters long",
      })
      .max(20, { message: "Password length must be below 20 characters" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password length must be at least 8 characters long",
      })
      .max(20, { message: "Password length must be below 20 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type IRegisterForm = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const form = useForm<IRegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => console.log(data);

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
                className="space-y-2"
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
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
                        />
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
                        <Input
                          {...field}
                          type="password"
                          autoComplete="new-password"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer mt-2 font-medium py-5"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <span>Already have an account? Log in </span>
      </div>
    </>
  );
};

export default RegisterForm;
