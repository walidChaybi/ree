import { storeRece } from "../../../../views/common/util/storeRece";
import { userDroitConsulterArchive } from "../../../../mock/data/connectedUserAvecDroit";
import { getFichesPersonneWithHabilitation } from "../../../../views/pages/fiche/hook/constructionComposants/personne/FichePersonne";
import { IPersonne } from "../../../../model/etatcivil/commun/IPersonne";

const personne = {
  nom: "test"
} as IPersonne;

test("Attendu: la fonction getFichesPersonne renvoie vide car l'utilisateur n'a que le droit CONSULTER_ARCHIVE", () => {
  storeRece.utilisateurCourant = userDroitConsulterArchive;
  expect(getFichesPersonneWithHabilitation([personne])).toEqual([]);
});
