import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import {
  appartientAMonServiceOuServicesParentsOuServicesFils,
  contientServiceParent,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  IOfficier,
  mappingOfficier,
  officierALeDroitSurLePerimetre,
  officierALeDroitSurUnDesPerimetres,
  officierDroitConsulterSurLeTypeRegistre
} from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { expect, test } from "vitest";
import IHabilitationDto from "../../../dto/etatcivil/agent/IHabilitationDto";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitConsulterPerimetreTousRegistres,
  userDroitConsulterPerimetreTUNIS,
  userDroitnonCOMEDEC
} from "../../mock/data/mockConnectedUserAvecDroit";

const u: any = mockConnectedUser;

test("Habilitation model", () => {
  const utilisateurConnecte = u as IOfficier;
  let estAutorise = estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, [Droit.ATTRIBUER_REQUETE]);
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits(utilisateurConnecte, []);
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits(
    utilisateurConnecte,
    // @ts-ignore
    ["AUTRE"]
  );
  expect(estAutorise).toBe(false);
});

test("Utilisateur autoriser à consulter l'acte dont l'idTypeRegistre est passé", () => {
  let utilisateurConnecte = userDroitConsulterPerimetreTUNIS;
  const idTypeRegistre = "b66a9304-48b4-4aa3-920d-6cb27dd76c83";
  let autoriserAConsulterActe = officierDroitConsulterSurLeTypeRegistre(utilisateurConnecte, idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(true);

  utilisateurConnecte = userDroitConsulterPerimetreTousRegistres;
  autoriserAConsulterActe = officierDroitConsulterSurLeTypeRegistre(utilisateurConnecte, idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(false);
});

test("La requete appartient au service de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "1";
  expect(appartientAMonServiceOuServicesParentsOuServicesFils(utilisateurConnecte, idService)).toBeTruthy();
});

test("La requete appartient à un service parent du service de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "11";
  expect(appartientAMonServiceOuServicesParentsOuServicesFils(utilisateurConnecte, idService)).toBeTruthy();
});

test("La requete appartient à un service fils du service de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "111";
  expect(appartientAMonServiceOuServicesParentsOuServicesFils(utilisateurConnecte, idService)).toBeTruthy();
});

test("La requete n'appartient ni à un service fils, ni un service parent, ni au service de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "999";
  expect(appartientAMonServiceOuServicesParentsOuServicesFils(utilisateurConnecte, idService)).toBeFalsy();
});

test("Le service rattaché à la requete est un service parent de celui de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "11";
  expect(contientServiceParent(idService, utilisateurConnecte)).toBeTruthy();
});

test("Le service rattaché à la requete n'est pas un service parent de celui de l'utilisateur", () => {
  const utilisateurConnecte = userDroitnonCOMEDEC;
  const idService = "9999";
  expect(contientServiceParent(idService, utilisateurConnecte)).toBeFalsy();
});

test("Attendu: estOfficierHabiliterPourUnDesDroits fonctionne correctement", () => {
  let utilisateurConnecte = mappingOfficier(resultatHeaderUtilistateurLaurenceBourdeau, resultatRequeteUtilistateurLaurenceBourdeau.data);
  utilisateurConnecte = {
    ...utilisateurConnecte,
    habilitations: mapHabilitationsUtilisateur(
      resultatRequeteUtilistateurLaurenceBourdeau.data.habilitations as unknown as IHabilitationDto[]
    )
  };

  expect(estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, [])).toBeTruthy();

  expect(estOfficierHabiliterPourUnDesDroits(undefined!)).toBeTruthy();

  expect(estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, [Droit.CREER_ACTE_ETABLI])).toBeTruthy();

  expect(estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, [Droit.ATTRIBUER_REQUETE, Droit.CREER_ACTE_ETABLI])).toBeTruthy();

  expect(estOfficierHabiliterPourUnDesDroits(utilisateurConnecte, [Droit.METTRE_A_JOUR_ACTE])).toBeFalsy();
});

test("Attendu: officierALeDroitSurUnDesPerimetres/officierALeDroitSurLePerimetre fonctionnent correctement", () => {
  let utilisateurConnecte = mappingOfficier(resultatHeaderUtilistateurLaurenceBourdeau, resultatRequeteUtilistateurLaurenceBourdeau.data);
  utilisateurConnecte.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLaurenceBourdeau.data.habilitations as unknown as IHabilitationDto[]
  );

  expect(officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [Perimetre.TOUS_REGISTRES], utilisateurConnecte)).toBeTruthy();

  expect(officierALeDroitSurLePerimetre(Droit.CREER_ACTE_ETABLI, Perimetre.ETAX, utilisateurConnecte)).toBeFalsy();

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [Perimetre.TOUS_REGISTRES, Perimetre.ETAX], utilisateurConnecte)
  ).toBeTruthy();

  expect(officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [], utilisateurConnecte)).toBeTruthy();
});
