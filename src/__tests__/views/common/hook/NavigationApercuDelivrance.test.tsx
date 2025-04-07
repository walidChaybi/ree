import { redirectionSelonStatutRequete } from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceUtils";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { describe, expect, test } from "vitest";
import { userDroitCOMEDEC } from "../../../mock/data/mockConnectedUserAvecDroit";

describe("test NavigationApercuDelivranceUtils", () => {
  const requeteATraiter: IRequeteTableauDelivrance = {
    idRequete: "0",
    type: TypeRequete.DELIVRANCE.libelle,
    sousType: SousTypeDelivrance.RDC.libelleCourt!,
    statut: StatutRequete.A_TRAITER.libelle,
    idUtilisateur: "idUtilisateurConnectedUser",
    provenance: Provenance.COURRIER.libelle,
    idService: "1"
  };

  test("QUAND la requête est au statut A TRAITER et utilisateur non autorisé, ALORS redirection vers apercurequetedelivrance", () => {
    const url = redirectionSelonStatutRequete(userDroitCOMEDEC, requeteATraiter, "/rece/rece-ui/mesrequetes");
    expect(url).toEqual("/rece/rece-ui/mesrequetes/apercurequetedelivrance/0");
  });

  const requeteBrouillon: IRequeteTableauDelivrance = {
    ...requeteATraiter,

    sousType: SousTypeDelivrance.RDCSC.libelleCourt!,
    statut: StatutRequete.BROUILLON.libelle
  };

  test("QUAND la requête RDCS est au statut BROUILLON, ALORS redirection vers saisircertificatsituation", async () => {
    const url = redirectionSelonStatutRequete(userDroitCOMEDEC, requeteBrouillon, "/rece/rece-ui/mesrequetes");
    expect(url).toEqual("/rece/rece-ui/mesrequetes/saisircertificatsituation/0");
  });

  const requeteDoublon: IRequeteTableauDelivrance = {
    ...requeteATraiter,

    statut: StatutRequete.DOUBLON.libelle,
    sousType: SousTypeDelivrance.RDCSC.libelleCourt!
  };

  test("QUAND la requête RDCS est au statut DOUBLON, ALORS redirection vers apercurequetedelivrance", async () => {
    const url = redirectionSelonStatutRequete(userDroitCOMEDEC, requeteDoublon, "/rece/rece-ui/mesrequetes/saisirextraitcopie");
    expect(url).toEqual("/rece/rece-ui/mesrequetes/apercurequetedelivrance/0");
  });

  const requeteAValider: IRequeteTableauDelivrance = {
    ...requeteATraiter,

    sousType: SousTypeDelivrance.RDCSC.libelleCourt!,
    statut: StatutRequete.A_VALIDER.libelle
  };

  test("QUAND la requête RDCS est au statut A VALIDER, ALORS redirection vers apercurequetetraitement", async () => {
    const url = redirectionSelonStatutRequete(userDroitCOMEDEC, requeteAValider, "/rece/rece-ui/mesrequetes");
    expect(url).toEqual("/rece/rece-ui/mesrequetes/apercurequetetraitement/0");
  });
});
