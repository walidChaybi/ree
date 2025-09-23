import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { TFiche } from "@pages/fiche/FicheUtils";
import { useEffect, useState } from "react";
import { IResultGenerationInscriptions } from "../../generationUtils";

export function useGestionCertificatCourant(
  setListePacsRcRcaATraiter: React.Dispatch<React.SetStateAction<TResultatRMCInscription[] | undefined>>,
  setResultGenerationCertificat: React.Dispatch<React.SetStateAction<IResultGenerationInscriptions | undefined>>,
  listePacsRcRcaATraiter?: TResultatRMCInscription[],
  requete?: IRequeteTableauDelivrance,
  listePacsRcRca?: TResultatRMCInscription[],
  uuidDocumentsGeneres?: string[],
  fichePacsRcRcaTraiter?: TFiche[]
) {
  const [pacsRcRcaCourant, setPacsRcRcaCourant] = useState<TResultatRMCInscription>();

  //0.1- Renvoie du résultat vide si pas de PACS sinon alimentation de la liste 'listePACSATraiter' qui sera utilisée dans le code
  useEffect(() => {
    if (listePacsRcRca && requete) {
      if (listePacsRcRca.length > 0) {
        setListePacsRcRcaATraiter(listePacsRcRca);
      } else {
        setResultGenerationCertificat({ idDocumentsReponse: [] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listePacsRcRca]);

  //0.2- Alimentation du pacs courant à traiter et renvoi du résultat lorsqu'il n'y en a plus
  useEffect(() => {
    if (listePacsRcRcaATraiter && requete) {
      if (listePacsRcRcaATraiter.length > 0) {
        setPacsRcRcaCourant(listePacsRcRcaATraiter[0]);
      } else if (listePacsRcRcaATraiter.length === 0) {
        // Il n'y a plus de doc à traiter on créé et renvoie le résultat
        setResultGenerationCertificat({
          idDocumentsReponse: uuidDocumentsGeneres,
          fiches: fichePacsRcRcaTraiter
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listePacsRcRcaATraiter]);

  return { pacsRcRcaCourant };
}
