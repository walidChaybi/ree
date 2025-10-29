import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import {
  IReponseSansDelivranceCSDemandeIncompleteComposition,
  ReponseSansDelivranceCSDemandeIncompleteComposition
} from "@model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import {
  IReponseSansDelivranceCSFrancaisComposition,
  ReponseSansDelivranceCSFrancaisComposition
} from "@model/composition/IReponseSansDelivranceCSFrancaisComposition";
import {
  IReponseSansDelivranceCSMariageComposition,
  ReponseSansDelivranceCSMariageComposition
} from "@model/composition/IReponseSansDelivranceCSMariageComposition";
import {
  IReponseSansDelivranceCSPACSNonInscritComposition,
  ReponseSansDelivranceCSPACSNonInscritComposition
} from "@model/composition/IReponseSansDelivranceCSPACSNonInscritComposition";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";

const ERREUR_PAS_DE_REQUERENT = "Erreur inattendue: Pas de requérant pour la requête";

/** REQUETE_INCOMPLETE_ILLISIBLE */
export const createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete = (
  requete?: IRequeteDelivrance
): IReponseSansDelivranceCSDemandeIncompleteComposition => {
  if (requete?.requerant) {
    return ReponseSansDelivranceCSDemandeIncompleteComposition.creerReponseSansDelivranceCS(requete);
  } else {
    AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
    return {} as IReponseSansDelivranceCSDemandeIncompleteComposition;
  }
};

/** PACS_NON_INSCRIT */
export const createReponseSansDelivranceCSPourCompositionApiPACSNonInscrit = (
  requete: IRequeteDelivrance
): IReponseSansDelivranceCSPACSNonInscritComposition => {
  if (requete?.requerant) {
    return ReponseSansDelivranceCSPACSNonInscritComposition.creerReponseSansDelivranceCS(requete, requete.canal);
  }
  AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
  return {} as IReponseSansDelivranceCSPACSNonInscritComposition;
};

/** ACTION_RESSORTISSANT_FRANCAIS */
export const createReponseSansDelivranceCSPourCompositionApiFrancais = (
  requete: IRequeteDelivrance
): IReponseSansDelivranceCSFrancaisComposition => {
  if (requete.requerant) {
    return ReponseSansDelivranceCSFrancaisComposition.creerReponseSansDelivranceCS(requete);
  }
  AfficherMessage.erreur(ERREUR_PAS_DE_REQUERENT, { fermetureAuto: true });
  return {} as IReponseSansDelivranceCSFrancaisComposition;
};

export interface ICreateReponseSansDelivranceCSPourCompositionApiMariageParams {
  requete?: IRequeteDelivrance;
  acte?: ResultatRMCActe;
}

/** TRACE_MARIAGE_ACTIF */
export const CreateReponseSansDelivranceCSPourCompositionApiMariage = ({
  requete,
  acte
}: ICreateReponseSansDelivranceCSPourCompositionApiMariageParams): IReponseSansDelivranceCSMariageComposition | null => {
  const [reponse, setReponse] = useState<IReponseSansDelivranceCSMariageComposition | null>(null);
  const { appelApi: recupererFicheActe } = useFetchApi(CONFIG_GET_RESUME_ACTE);

  useEffect(() => {
    if (requete?.requerant && acte) {
      recupererFicheActe({
        parametres: {
          path: { idActe: acte.id },
          query: { recupereImagesEtTexte: false, remplaceIdentiteTitulaireParIdentiteTitulaireAM: true }
        },
        apresSucces: ficheActeDto => {
          const ficheActe = FicheActe.depuisDto(ficheActeDto);

          if (!ficheActe) {
            setReponse({} as IReponseSansDelivranceCSMariageComposition);
          } else {
            setReponse(ReponseSansDelivranceCSMariageComposition.creerReponseSansDelivranceCS(requete, ficheActe));
          }
        },
        apresErreur: erreurs => {
          AfficherMessage.erreur("Erreur lors de la récupération des informations de l'acte", { erreurs });
          setReponse({} as IReponseSansDelivranceCSMariageComposition);
        }
      });
    }
  }, []);

  return reponse;
};

export function estSeulementActeMariage(
  requete: IRequeteDelivrance,
  actes: ResultatRMCActe[] | undefined,
  inscriptions: TResultatRMCInscription[] | undefined
): boolean {
  if (requete?.type === TypeRequete.DELIVRANCE) {
    const sousType: string = requete?.sousType?.nom;
    return (
      (SousTypeDelivrance.RDCSC.nom === sousType || SousTypeDelivrance.RDCSD.nom === sousType) &&
      (inscriptions?.length === undefined || inscriptions?.length === 0) &&
      estSeulementActeMariageSelectionne(actes)
    );
  }
  return true;
}

const estSeulementActeMariageSelectionne = (actes: ResultatRMCActe[] | undefined): boolean =>
  actes?.length === 1 && actes[0].nature === "MARIAGE";
