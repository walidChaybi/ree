import { useEffect, useState } from "react";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../../model/etatcivil/enum/TypeFiche";
import { IRequeteTableau } from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IResultGenerationPlusieursDocument } from "../generationUtils";
import { useGenerationCertificatRCAHook } from "./GenerationCertificatRCAHook";
import { useGenerationCertificatRCHook } from "./GenerationCertificatRCHook";

export function useGenerationInscriptionsHook(
  requete?: IRequeteTableau,
  dataRMCAutoInscription?: IResultatRMCInscription[]
) {
  const [listeRC, setListeRC] = useState<IResultatRMCInscription[]>();

  const [listeRCA, setListeRCA] = useState<IResultatRMCInscription[]>();

  const [contenuDocumentsReponse, setContenuDocumentsReponse] = useState<
    string[]
  >([]);

  const [idDocumentsReponse, setIdDocumentsReponse] = useState<string[]>([]);

  const [
    resultGenerationInscription,
    setResultGenerationInscription
  ] = useState<IResultGenerationPlusieursDocument>();

  // 1 - On récupère les RCA puis génération du ou des incriptions RCA
  useEffect(() => {
    if (dataRMCAutoInscription) {
      setListeRC(
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.RC)
      );
    }
  }, [dataRMCAutoInscription]);

  const resultGenerationCertificatRC = useGenerationCertificatRCHook(
    requete,
    listeRC
  );

  useEffect(() => {
    if (dataRMCAutoInscription && resultGenerationCertificatRC) {
      if (
        resultGenerationCertificatRC?.idDocumentsReponse &&
        resultGenerationCertificatRC?.contenuDocumentsReponse
      ) {
        setIdDocumentsReponse(resultGenerationCertificatRC.idDocumentsReponse);
        setContenuDocumentsReponse(
          resultGenerationCertificatRC.contenuDocumentsReponse
        );
      }
      setListeRCA(
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.RCA)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRC]);

  const resultGenerationCertificatRCA = useGenerationCertificatRCAHook(
    requete,
    listeRCA
  );

  useEffect(() => {
    if (
      resultGenerationCertificatRCA &&
      resultGenerationCertificatRCA?.idDocumentsReponse &&
      resultGenerationCertificatRCA?.contenuDocumentsReponse
    ) {
      setIdDocumentsReponse(
        idDocumentsReponse.concat(
          resultGenerationCertificatRCA.idDocumentsReponse
        )
      );
      setContenuDocumentsReponse(
        contenuDocumentsReponse.concat(
          resultGenerationCertificatRCA.contenuDocumentsReponse
        )
      );
    }

    setResultGenerationInscription({
      idDocumentsReponse,
      contenuDocumentsReponse
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRCA]);

  return resultGenerationInscription;
}

function filterInscriptionsSurUnType(
  dataRMCAutoInscription: IResultatRMCInscription[],
  type: TypeFiche
) {
  return dataRMCAutoInscription?.filter(
    inscription =>
      type === FicheUtil.getTypeFicheFromString(inscription.categorie)
  );
}
