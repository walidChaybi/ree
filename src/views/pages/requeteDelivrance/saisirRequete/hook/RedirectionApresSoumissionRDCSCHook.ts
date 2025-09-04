import {
  INavigationApercuDelivranceParams,
  useNavigationApercuDelivrance
} from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { CreationActionHookParams, useCreationAction } from "@hook/requete/CreationAction";
import {
  ICreationActionMiseAjourStatutHookParams,
  useCreationActionMiseAjourStatut
} from "@hook/requete/CreationActionMiseAjourStatutHook";
import { IReponseSansDelivranceCS } from "@model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { CreationRequeteRDCSC, IComplementCreationUpdateRequete, UpdateRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "@pages/requeteDelivrance/apercuRequete/mapping/ReqDelivranceToReqTableau";
import { useCallback, useState } from "react";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import { createReponseSansDelivranceCS } from "../contenu/SaisirRDCSCPageFonctions";
import { ICreationOuMiseAJourRDCSCResultat } from "./SoumissionFormulaireRDCSCHook";

export const useRedirectionApresSoumissionRDCSCHook = (
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
  const [navigationApercuDelivranceParams, setNavigationApercuDelivranceParams] = useState<INavigationApercuDelivranceParams | null>(null);

  useCreationActionMiseAjourStatut(creationActionMiseAjourStatutParams);
  useCreationAction(paramsCreationAction);
  useNavigationApercuDelivrance(navigationApercuDelivranceParams);

  const redirectionPage = useCallback(
    async (requeteSauvegardee: IRequeteDelivrance, statutFinal: StatutRequete, refus = false) => {
      // Si l'appel s'est terminé sans erreur
      if (requeteSauvegardee && !StatutRequete.estBrouillon(statutFinal)) {
        // Redirection si l'enregistrement n'est pas un brouillon
        if (refus) {
          const reponse = createReponseSansDelivranceCS(requeteSauvegardee);
          setReponseSansDelivranceCS({
            contenu: reponse,
            fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
          });
        } else {
          AfficherMessage.succes("La requête a bien été enregistrée", { fermetureAuto: true });
          setNavigationApercuDelivranceParams({
            requete: mappingRequeteDelivranceToRequeteTableau(requeteSauvegardee)
          });
        }
      }

      setOperationEnCours(false);
    },
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
        statutRequete: statutFinal.nom as keyof typeof EStatutRequete,
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
