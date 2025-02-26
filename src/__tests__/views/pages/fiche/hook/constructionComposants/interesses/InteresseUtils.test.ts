import { IFicheRcRca } from "@model/etatcivil/rcrca/IFicheRcRca";
import { getInteresse } from "@pages/fiche/hook/constructionComposants/interesses/InteresseUtils";
import { expect, test } from "vitest";
import {
  ficheDeuxInteresseNumeroOrdreNonOrdonne,
  ficheUnInteresseLieuDecesDateDeces,
  ficheUnInteressePrenomNonOrdonne,
  ficheUnInteresseVilleNaissanceALEtrangerAvecRegion,
  ficheUnInteresseVilleNaissanceALEtrangerSansRegion,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis,
  ficheUnInteresseVilleNaissanceFranceSansArrondissement
} from "../../../../../../mock/data/ficheEtBandeau/divers/InteressesMock";

test("Interesse utils get interesse : affichés suivant leur numero d'ordre ", () => {
  const components = getInteresse(ficheDeuxInteresseNumeroOrdreNonOrdonne as any as IFicheRcRca);

  expect(components).toHaveLength(3);
  expect(components[0].partContent?.title).toBe("Intéressé 1");
  expect(components[1].partContent?.title).toBe("Intéressé 2");
});

test("Interesse utils get interesse : affichage correcte d'un interessé  ", () => {
  const components = getInteresse(ficheUnInteressePrenomNonOrdonne as IFicheRcRca);

  const idxNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Nom");
  expect(idxNom).toBeGreaterThan(-1);

  const idxAutresNom = components[0].partContent?.contents.findIndex(content => content.libelle === "Autre(s) nom(s)");
  expect(idxAutresNom).toBeGreaterThan(-1);
  const valueAutresNom: JSX.Element = components[0].partContent?.contents[idxAutresNom as number].value as JSX.Element;

  expect(valueAutresNom.props.children).toBe("favarotti, favarotti2");
  expect(idxNom).toBeLessThan(idxAutresNom as number);

  const idxPrenoms = components[0].partContent?.contents.findIndex(content => content.libelle === "Prénom(s)");
  expect(idxPrenoms).toBeGreaterThan(-1);

  expect((components[0].partContent?.contents[idxPrenoms as number].value as JSX.Element).props.children).toBe("Flavio, Enrico, Pablo");
  expect(idxAutresNom).toBeLessThan(idxPrenoms as number);

  const idxAutrePrenoms = components[0].partContent?.contents.findIndex(content => content.libelle === "Autre(s) prénom(s)");
  expect(idxAutrePrenoms).toBeGreaterThan(-1);

  expect((components[0].partContent?.contents[idxAutrePrenoms as number].value as JSX.Element).props.children).toBe("autreP1, autreP2");
  expect(idxPrenoms).toBeLessThan(idxAutrePrenoms as number);

  const idxDateNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Date de naissance");
  expect(idxDateNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxDateNaissance as number].value).toBe("25/05/1980");
  expect(idxAutrePrenoms).toBeLessThan(idxDateNaissance as number);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(idxDateNaissance).toBeLessThan(idxLieuNaissance as number);

  const idxNationalite = components[0].partContent?.contents.findIndex(content => content.libelle === "Nationalité");
  expect(idxNationalite).toBeGreaterThan(-1);

  expect(idxLieuNaissance).toBeLessThan(idxNationalite as number);

  const idxSexe = components[0].partContent?.contents.findIndex(content => content.libelle === "Sexe");
  expect(idxSexe).toBeGreaterThan(-1);

  expect(idxNationalite).toBeLessThan(idxSexe as number);
});

test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement ", () => {
  const components = getInteresse(ficheUnInteresseVilleNaissanceFranceSansArrondissement as IFicheRcRca);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Nantes (Pays de la Loire)");
});

test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement sauf Paris ", () => {
  const components = getInteresse(ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis as IFicheRcRca);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Lyon 2ème arrondissement (Auvergne-Rhône-Alpes)");
});

test("Interesse utils get interesse :  affichage lieu naissance en france à Paris ", () => {
  const components = getInteresse(ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis as IFicheRcRca);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Paris 2ème arrondissement");
});

test("Interesse utils get interesse :  affichage lieu naissance à l'étranger ", () => {
  const components = getInteresse(ficheUnInteresseVilleNaissanceALEtrangerSansRegion as IFicheRcRca);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Berlin (Allemagne)");
});

test("Interesse utils get interesse :  affichage lieu naissance à l'étranger ", () => {
  const components = getInteresse(ficheUnInteresseVilleNaissanceALEtrangerAvecRegion as IFicheRcRca);

  const idxLieuNaissance = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de naissance");
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].partContent?.contents[idxLieuNaissance as number].value).toBe("Berlin, RegionBerlin (Allemagne)");
});

test("Interesse utils get interesse :  affichage date désèc et lieu décès rca ", () => {
  const components = getInteresse(ficheUnInteresseLieuDecesDateDeces as IFicheRcRca);

  const idxSexe = components[0].partContent?.contents.findIndex(content => content.libelle === "Sexe");

  const idxDateDeces = components[0].partContent?.contents.findIndex(content => content.libelle === "Date de décès");
  expect(idxDateDeces).toBeGreaterThan(idxSexe as number);

  expect(components[0].partContent?.contents[idxDateDeces as number].value).toBe("02/03/2018");

  const idxLieuDeces = components[0].partContent?.contents.findIndex(content => content.libelle === "Lieu de décès");
  expect(idxLieuDeces).toBeGreaterThan(idxDateDeces as number);

  expect(components[0].partContent?.contents[idxLieuDeces as number].value).toBe("Berlin, RegionBerlin (Allemagne)");
});
