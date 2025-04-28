import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(8, {
      message: "Password length must be at least 8 characters long",
    })
    .max(20, { message: "Password length must be below 20 characters" }),
});

export const registerSchema = z
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
