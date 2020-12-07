import { getInteresse } from "../../../../../../views/pages/fiche/hook/constructionComposants/interesses/InteresseUtils";
import {
  ficheDeuxInteresseNumeroOrdreNonOrdonne,
  ficheUnInteressePrenomNonOrdonne,
  ficheUnInteresseVilleNaissanceFranceSansArrondissement,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis,
  ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis,
  ficheUnInteresseVilleNaissanceALEtrangerAvecRegion,
  ficheUnInteresseVilleNaissanceALEtrangerSansRegion
} from "../mock/InteressesMock";
import { IFicheRc } from "../../../../../../model/ficheRcRca/FicheRcInterfaces";

test("Interesse utils get interesse : affichés suivant leur numero d'ordre ", async () => {
  const components = getInteresse(
    ficheDeuxInteresseNumeroOrdreNonOrdonne as IFicheRc
  );

  expect(components).toHaveLength(3);
  expect(components[0].title).toBe("Intéressé 1");
  expect(components[1].title).toBe("Intéressé 2");
});

test("Interesse utils get interesse : affichage correcte d'un interessé  ", async () => {
  const components = getInteresse(ficheUnInteressePrenomNonOrdonne as IFicheRc);

  const idxNom = components[0].contents.findIndex(
    content => content.libelle === "Nom"
  );
  expect(idxNom).toBeGreaterThan(-1);

  const idxAutresNom = components[0].contents.findIndex(
    content => content.libelle === "Autre(s) nom(s)"
  );
  expect(idxAutresNom).toBeGreaterThan(-1);
  const valueAutresNom: JSX.Element = components[0].contents[idxAutresNom]
    .value as JSX.Element;

  expect(valueAutresNom.props.children).toBe("favarotti, favarotti2");
  expect(valueAutresNom.props.className).toBe("uppercase");
  expect(idxNom).toBeLessThan(idxAutresNom);

  const idxPrenoms = components[0].contents.findIndex(
    content => content.libelle === "Prénom(s)"
  );
  expect(idxPrenoms).toBeGreaterThan(-1);

  expect(components[0].contents[idxPrenoms].value).toBe(
    "Flavio, Enrico, Pablo"
  );
  expect(idxAutresNom).toBeLessThan(idxPrenoms);

  const idxAutrePrenoms = components[0].contents.findIndex(
    content => content.libelle === "Autre(s) prénom(s)"
  );
  expect(idxAutrePrenoms).toBeGreaterThan(-1);

  expect(components[0].contents[idxAutrePrenoms].value).toBe(
    "autreP1, autreP2"
  );
  expect(idxPrenoms).toBeLessThan(idxAutrePrenoms);

  const idxDateNaissance = components[0].contents.findIndex(
    content => content.libelle === "Date de naissance"
  );
  expect(idxDateNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxDateNaissance].value).toBe("25/05/1980");
  expect(idxAutrePrenoms).toBeLessThan(idxDateNaissance);

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(idxDateNaissance).toBeLessThan(idxLieuNaissance);

  const idxNationalite = components[0].contents.findIndex(
    content => content.libelle === "Nationalité"
  );
  expect(idxNationalite).toBeGreaterThan(-1);

  expect(idxLieuNaissance).toBeLessThan(idxNationalite);

  const idxSexe = components[0].contents.findIndex(
    content => content.libelle === "Sexe"
  );
  expect(idxSexe).toBeGreaterThan(-1);

  expect(idxNationalite).toBeLessThan(idxSexe);
});

test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement ", async () => {
  const components = getInteresse(
    ficheUnInteresseVilleNaissanceFranceSansArrondissement as IFicheRc
  );

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxLieuNaissance].value).toBe(
    "Nantes (Pays de la Loire)"
  );
});

test("Interesse utils get interesse :  affichage lieu naissance en france dans une ville avec arrondissement sauf Paris ", async () => {
  const components = getInteresse(
    ficheUnInteresseVilleNaissanceFranceAvecArrondissementNonParis as IFicheRc
  );

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxLieuNaissance].value).toBe(
    "Lyon Arrdt02 (Auvergne-Rhône-Alpes)"
  );
});

test("Interesse utils get interesse :  affichage lieu naissance en france à Paris ", async () => {
  const components = getInteresse(
    ficheUnInteresseVilleNaissanceFranceAvecArrondissementParis as IFicheRc
  );

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxLieuNaissance].value).toBe(
    "Paris (Arrdt02)"
  );
});

test("Interesse utils get interesse :  affichage lieu naissance à l'étranger ", async () => {
  const components = getInteresse(
    ficheUnInteresseVilleNaissanceALEtrangerSansRegion as IFicheRc
  );

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxLieuNaissance].value).toBe(
    "Berlin (Allemagne)"
  );
});

test("Interesse utils get interesse :  affichage lieu naissance à l'étranger ", async () => {
  const components = getInteresse(
    ficheUnInteresseVilleNaissanceALEtrangerAvecRegion as IFicheRc
  );

  const idxLieuNaissance = components[0].contents.findIndex(
    content => content.libelle === "Lieu de naissance"
  );
  expect(idxLieuNaissance).toBeGreaterThan(-1);

  expect(components[0].contents[idxLieuNaissance].value).toBe(
    "Berlin - RegionBerlin (Allemagne)"
  );
});
