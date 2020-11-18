import React from "react";
import * as renderer from "react-test-renderer";
import { screen, render, fireEvent } from "@testing-library/react";
import {
  TableauRece,
  TableauTypeColumn
} from "../../../../views/common/widget/tableau/TableauRece";
import { HeaderTableauRequete } from "../../../../model/requete/HeaderTableauRequete";
import requetes from "../../../../api/mock/data/requetes.json";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AppUrls } from "../../../../views/router/UrlManager";

test("renders composant TableauRece", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.IdSagaDila],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
    })
  ];

  const component = renderer.create(
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
        previousDataLinkState={""}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
        canUseSignature={false}
      />
    </Router>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test("TableauRece can be sort", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.IdSagaDila],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
    })
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
        previousDataLinkState={""}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      />
    </Router>
  );

  const changeOrderButton = screen.getByText("N°");
  fireEvent.click(changeOrderButton);
  expect(handleChangeSort).toHaveBeenCalledTimes(1);
});
