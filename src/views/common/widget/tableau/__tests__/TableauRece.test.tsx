import React from "react";
import * as renderer from "react-test-renderer";
import { screen, render, fireEvent } from "@testing-library/react";
import { TableauRece, TableauTypeColumn } from "../TableauRece";
import { HeaderTableauRequete } from "../../../../../model/requete/HeaderTableauRequete";
import requetes from "../../../../../api/mock/requetes.json";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AppUrls } from "../../../../router/UrlManager";

test("renders composant TableauRece", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickOnLine = jest.fn();
  const handleClickSetSortOrderByState = jest.fn();
  const handleClickSetSortOrder = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn(
      [HeaderTableauRequete.IdSagaDila],
      false,
      "pages.delivrance.mesRequetes.tableau.header"
    ),
  ];

  const component = renderer.create(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes}
        rowsNumberState={0}
        nextDataLinkState={""}
        goToLink={handleClickGoToLink}
        setSortOrderState={handleClickSetSortOrder}
        setSortOrderByState={handleClickSetSortOrderByState}
      />
    </Router>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test("TableauRece can be sort", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickOnLine = jest.fn();
  const handleClickSetSortOrderByState = jest.fn();
  const handleClickSetSortOrder = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn(
      [HeaderTableauRequete.IdSagaDila],
      false,
      "pages.delivrance.mesRequetes.tableau.header"
    ),
  ];

  render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes.data}
        rowsNumberState={0}
        nextDataLinkState={""}
        goToLink={handleClickGoToLink}
        setSortOrderState={handleClickSetSortOrder}
        setSortOrderByState={handleClickSetSortOrderByState}
      />
    </Router>
  );

  const changeOrderButton = screen.getByText("N°");
  fireEvent.click(changeOrderButton);
  expect(handleClickSetSortOrder).toHaveBeenCalledTimes(1);
});
