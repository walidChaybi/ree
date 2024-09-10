import requetes from "@mock/data/requetes.json";
import { generateurRequetes } from "@mock/script-generation-donnees/generateurRequetes";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";

const HookConsummer: React.FC = (props: any) => {
  return <button onClick={() => props.reloadData()}>{"BoutonTest"}</button>;
};

const HookConsummer2: React.FC = (props: any) => {
  return <button onClick={() => props.reloadData(true)}>{"BoutonTest"}</button>;
};
const paramsTableau = {
  previousDataLinkState: "",
  nextDataLinkState: "",
  rowsNumberState: 0,
  minRangeState: undefined,
  maxRangeState: undefined
};

const columnsTableau = [
  new TableauTypeColumn({
    keys: ["idSagaDila"],
    title: "N°",
    sortable: true
  })
];

test("TableauRece can be reload", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();
  const handlerelaod = vi.fn();

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
  );

  const reloadButton = screen.getByText("BoutonTest");
  fireEvent.click(reloadButton);
  expect(handlerelaod).toBeCalled();
});

test("TableauRece can be reload with true", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();
  const handlerelaod = vi.fn();

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer2></HookConsummer2>
      </TableauRece>
    </MemoryRouter>
  );

  const reloadButton = screen.getByText("BoutonTest");
  fireEvent.click(reloadButton);
  expect(handlerelaod).toBeCalled();
});

test("TableauRece can be reload with true => go back", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();
  const handlerelaod = vi.fn();

  paramsTableau.rowsNumberState = 200;

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer2></HookConsummer2>
      </TableauRece>
    </MemoryRouter>
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
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();

  paramsTableau.rowsNumberState = 200;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
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
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();

  paramsTableau.rowsNumberState = 200;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
  );

  const row = screen.getByText("11982");
  fireEvent.click(row);
  expect(handleClickOnLine).toBeCalled();
});

test("TableauRece can't change page bakc and no error'", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
  );

  expect(screen.getByText("11982")).toBeDefined();

  const changementPagePrecedent = screen.getByTitle("Page précédente");
  fireEvent.click(changementPagePrecedent);
  expect(screen.getByText("11982")).toBeDefined();
});

test("TableauRece can't change page next and no error'", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  const { getByText, getByTitle } = render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
  );

  expect(getByText("11982")).toBeDefined();

  const changementPageSuivante = getByTitle("Page suivante");
  fireEvent.click(changementPageSuivante);
  expect(getByText("11982")).toBeDefined();
});

test("TableauRece can sort", () => {
  const handleClickOnLine = vi.fn();
  const handleChangeSort = vi.fn();
  const handleClickGoToLink = vi.fn();

  paramsTableau.rowsNumberState = 10;
  paramsTableau.nextDataLinkState = "next";
  paramsTableau.previousDataLinkState = "previous";

  const { getByText } = render(
    <MemoryRouter initialEntries={[URL_MES_REQUETES_DELIVRANCE]}>
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
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
      >
        <HookConsummer></HookConsummer>
      </TableauRece>
    </MemoryRouter>
  );

  const column = getByText("N°");
  expect(column).toBeDefined();

  fireEvent.click(column);

  fireEvent.click(column);
  expect(handleChangeSort).toBeCalledTimes(2);
});
