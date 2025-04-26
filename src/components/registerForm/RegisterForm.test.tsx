import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterForm from "./RegisterForm.component";
import "@testing-library/jest-dom";

describe("RegisterForm", () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  it("renders form fields and submit button", () => {
    expect(getEmail()).toBeInTheDocument();
    expect(getUsername()).toBeInTheDocument();
    expect(
      screen.getByText(/This is your public display name/)
    ).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getConfirmPassword()).toBeInTheDocument();
    expect(getRegisterButton()).toBeInTheDocument();
    expect(getRegisterButton());
  });
  it("shows errors on empty fields", async () => {
    await userEvent.click(getRegisterButton());

    expect(screen.getByText(/Enter a valid email/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Username must be at least 2 characters long/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Password length must be at least 8 characters long/i)
    ).toHaveLength(2);
  });
  it("shows an error if passwords doesn't match", async () => {
    await userEvent.type(getEmail(), "test@gmail.com", { delay: 0 });
    await userEvent.type(getUsername(), "username", { delay: 0 });
    await userEvent.type(getPassword(), "password123", { delay: 0 });
    await userEvent.type(getConfirmPassword(), "password12", { delay: 0 });

    await userEvent.click(getRegisterButton());

    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });
  it("shows an error if username length is above 15 characters", async () => {
    await userEvent.type(getEmail(), "test@gmail.com", { delay: 0 });
    await userEvent.type(getUsername(), "1234512345123456", { delay: 0 });
    await userEvent.type(getPassword(), "password123", { delay: 0 });
    await userEvent.type(getConfirmPassword(), "password123", { delay: 0 });

    await userEvent.click(getRegisterButton());

    expect(
      screen.getByText(/Username length must be below 15 characters/i)
    ).toBeInTheDocument();
  });
  it("shows an error if password length is above 20 characters", async () => {
    await userEvent.type(getEmail(), "test@gmail.com", { delay: 0 });
    await userEvent.type(getUsername(), "username", { delay: 0 });
    await userEvent.type(getPassword(), "password12345678912345", { delay: 0 });
    await userEvent.type(getConfirmPassword(), "password12345678912345", {
      delay: 0,
    });

    await userEvent.click(getRegisterButton());

    expect(
      screen.getAllByText(/Password length must be below 20 characters/i)
    ).toHaveLength(2);
  });
});

function getEmail() {
  return screen.getByLabelText(/Email/);
}

function getUsername() {
  return screen.getByLabelText(/Username/);
}

function getPassword() {
  return screen.getByLabelText(/Password/);
}

function getConfirmPassword() {
  return screen.getByLabelText(/Confirm password/);
}

function getRegisterButton() {
  return screen.getByRole("button", { name: /Sign Up/ });
}
