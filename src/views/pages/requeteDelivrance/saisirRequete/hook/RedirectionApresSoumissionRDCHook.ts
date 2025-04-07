import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { CreationActionHookParams, useCreationAction } from "@hook/requete/CreationAction";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { CreationRequeteRDC, IComplementCreationUpdateRequete, UpdateRequeteRDC } from "@model/form/delivrance/ISaisirRDCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import messageManager from "@util/messageManager";
import { useState } from "react";
import { ICreationOuMiseAJourRDCResultat } from "./SoumissionFormulaireRDCHook";

export const useRedirectionApresSoumissionRDCHook = (
  urlCourante: string,
  setOperationEnCours: React.Dispatch<React.SetStateAction<boolean>>,
  creationRDCParams?: CreationRequeteRDC & IComplementCreationUpdateRequete,
  miseAJourRDCParams?: UpdateRequeteRDC & IComplementCreationUpdateRequete,
  requeteRDCResultat?: ICreationOuMiseAJourRDCResultat
) => {
  const [creationActionParams, setCreationActionParams] = useState<CreationActionHookParams>();
  const [creationActionMiseAjourStatutParams, setCreationActionMiseAjourStatutParams] =
    useState<ICreationActionMiseAjourStatutHookParams>();
  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);

  useCreationActionMiseAjourStatut(creationActionMiseAjourStatutParams);
  useCreationAction(creationActionParams);
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);

  const redirectionPage = async (requeteSauvegardee: IRequeteDelivrance) => {
    // Si l'appel s'est terminé sans erreur
    if (requeteSauvegardee) {
      messageManager.showSuccessAndClose("La requête a bien été enregistrée");
      setNavigationApercuDelivranceParams({
        requete: mappingRequeteDelivranceToRequeteTableau(requeteSauvegardee),
        urlCourante
      });
    }
    setOperationEnCours(false);
  };

  const redirectionApresCreationOuModificationRequete = () => {
    if (requeteRDCResultat) {
      // Maj du statut de la requête suite à l'appel d'api de mise à jour de statut de la requête
      //   pour éviter de faire un nouvelle appel d'api pour recharger la requête avec le bon statut
      redirectionPage(requeteRDCResultat.requete);
    }
  };

  const miseAJourStatutRequetePuisRedirection = () => {
    const statutFinal: StatutRequete | undefined = miseAJourRDCParams?.statutFinal || creationRDCParams?.statutFinal;
    const futurStatut: StatutRequete | undefined = miseAJourRDCParams?.futurStatut || creationRDCParams?.futurStatut;
    if (statutFinal && statutFinal !== futurStatut) {
      setCreationActionMiseAjourStatutParams({
        libelleAction: statutFinal.libelle,
        statutRequete: statutFinal,
        requete: {
          idRequete: requeteRDCResultat?.requete.id
        } as IRequeteTableauDelivrance,
        // redirection ensuite
        callback: () => redirectionApresCreationOuModificationRequete()
      });
    } else {
      redirectionApresCreationOuModificationRequete();
    }
  };

  const miseAJourActionPuisRedirection = async (requeteSauvegardee: any) => {
    setCreationActionParams({
      libelleAction: "Requête modifiée",
      requete: {
        idRequete: requeteSauvegardee.requete.id
      } as IRequeteTableauDelivrance,
      callback: () => redirectionApresCreationOuModificationRequete()
    });
  };

  return {
    miseAJourStatutRequetePuisRedirection,
    miseAJourActionPuisRedirection
  };
};
