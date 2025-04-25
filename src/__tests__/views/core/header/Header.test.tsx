import { Header } from "@core/header/Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import { expect, test, vi } from "vitest";

test("renders header", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const linkElement = screen.getByText(/Registre d'État Civil Électronique/i);
  expect(linkElement).toBeDefined();
});

test("renders click sur le logo RECE", () => {
  const handleClickButton = vi.fn();
  render(
    <>
      <Router>
        <Header onClick={handleClickButton}></Header>
      </Router>
    </>
  );
  const logoElement = screen.getByTestId("LogoHeader");
  fireEvent.click(logoElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
});
