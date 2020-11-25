import React from "react";
import * as renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import requete from "../../../../mock/data/requete";
import { IDataTable } from "../../../../views/pages/espaceDelivrance/MesRequetesPage";
import { StatutRequete } from "../../../../model/requete/StatutRequete";
import { EtatRequete } from "../../../../views/pages/apercuRequete/contenu/EtatRequete";

test("renders informations sur l'état de la requete", () => {
  const component = renderer.create(
    <EtatRequete requete={requete as IDataTable} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders titre et numero requete", () => {
  render(<EtatRequete requete={requete as IDataTable} />);
  const titre = screen.getByText(
    /Requête à signer le 02\/01\/2020 par Juliette Garisson/i
  );
  expect(titre.textContent).toBe(
    "Requête à signer le 02/01/2020 par Juliette Garisson"
  );
});

test("récupérer le libellé d'une requête traité à délivrer démat", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.ATraiterDemat;
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête traitée par : Juliette Garisson - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité délivré démat", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.TraiteDemat;
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête traitée par : Juliette Garisson - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité à imprimer", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.AImprimer;
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête traitée par : Juliette Garisson - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité imprimé", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.Imprime;
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête traitée par : Juliette Garisson - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête prise en charge et attribuée", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.PriseEnCharge;
  render(<EtatRequete requete={requete as IDataTable} />);
  screen.getByText(
    /Requête prise en charge par : Juliette Garisson - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête prise en charge non attribuée", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.PriseEnCharge;
  innerRequete.reponse.nomOec = "";
  innerRequete.reponse.prenomOec = "";
  render(<EtatRequete requete={requete as IDataTable} />);
  screen.getByText(/WARN ! Non spécifié/i);
});

test("récupérer le libellé d'une requête à traiter non attribuée", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.ATraiter;
  innerRequete.reponse.nomOec = "";
  innerRequete.reponse.prenomOec = "";
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête à traiter non attribuée - Créée le 01\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête à traiter attribuée", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.ATraiter;
  innerRequete.reponse.nomOec = "Garisson";
  innerRequete.reponse.prenomOec = "Juliette";
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête à traiter, attribuée à Juliette Garisson - Le 02\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête en Doublon", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.Doublon;
  render(<EtatRequete requete={requete as IDataTable} />);
  const element = screen.getByText(
    /Requête en doublon, requête déjà en cours avec le N° suivant : 11900 - Le 01\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête transférée", () => {
  const innerRequete = requete;
  innerRequete.statut = StatutRequete.Transferee;
  render(<EtatRequete requete={requete as IDataTable} />);
  screen.getByText(/Requête transférée à Juliette Garisson - Le 02\/01\/2020/i);
});
