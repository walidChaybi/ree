import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "../../../../model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import {
  IRequeteDelivrance,
  RequeteDelivrance
} from "../../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { FeatureFlag } from "../featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../featureFlag/gestionnaireFeatureFlag";

const A_RETRAITER = "A_RETRAITER";
export class MigratorV1V2 {
  // cf. StatutsRequetesEspaceDelivrance
  // Certains statut supplémentaires sont remontés par le back (cf. RequeteRepositoryV2.java: getMesRequetes, getRequetesService,
  //    commentaire "Mise en service étape 2 R1,R2,R7 (conservation fonctionnement Etape1)")
  //  - StatutRequete.TRAITE_A_DELIVRER_DEMAT pour RDD qui ne sont pas à signer
  //  - StatutRequete.TRAITE_A_IMPRIMER (uniquement pour les RDC)

  public static init() {
    // @ts-ignore
    if (!StatutRequete[A_RETRAITER]) {
      // @ts-ignore
      StatutRequete[A_RETRAITER] = new StatutRequete(
        A_RETRAITER,
        "A retraiter dans Saga"
      );
    }
  }

  public static getStatutARetraiter(): StatutRequete {
    this.init();
    // @ts-ignore
    return StatutRequete[A_RETRAITER];
  }

  public static estARetraiterSaga(requete: IRequeteDelivrance) {
    // Il n'y a que les TRAITE_A_IMPRIMER et de sous type RDC qui peuvent être retraitées dans SAGA
    //  (les RDD TRAITE_A_IMPRIMER ont déjà fait l'objet d'une délivrance et ne doivent pas être retraitées)
    // Normalement on ne peut pas voir les requête RDD TRAITE_A_IMPRIMER
    return (
      (MigratorV1V2.estRDD(requete) &&
        MigratorV1V2.estAuStatutTraiteADelivrerDematOuASigner(requete)) ||
      (MigratorV1V2.estRDC(requete) &&
        requete.statutCourant.statut === StatutRequete.TRAITE_A_IMPRIMER)
    );
  }

  public static possedeDocumentSigne(requete: IRequeteDelivrance) {
    // Les RDD signées au statut TRAITE_A_DELIVRER_DEMAT ne doivent pas pouvoir être retraitées dans SAGA
    return requete.documentsReponses.find(
      doc =>
        doc.documentASignerElec &&
        doc.documentASignerElec.dateSignatureElectronique
    );
  }

  public static estARetraiterSagaRequeteTableau(
    requete: IRequeteTableauDelivrance
  ) {
    const requeteDelivrance = {
      sousType: SousTypeDelivrance.getEnumFromLibelleCourt(requete.sousType),
      statutCourant: {
        statut: requete.statut
          ? StatutRequete.getEnumFromLibelle(requete.statut)
          : undefined
      }
    } as IRequeteDelivrance;
    return MigratorV1V2.estARetraiterSaga(requeteDelivrance);
  }

  public static estARetraiterSagaStatutSousType(
    statut?: StatutRequete,
    sousType?: SousTypeRequete
  ) {
    const requeteDelivrance = {
      sousType,
      statutCourant: {
        statut
      }
    } as IRequeteDelivrance;
    return MigratorV1V2.estARetraiterSaga(requeteDelivrance);
  }

  public static estAuStatutASigner(requete: IRequeteDelivrance) {
    return RequeteDelivrance.estAuStatutASigner(requete);
  }

  public static estAuStatutTraiteADelivrerDematOuASigner(
    requete: IRequeteDelivrance
  ) {
    return (
      requete.statutCourant.statut === StatutRequete.TRAITE_A_DELIVRER_DEMAT ||
      requete.statutCourant.statut === StatutRequete.A_SIGNER
    );
  }

  private static estRDC(requete: IRequeteDelivrance) {
    return requete.sousType === SousTypeDelivrance.RDC;
  }

  private static estRDD(requete: IRequeteDelivrance) {
    return requete.sousType === SousTypeDelivrance.RDD;
  }

  public static nEstPasRDDouRDCouEstEtape2Bis(requete: IRequeteDelivrance) {
    return (
      !MigratorV1V2.estRDDouRDC(requete) ||
      gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS)
    );
  }

  private static estRDDouRDC(requete: IRequeteDelivrance) {
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
