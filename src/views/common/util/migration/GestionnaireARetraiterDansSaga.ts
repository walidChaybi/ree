/* istanbul ignore file */
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { SousTypeRequete } from "../../../../model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import { FeatureFlag } from "../featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../featureFlag/gestionnaireFeatureFlag";

const A_RETRAITER = "A_RETRAITER";

/**
 *
 * Cette classe sera à supprimer lorsque le mode de fonctionnement étape1 (traitement RDD/RDC dans SAGA) ne sera plus d'actualité
 *
 */

export class GestionnaireARetraiterDansSaga {
  // cf. StatutsRequetesEspaceDelivrance
  // Certains statut supplémentaires sont remontés par le back (cf. RequeteRepositoryV2.java: getMesRequetes, getRequetesService,
  //    commentaire "Mise en service étape 2 R1,R2,R7 (conservation fonctionnement Etape1)")
  //  - StatutRequete.TRAITE_A_DELIVRER_DEMAT pour RDD qui ne sont pas à signer
  //  - StatutRequete.TRAITE_A_IMPRIMER (uniquement pour les RDC)

  public static init() {
    if (
      !gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
      // @ts-ignore
      !StatutRequete[A_RETRAITER]
    ) {
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
    const statut = requete.statutCourant.statut;
    const sousType = requete.sousType;
    return (
      !gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC) &&
      ((SousTypeDelivrance.soustypeRDD(sousType) &&
        StatutRequete.estAuStatutTraiteADelivrerDematOuASigner(statut)) ||
        (SousTypeDelivrance.estRDC(sousType) &&
          StatutRequete.estAuStatutTraiteAImprimer(statut)))
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
    return GestionnaireARetraiterDansSaga.estARetraiterSaga(requeteDelivrance);
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
    return GestionnaireARetraiterDansSaga.estARetraiterSaga(requeteDelivrance);
  }
}
