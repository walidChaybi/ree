import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import * as renderer from "react-test-renderer";
import { RequeteTableauHeader } from "../RequeteTableauHeader";
import { DataTable } from "../RequeteTableauHeaderCell";

test("renders header tableau des requêtes de l'application", () => {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DataTable
  ) => {};
  const component = renderer.create(
    <>
      <RequeteTableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
      ></RequeteTableauHeader>
    </>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders click sur header tableau des requêtes de l'application", () => {
  const handleRequestSort = jest.fn();
  render(
    <>
      <RequeteTableauHeader
        onRequestSort={handleRequestSort}
        order="ASC"
        orderBy="idSagaDila"
      ></RequeteTableauHeader>
    </>
  );
  const colonneElement = screen.getByText(/N°/i);
  fireEvent.click(colonneElement);
  expect(handleRequestSort).toHaveBeenCalledTimes(1);
  expect(handleRequestSort).not.toHaveBeenCalledTimes(2);
});
