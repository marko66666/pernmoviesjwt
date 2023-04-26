import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const register = screen.getByText(/Register/i);
  expect(register).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(<App />);
  const Login = screen.getByText(/Login/i);
  expect(Login).toBeInTheDocument();
});
