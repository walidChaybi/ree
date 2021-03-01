import React from "react";
import * as renderer from "react-test-renderer";
import { screen, render, fireEvent } from "@testing-library/react";
import {
  TableauRece,
  TableauTypeColumn
} from "../../../../views/common/widget/tableau/TableauRece";
import { HeaderTableauRequete } from "../../../../model/requete/HeaderTableauRequete";
import requetes from "../../../../mock/data/requetes.json";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { URL_MES_REQUETES } from "../../../../views/router/ReceUrls";
import { generateurRequetes } from "../../../../mock/script-generation-donnees/generateurRequetes";

const HookConsummer: React.FC = (props: any) => {
  return <button onClick={props.reloadData()}>{"BoutonTest"}</button>;
};

const HookConsummer2: React.FC = (props: any) => {
  return <button onClick={props.reloadData(true)}>{"BoutonTest"}</button>;
};

test("renders composant TableauRece", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

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

test("TableauRece can be reload", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();
  const handlerelaod = jest.fn();

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
        handleReload={handlerelaod}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  const reloadButton = screen.getByText("BoutonTest");
  fireEvent.click(reloadButton);
  expect(handlerelaod).toBeCalled();
});

test("TableauRece can be reload with true", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();
  const handlerelaod = jest.fn();

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
        dataState={generateurRequetes().data}
        rowsNumberState={0}
        nextDataLinkState={""}
        previousDataLinkState={""}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handlerelaod}
      >
        <HookConsummer2></HookConsummer2>
      </TableauRece>
    </Router>
  );

  const reloadButton = screen.getByText("BoutonTest");
  fireEvent.click(reloadButton);
  expect(handlerelaod).toBeCalled();
});

test("TableauRece can be reload with true => go back", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();
  const handlerelaod = jest.fn();

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
        dataState={generateurRequetes().data}
        rowsNumberState={200}
        nextDataLinkState={""}
        previousDataLinkState={""}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handlerelaod}
      >
        <HookConsummer2></HookConsummer2>
      </TableauRece>
    </Router>
  );
  expect(screen.getByText("11982")).toBeDefined();
  const changementPageSuivantes = screen.getByTitle("Page suivante");
  fireEvent.click(changementPageSuivantes);
  expect(screen.getByText("11016")).toBeDefined();

  const reloadButton = screen.getByText("BoutonTest");
  fireEvent.click(reloadButton);
  expect(handlerelaod).toBeCalled();
  expect(screen.getByText("11028")).toBeDefined();
});

test("TableauRece can change page", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

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
        dataState={generateurRequetes().data}
        rowsNumberState={200}
        nextDataLinkState={"ok"}
        previousDataLinkState={"okok"}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  const aLinePage1 = screen.getByText("11982");
  expect(aLinePage1).toBeDefined();

  const changementPageSuivantes = screen.getByTitle("Page suivante");
  fireEvent.click(changementPageSuivantes);
  const aLinePage2 = screen.getByText("11017");
  fireEvent.click(changementPageSuivantes);
  fireEvent.click(changementPageSuivantes);
  fireEvent.click(changementPageSuivantes);
  fireEvent.click(changementPageSuivantes);
  fireEvent.click(changementPageSuivantes);
  fireEvent.click(changementPageSuivantes);

  expect(aLinePage2).toBeDefined();

  const changementPagePrecedent = screen.getByTitle("Page précédente");
  fireEvent.click(changementPagePrecedent);
  const aLinePage1bis = screen.getByText("11097");
  expect(aLinePage1bis).toBeDefined();
});

test("TableauRece can change page", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

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
        dataState={generateurRequetes().data}
        rowsNumberState={200}
        nextDataLinkState={"ok"}
        previousDataLinkState={"okok"}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  const row = screen.getByText("11982");
  fireEvent.click(row);
  expect(handleClickOnLine).toBeCalled();
});

test("TableauRece can't change page bakc and no error'", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

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
        dataState={generateurRequetes().data}
        rowsNumberState={200}
        nextDataLinkState={"ok"}
        previousDataLinkState={"okok"}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  expect(screen.getByText("11982")).toBeDefined();

  const changementPagePrecedent = screen.getByTitle("Page précédente");
  fireEvent.click(changementPagePrecedent);
  expect(screen.getByText("11982")).toBeDefined();
});

test("TableauRece can't change page next and no error'", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.IdSagaDila],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
    })
  ];

  const { getByText, getByTitle } = render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes.data}
        rowsNumberState={10}
        nextDataLinkState={"ok"}
        previousDataLinkState={"okok"}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  expect(getByText("11982")).toBeDefined();

  const changementPageSuivante = getByTitle("Page suivante");
  fireEvent.click(changementPageSuivante);
  expect(getByText("11982")).toBeDefined();
});

test("TableauRece can sort", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  const handleClickOnLine = jest.fn();
  const handleChangeSort = jest.fn();
  const handleClickGoToLink = jest.fn();

  const columnsTableau = [
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.IdSagaDila],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila"
    })
  ];

  const { getByText, getByTitle } = render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={"idSagaDila"}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes.data}
        rowsNumberState={10}
        nextDataLinkState={"ok"}
        previousDataLinkState={"okok"}
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </Router>
  );

  const column = getByText("N°");
  expect(column).toBeDefined();

  fireEvent.click(column);

  fireEvent.click(column);
  expect(handleChangeSort).toBeCalledTimes(2);
});
