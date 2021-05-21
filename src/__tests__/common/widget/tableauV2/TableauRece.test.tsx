import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import requetes from "../../../../mock/data/requetes.json";
import { generateurRequetes } from "../../../../mock/script-generation-donnees/generateurRequetes";
import { HeaderTableauRequete } from "../../../../model/requete/HeaderTableauRequete";
import { TableauRece } from "../../../../views/common/widget/tableau/v2/TableauRece";
import { TableauTypeColumn } from "../../../../views/common/widget/tableau/v2/TableauTypeColumn";
import { URL_MES_REQUETES } from "../../../../views/router/ReceUrls";

const HookConsummer: React.FC = (props: any) => {
  return <button onClick={props.reloadData()}>{"BoutonTest"}</button>;
};

const HookConsummer2: React.FC = (props: any) => {
  return <button onClick={props.reloadData(true)}>{"BoutonTest"}</button>;
};
const paramsTableau = {
  previousDataLinkState: "",
  nextDataLinkState: "",
  rowsNumberState: 0,
  minRangeState: undefined,
  maxRangeState: undefined
};

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
      title: "N°"
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
        goToLink={handleClickGoToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handlerelaod}
        paramsTableau={paramsTableau}
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
      title: "N°"
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
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 200;

  render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={generateurRequetes().data}
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 200;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={generateurRequetes().data}
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 200;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={generateurRequetes().data}
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={generateurRequetes().data}
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  const { getByText, getByTitle } = render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={""}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes.data}
        paramsTableau={paramsTableau}
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
      title: "N°"
    })
  ];

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  const { getByText } = render(
    <Router history={history}>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={handleClickOnLine}
        sortOrderByState={"idSagaDila"}
        sortOrderState={"ASC"}
        columnHeaders={columnsTableau}
        dataState={requetes.data}
        paramsTableau={paramsTableau}
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
