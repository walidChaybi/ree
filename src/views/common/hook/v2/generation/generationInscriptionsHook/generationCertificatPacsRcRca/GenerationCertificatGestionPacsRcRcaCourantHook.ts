import { useEffect, useState } from "react";
import { IRequeteTableau } from "../../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IResultGenerationPlusieursDocument } from "../../generationUtils";

export function useGestionCertificatCourant(
  setListePacsRcRcaATraiter: React.Dispatch<
    React.SetStateAction<IResultatRMCInscription[] | undefined>
  >,
  setResultGenerationCertificat: React.Dispatch<
    React.SetStateAction<IResultGenerationPlusieursDocument | undefined>
  >,
  listePacsRcRcaATraiter?: IResultatRMCInscription[],
  requete?: IRequeteTableau,
  listePacsRcRca?: IResultatRMCInscription[],
  uuidDocumentsGeneres?: string[]
) {
  const [pacsRcRcaCourant, setPacsRcRcaCourant] = useState<
    IResultatRMCInscription
  >();

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
      } else if (
        listePacsRcRcaATraiter &&
        listePacsRcRcaATraiter.length === 0
      ) {
        // Il n'y a plus de doc à traiter on créé et renvoie le résultat
        setResultGenerationCertificat({
          idDocumentsReponse: uuidDocumentsGeneres
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listePacsRcRcaATraiter]);

  return { pacsRcRcaCourant };
}
