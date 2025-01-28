import { useNavigationApercuRMCAutoDelivrance } from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceRMCAutoHook";
import { CreationActionHookParams, useCreationAction } from "@hook/requete/CreationAction";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IRMCAutoParams } from "@hook/rmcAuto/RMCAutoHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { CreationRequeteRDCSC, IComplementCreationUpdateRequete, UpdateRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { ADonneesTitulaireRequeteAbsentes } from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import messageManager from "@util/messageManager";
import { useCallback, useState } from "react";
import { createReponseSansDelivranceCS } from "../contenu/SaisirRDCSCPageFonctions";
import { ICreationOuMiseAJourRDCSCResultat } from "./SoumissionFormulaireRDCSCHook";

export const useRedirectionApresSoumissionRDCSCHook = (
  urlCourante: string,
  modeModification: boolean,
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  setReponseSansDelivranceCS: React.Dispatch<React.SetStateAction<IReponseSansDelivranceCS | undefined>>,
  creationRDCSCParams?: CreationRequeteRDCSC & IComplementCreationUpdateRequete,
  miseAJourRDCSCParams?: UpdateRequeteRDCSC & IComplementCreationUpdateRequete,
  requeteRDCSCResultat?: ICreationOuMiseAJourRDCSCResultat
) => {
  const [paramsCreationAction, setParamsCreationAction] = useState<CreationActionHookParams>();
  const [creationActionMiseAjourStatutParams, setCreationActionMiseAjourStatutParams] =
    useState<ICreationActionMiseAjourStatutHookParams>();
  const [paramsRMCAuto, setParamsRMCAuto] = useState<IRMCAutoParams>();

  useCreationActionMiseAjourStatut(creationActionMiseAjourStatutParams);
  useCreationAction(paramsCreationAction);
  useNavigationApercuRMCAutoDelivrance(paramsRMCAuto);

  const redirectionPage = useCallback(
    async (requeteSauvegardee: IRequeteDelivrance, statutFinal: StatutRequete, refus = false) => {
      // Si l'appel c'est terminé sans erreur
      if (requeteSauvegardee && !StatutRequete.estBrouillon(statutFinal)) {
        // Redirection si l'enregistrement n'est pas un brouillon
        if (refus) {
          const reponse = createReponseSansDelivranceCS(requeteSauvegardee);
          setReponseSansDelivranceCS({
            contenu: reponse,
            fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
          });
        } else {
          let pasDeTraitementAuto;

          messageManager.showSuccessAndClose("La requête a bien été enregistrée");

          if (SousTypeDelivrance.estRDCSC(requeteSauvegardee.sousType)) {
            pasDeTraitementAuto = ADonneesTitulaireRequeteAbsentes(requeteSauvegardee) || modeModification;
          }
          setParamsRMCAuto({
            requete: mappingRequeteDelivranceToRequeteTableau(requeteSauvegardee),
            urlCourante,
            pasDeTraitementAuto
          });
        }
      }

      setOperationEnCours(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modeModification]
  );

  const redirectionApresCreationOuModificationRequete = useCallback(
    (statutFinal: StatutRequete) => {
      const redirection = () => {
        redirectionPage(requeteRDCSCResultat?.requete || ({} as IRequeteDelivrance), statutFinal, requeteRDCSCResultat?.refus);
      };
      if (requeteRDCSCResultat) {
        requeteRDCSCResultat.requete.statutCourant.statut = statutFinal;
        if (creationRDCSCParams || miseAJourRDCSCParams) {
          // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
          //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
          redirection();
        }
      }
    },
    [requeteRDCSCResultat, redirectionPage, creationRDCSCParams, miseAJourRDCSCParams]
  );

  const miseAJourStatutRequetePuisRedirection = () => {
    const statutFinal: StatutRequete | undefined = miseAJourRDCSCParams?.statutFinal || creationRDCSCParams?.statutFinal;
    const futurStatut: StatutRequete | undefined = miseAJourRDCSCParams?.futurStatut || creationRDCSCParams?.futurStatut;
    if (statutFinal && statutFinal !== futurStatut) {
      setCreationActionMiseAjourStatutParams({
        libelleAction: statutFinal.libelle,
        statutRequete: statutFinal,
        requete: {
          idRequete: requeteRDCSCResultat?.requete.id
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () => redirectionApresCreationOuModificationRequete(statutFinal)
      });
    } else if (statutFinal) {
      redirectionApresCreationOuModificationRequete(statutFinal);
    }
  };

  const miseAJourActionPuisRedirection = () => {
    const statutFinal: StatutRequete | undefined = miseAJourRDCSCParams?.statutFinal;
    if (statutFinal) {
      setParamsCreationAction({
        libelleAction: "Requête modifiée",
        requete: {
          idRequete: requeteRDCSCResultat?.requete.id
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () =>
          miseAJourRDCSCParams?.refus ? miseAJourStatutRequetePuisRedirection() : redirectionApresCreationOuModificationRequete(statutFinal)
      });
    }
  };

  return {
    miseAJourStatutRequetePuisRedirection,
    miseAJourActionPuisRedirection
  };
};
