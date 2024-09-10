import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import {
  ITitulaireRequeteCreation,
  TitulaireRequeteCreation
} from "@model/requete/ITitulaireRequeteCreation";
import { describe, expect, test } from "vitest";
describe("Tests sur le fonctionnement de la fonction TitulaireRequeteCreation.filtreParentParSexeEtOuParPosition().", () => {
  const varParents = {
    nationalite: Nationalite.ETRANGERE,
    typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
    qualite: QualiteFamille.PARENT
  };
  const titulaires: ITitulaireRequeteCreation[] = [
    {
      id: "2c6d3dbf-bf63-433d-a719-80bfe7d4d721",
      nomNaissance: "Alpha",
      position: 1,
      sexe: "Masculin",
      ...varParents
    },
    {
      id: "bc8cb748-8041-4eb2-9fed-1d1c6d35f5c2",
      nomNaissance: "Beta",
      position: 2,
      sexe: "Masculin",
      ...varParents
    },
    {
      id: "a28ecb19-03f5-4232-a92a-44412cc01ac5",
      nomNaissance: "Delta",
      position: 1,
      sexe: "Féminin",
      ...varParents
    },
    {
      id: "798aca28-79d2-433f-9b18-4851285f8f12",
      nomNaissance: "Gamma",
      position: 2,
      sexe: "Féminin",
      ...varParents
    },
    {
      id: "688dfe45-918a-4718-ab7e-d192e13e9189",
      nomNaissance: "Sigma",
      nationalite: Nationalite.ETRANGERE,
      position: 1,
      sexe: "Féminin",
      typeObjetTitulaire: TypeObjetTitulaire.POSTULANT_NATIONALITE
    }
  ];
  test.each([
    { sexe: "Masculin", position: 1, nomNaissance: "Alpha" },
    { sexe: "Masculin", position: 2, nomNaissance: "Beta" },
    { sexe: "Féminin", position: 1, nomNaissance: "Delta" },
    { sexe: "Féminin", position: 2, nomNaissance: "Gamma" }
  ])(
    "DOIT retourner le parent de nom de naissance '$nomNaissance' QUAND on filtre par sexe '$sexe' et position '$position'",
    params => {
      const parent = TitulaireRequeteCreation.getParentParSexeEtOuParPosition(
        Sexe.getEnumFromLibelle(params.sexe),
        params.position,
        titulaires
      );
      expect(parent?.nomNaissance).toBe(params.nomNaissance);
    }
  );
});
