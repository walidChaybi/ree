import React from "react";
import { Header } from "../Header";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

test("renders header", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const linkElement = screen.getByText(/Registre d'État Civil Électronique/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders click sur le logo RECE", () => {
  const handleClickButton = jest.fn();
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
