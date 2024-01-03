/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { UserType } from "@/model/UserType";

    // Assert that HomePage is rendered
    const homePage = screen.queryByTestId("home-page");
    expect(homePage).toBeTruthy();
    const landingPage = screen.queryByTestId("landing-page");
    expect(landingPage).toBeNull();
  });

  // Add more test cases as needed
});
