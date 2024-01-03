/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";

// Mock the useAuth hook
jest.mock("@/context/AuthContext", () => ({
  ...jest.requireActual("@/context/AuthContext"),
  useAuth: jest.fn(),
}));

// Sample user for testing
const sampleUser = {
  email: "dan@gmail.com",
  username: "Quynh Dan",
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGY3YTI3YTJlNWY4ZDVmMWY1ZjcyYiIsImlhdCI6MTcwNDI3MDU3NCwiZXhwIjoxNzA0MzU2OTc0fQ.kx09KQh_k1sStZNGWUSNNqBvkhwvqjXtnWMoyaWVkG4",
  refresh_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGY3YTI3YTJlNWY4ZDVmMWY1ZjcyYiIsImlhdCI6MTcwNDI3MDU3NCwiZXhwIjoxNzA0MzU2OTc0fQ.kx09KQh_k1sStZNGWUSNNqBvkhwvqjXtnWMoyaWVkG4",
  studentId: "20127638",
};

describe("Home Page", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    (useAuth as jest.MockedFunction<typeof useAuth>).mockReset();
  });

  it("renders LandingPage when not authenticated", () => {
    // Mock useAuth to return an unauthenticated user
    (useAuth as jest.MockedFunction<typeof useAuth>).mockReturnValue({
      user: null,
      admin: null,
      login: function (userData: UserType): void {
        throw new Error("Function not implemented.");
      },
      logout: function (role: string): void {
        throw new Error("Function not implemented.");
      },
      isAuthModalOpen: false,
      updateUser: function (
        username: string | undefined,
        avatarUrl: string | undefined,
        studentId: string | undefined
      ): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    // Assert that LandingPage is rendered
    const landingPage = screen.queryByTestId("landing-page");
    expect(landingPage).toBeTruthy();
    const homePage = screen.queryByTestId("home-page");
    expect(homePage).toBeNull();
  });

  it("renders HomePage when authenticated", () => {
    // Mock useAuth to return an authenticated user
    (useAuth as jest.MockedFunction<typeof useAuth>).mockReturnValue({
      user: null,
      admin: null,
      login: function (userData: UserType): void {
        throw new Error("Function not implemented.");
      },
      logout: function (role: string): void {
        throw new Error("Function not implemented.");
      },
      isAuthModalOpen: false,
      updateUser: function (
        username: string | undefined,
        avatarUrl: string | undefined,
        studentId: string | undefined
      ): void {
        throw new Error("Function not implemented.");
      },
    });

    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );

    // Assert that HomePage is rendered
    const homePage = screen.queryByTestId("home-page");
    expect(homePage).toBeTruthy();
    const landingPage = screen.queryByTestId("landing-page");
    expect(landingPage).toBeNull();
  });

  // Add more test cases as needed
});
