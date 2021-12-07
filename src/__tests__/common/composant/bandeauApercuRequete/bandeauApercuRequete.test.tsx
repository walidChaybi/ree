import { render, screen } from "@testing-library/react";
import React from "react";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { TRequete } from "../../../../model/requete/IRequete";
import { IStatutCourant } from "../../../../model/requete/IStatutCourant";
import { BandeauRequete } from "../../../../views/common/composant/bandeauApercuRequete/BandeauApercuRequete";
import { storeRece } from "../../../../views/common/util/storeRece";

const statutCourantRequete = {
  statut: StatutRequete.A_SIGNER,
  dateEffet: 1577923200000
} as IStatutCourant;

const requete = {
  numero: "1234",
  dateCreation: 1577836800000,
  statutCourant: statutCourantRequete,
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56"
} as TRequete;

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("renders titre et numero requete", () => {
  render(<BandeauRequete requete={requete} />);
  const titre = screen.getByText(
    /Requête à signer le 02\/01\/2020 par Ashley YOUNG/i
  );
  expect(titre.textContent).toBe(
    "Requête à signer le 02/01/2020 par Ashley YOUNG"
  );
});

test("récupérer le libellé d'une requête traité à délivrer démat", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité délivré démat", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_DELIVRE_DEMAT;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité à imprimer", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_A_IMPRIMER;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité imprimé", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_IMPRIME;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête prise en charge et attribuée", () => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(
    /Requête prise en charge par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête à traiter attribuée", () => {
  requete.statutCourant.statut = StatutRequete.A_TRAITER;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête en Doublon", () => {
  requete.statutCourant.statut = StatutRequete.DOUBLON;
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête en doublon, requête déjà en cours avec le N° suivant : 1234 - Le : 01\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête transférée", () => {
  requete.statutCourant.statut = StatutRequete.TRANSFEREE;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(/Requête transférée à Ashley YOUNG - Le : 02\/01\/2020/i);
});

test("récupérer le libellé d'une requête a valider", () => {
  requete.statutCourant.statut = StatutRequete.A_VALIDER;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(
    /Requête à valider, attribuée à Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête brouillon", () => {
  requete.statutCourant.statut = StatutRequete.BROUILLON;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(
    /Requête au statut brouillon initiée par Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête ignorée", () => {
  requete.statutCourant.statut = StatutRequete.IGNOREE;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(/Requête ignorée le 02\/01\/2020 par Ashley YOUNG/i);
});

test("récupérer le libellé d'une requête rejetée", () => {
  requete.statutCourant.statut = StatutRequete.REJET;
  render(<BandeauRequete requete={requete} />);
  screen.getByText(/Requête rejetée le 02\/01\/2020 par Ashley YOUNG/i);
});

test("récupérer le libellé d'une requête prise en charge non attribuée", () => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  requete.idUtilisateur = "";
  render(<BandeauRequete requete={requete} />);
  screen.getByText(/WARN ! Non spécifié/i);
});

test("récupérer le libellé d'une requête à traiter non attribuée", () => {
  requete.statutCourant.statut = StatutRequete.A_TRAITER;
  requete.idUtilisateur = "";
  render(<BandeauRequete requete={requete} />);
  const element = screen.getByText(
    /Requête à traiter non attribuée - Créée le 01\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});
