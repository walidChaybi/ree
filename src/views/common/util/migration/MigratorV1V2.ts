import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/v2/IRequeteDelivrance";

const A_RETRAITER = "A_RETRAITER";
export class MigratorV1V2 {
  // cf. StatutsRequetesEspaceDelivrance
  // Certains statut supplémentaires sont remontés par le back (cf. RequeteRepositoryV2.java: getMesRequetes, getRequetesService,
  //    commentaire "Mise en service étape 2 R1,R2,R7 (conservation fonctionnement Etape1)")
  //  - StatutRequete.TRAITE_A_DELIVRER_DEMAT (pour RDC/RDD)
  //  - StatutRequete.TRAITE_A_IMPRIMER (uniquement pour les RDC)

  public static getStatutTraiteADelivrerDemat(): StatutRequete {
    return StatutRequete.TRAITE_A_DELIVRER_DEMAT;
  }

  public static getStatutTraiteAImprimer(): StatutRequete {
    return StatutRequete.TRAITE_A_IMPRIMER;
  }

  public static getStatutARetraiter(): StatutRequete {
    // @ts-ignore
    if (!StatutRequete[A_RETRAITER]) {
      // @ts-ignore
      StatutRequete[A_RETRAITER] = new StatutRequete(
        A_RETRAITER,
        "A retraiter dans Saga"
      );
    }
    // @ts-ignore
    return StatutRequete[A_RETRAITER];
  }

  public static getStatutTraiteADelivrerDematLibelle(): string {
    return StatutRequete.TRAITE_A_DELIVRER_DEMAT.libelle;
  }

  public static getStatutTraiteAImprimerLibelle(): string {
    return StatutRequete.TRAITE_A_IMPRIMER.libelle;
  }

  public static estARetraiterSaga(requete: IRequeteDelivrance) {
    // Il n'y a que les TRAITE_A_IMPRIMER et de sous type RDC qui peuvent être retraitées dans SAGA
    //  (les RDD TRAITE_A_IMPRIMER ont déjà fait l'objet d'une délivrance et ne doivent pas être retraitées)
    // Normalement on ne peut pas voir les requête RDD TRAITE_A_IMPRIMER
    return (
      (MigratorV1V2.estRDDouRDC(requete) &&
        requete.statutCourant.statut ===
          StatutRequete.TRAITE_A_DELIVRER_DEMAT) ||
      (MigratorV1V2.estRDC(requete) &&
        requete.statutCourant.statut === StatutRequete.TRAITE_A_IMPRIMER)
    );
  }

  public static estASigner(requete: IRequeteDelivrance) {
    return RequeteDelivrance.estASigner(requete);
  }

  private static estRDC(requete: IRequeteDelivrance) {
    return requete.sousType === SousTypeDelivrance.RDC;
  }

  public static estRDDouRDC(requete: IRequeteDelivrance) {
    return (
      requete.sousType === SousTypeDelivrance.RDD ||
      requete.sousType === SousTypeDelivrance.RDC
    );
  }

  public static estSousTypeRDDouRDC(sousTypeLibelleCourt?: string) {
    return (
      sousTypeLibelleCourt === SousTypeDelivrance.RDD.libelleCourt ||
      sousTypeLibelleCourt === SousTypeDelivrance.RDC.libelleCourt
    );
  }
}
