/**
 * @jest-environment jsdom
 */
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";
import NavBar from "@/component/NavBar";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

it("Navbar: Include logo", () => {
  render(<NavBar />);

  expect(getByTestId(document.documentElement, "logo")).toBeInTheDocument();
});
