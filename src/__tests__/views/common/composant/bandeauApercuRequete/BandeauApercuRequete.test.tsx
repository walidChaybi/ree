import { BandeauRequete } from "@composant/bandeauApercuRequete/BandeauApercuRequete";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { TRequete } from "@model/requete/IRequete";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

const statutCourantRequete = {
  statut: StatutRequete.A_SIGNER,
  dateEffet: 1577923200000
} as IStatutCourant;

const requete = {
  numero: "1234",
  dateCreation: 1577836800000,
  statutCourant: statutCourantRequete,
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
  numeroRequeteOrigine: "56789"
} as TRequete;

const RenderBandeauAvecContexte = (): any => {
  return (
    <MockRECEContextProvider utilisateurs={LISTE_UTILISATEURS}>
      <BandeauRequete requete={requete} />
    </MockRECEContextProvider>
  );
};

test("renders titre et numero requete", () => {
  render(RenderBandeauAvecContexte());
  const titre = screen.getByText(
    /Requête à signer le 02\/01\/2020 par Ashley YOUNG/i
  );
  expect(titre.textContent).toBe(
    "Requête à signer le 02/01/2020 par Ashley YOUNG"
  );
});

test("récupérer le libellé d'une requête traité à délivrer démat", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité délivré démat", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_DELIVRE_DEMAT;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité à imprimer", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_A_IMPRIMER;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête traité imprimé", () => {
  requete.statutCourant.statut = StatutRequete.TRAITE_IMPRIME;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête traitée par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête prise en charge et attribuée", () => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  render(RenderBandeauAvecContexte());
  screen.getByText(
    /Requête prise en charge par : Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête à traiter attribuée", () => {
  requete.statutCourant.statut = StatutRequete.A_TRAITER;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 02\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête en Doublon", () => {
  requete.statutCourant.statut = StatutRequete.DOUBLON;
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête en doublon, requête déjà en cours avec le N° suivant : 56789 - Le : 01\/01\/2020/i
  );
  expect(element.className.indexOf("gris") > -1).toBeTruthy();
});

test("récupérer le libellé d'une requête transférée", () => {
  requete.statutCourant.statut = StatutRequete.TRANSFEREE;
  render(RenderBandeauAvecContexte());
  screen.getByText(/Requête transférée à Ashley YOUNG - Le : 02\/01\/2020/i);
});

test("récupérer le libellé d'une requête a valider", () => {
  requete.statutCourant.statut = StatutRequete.A_VALIDER;
  render(RenderBandeauAvecContexte());
  screen.getByText(
    /Requête à valider, attribuée à Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête brouillon", () => {
  requete.statutCourant.statut = StatutRequete.BROUILLON;
  render(RenderBandeauAvecContexte());
  screen.getByText(
    /Requête au statut brouillon initiée par Ashley YOUNG - Le : 02\/01\/2020/i
  );
});

test("récupérer le libellé d'une requête ignorée", () => {
  requete.statutCourant.statut = StatutRequete.IGNOREE;
  render(RenderBandeauAvecContexte());
  screen.getByText(/Requête ignorée le 02\/01\/2020 par Ashley YOUNG/i);
});

test("récupérer le libellé d'une requête rejetée", () => {
  requete.statutCourant.statut = StatutRequete.REJET;
  render(RenderBandeauAvecContexte());
  screen.getByText(/Requête rejetée le 02\/01\/2020 par Ashley YOUNG/i);
});

test("récupérer le libellé d'une requête rejet impression", () => {
  requete.statutCourant.statut = StatutRequete.REJET_IMPRESSION;
  render(RenderBandeauAvecContexte());
  screen.getByText(/Requête en rejet impression - Le 02\/01\/2020/i);
});

test("récupérer le libellé d'une requête prise en charge non attribuée", () => {
  requete.statutCourant.statut = StatutRequete.PRISE_EN_CHARGE;
  requete.idUtilisateur = "";
  render(RenderBandeauAvecContexte());
  screen.getByText(/WARN ! Non spécifié/i);
});

test("récupérer le libellé d'une requête à traiter non attribuée", () => {
  requete.statutCourant.statut = StatutRequete.A_TRAITER;
  requete.idUtilisateur = "";
  render(RenderBandeauAvecContexte());
  const element = screen.getByText(
    /Requête à traiter non attribuée - Créée le 01\/01\/2020/i
  );
  expect(element.className.indexOf("bleu") > -1).toBeTruthy();
});
