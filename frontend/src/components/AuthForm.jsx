import React, { useEffect, useState } from "react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router";

const AuthForm = ({ isRegister, onAuth }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  }

  function validateField(name, value) {
    let error = "";
    if (name === "username" && value.length < 3) {
      error = "Username must be at least 3 characters long.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format.";
    } else if (name === "password" && value.length < 8) {
      error = "Password must be at least 8 characters long.";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords must match.";
    }
    setErrors({ ...errors, [name]: error });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (!value) newErrors[key] = "This field is required.";
    });
    setErrors({ ...errors, ...newErrors });
    onAuth();
  }

  return (
    <form action="" className="w-90" onSubmit={handleSubmit}>
      <Text textStyle="2xl" fontWeight="bold" className="text-center">
        {isRegister ? "Create your Account" : "Welcome back"}
      </Text>
      <Fieldset.Root mt="7" mb="2">
        <Field.Root invalid={errors.email ? true : false}>
          <Field.Label>Email address</Field.Label>
          <Input
            type="email"
            name="email"
            size="sm"
            value={formData.email}
            onChange={handleChange}
          />
          <Field.ErrorText>{errors.email}</Field.ErrorText>
        </Field.Root>
        {isRegister && (
          <Fieldset.Content>
            <Field.Root invalid={errors.username ? true : false}>
              <Field.Label>Username</Field.Label>
              <Input
                type="username"
                size="sm"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Field.ErrorText>{errors.username}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
        )}

        <Fieldset.Content>
          <Field.Root invalid={errors.password ? true : false}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              size="sm"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        {isRegister && (
          <Fieldset.Content>
            <Field.Root invalid={errors.confirmPassword ? true : false}>
              <Field.Label>Confirm Password</Field.Label>
              <Input
                type="password"
                size="sm"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
        )}

        <Button
          type="submit"
          alignSelf="flex-start"
          className="w-full"
          mt="5"
          size="sm"
        >
          {isRegister ? "Create Account" : "Sign in"}
        </Button>
      </Fieldset.Root>
      <Text textStyle="sm" fontWeight="light" pb="7" className="text-center">
        {isRegister ? "Already have an account ? " : "Don't have an account? "}
        <Link
          to={isRegister ? "/login" : "/register"}
          variant="underline"
          className="!outline-none"
        >
          {isRegister ? "Sign in " : "Sign up "}here
        </Link>
      </Text>
    </form>
  );
};

export default AuthForm;
