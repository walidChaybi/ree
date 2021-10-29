import { useEffect, useState } from "react";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../../model/etatcivil/enum/TypeFiche";
import { TypePacsRcRca } from "../../../../../../model/etatcivil/enum/TypePacsRcRca";
import { IRequeteTableauDelivrance } from "../../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IResultGenerationPlusieursDocument } from "../generationUtils";
import { useGenerationCertificatPACSOuRCOuRCAHook } from "./generationCertificatPacsRcRca/GenerationCertificatPACSOuRCOuRCAHook";

export function useGenerationInscriptionsHook(
  requete?: IRequeteTableauDelivrance,
  dataRMCAutoInscription?: IResultatRMCInscription[],
  isOldDocumentsDeleted?: boolean | false
) {
  const [listeRC, setListeRC] = useState<IResultatRMCInscription[]>();

  const [listeRCA, setListeRCA] = useState<IResultatRMCInscription[]>();

  const [listePACS, setListePACS] = useState<IResultatRMCInscription[]>();

  const [idDocumentsReponse, setIdDocumentsReponse] = useState<string[]>([]);

  const [resultGenerationInscription, setResultGenerationInscription] =
    useState<IResultGenerationPlusieursDocument>();

  // 1 - Récupération des RC
  useEffect(() => {
    if (dataRMCAutoInscription && isOldDocumentsDeleted) {
      setListeRC(
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.RC)
      );
    }
  }, [dataRMCAutoInscription, isOldDocumentsDeleted]);

  // 1.1 - Génération d'une ou des incriptions RC
  const resultGenerationCertificatRC = useGenerationCertificatPACSOuRCOuRCAHook(
    TypePacsRcRca.RC,
    requete,
    listeRC
  );

  // 2 - Stockage en mémoire des RC générés
  //   - Puis on récupère les RCA
  useEffect(() => {
    if (nonVide(dataRMCAutoInscription, resultGenerationCertificatRC)) {
      if (resultGenerationCertificatRC?.idDocumentsReponse) {
        setIdDocumentsReponse(resultGenerationCertificatRC.idDocumentsReponse);
      }
      setListeRCA(
        // @ts-ignore dataRMCAutoInscription forcément non vide
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.RCA)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRC]);

  // 2.1 Génération d'une ou des incriptions RCA
  const resultGenerationCertificatRCA =
    useGenerationCertificatPACSOuRCOuRCAHook(
      TypePacsRcRca.RCA,
      requete,
      listeRCA
    );

  // 3 - Stockage en mémoire des RCA générés
  //   - On récupère les PACS
  useEffect(() => {
    if (nonVide(dataRMCAutoInscription, resultGenerationCertificatRCA)) {
      if (resultGenerationCertificatRCA?.idDocumentsReponse) {
        setIdDocumentsReponse([
          ...idDocumentsReponse,
          ...resultGenerationCertificatRCA.idDocumentsReponse
        ]);
      }
      setListePACS(
        // @ts-ignore dataRMCAutoInscription forcément non vide
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.PACS)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRCA]);

  // 3.1 Génération d'une ou des incriptions PACS
  const resultGenerationCertificatPACS =
    useGenerationCertificatPACSOuRCOuRCAHook(
      TypePacsRcRca.PACS,
      requete,
      listePACS
    );

  // 4 - Maj du state résultat 'resultGenerationInscription' pour invoquer ensuite la génération du certificat de situation général (cf. DelivrerCertificatSituationHook.ts)
  useEffect(() => {
    if (resultGenerationCertificatPACS?.idDocumentsReponse) {
      setResultGenerationInscription({
        idDocumentsReponse: [
          ...idDocumentsReponse,
          ...resultGenerationCertificatPACS.idDocumentsReponse
        ]
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatPACS]);

  return resultGenerationInscription;
}

function nonVide(
  dataRMCAutoInscription?: IResultatRMCInscription[],
  resultGenerationCertificat?: IResultGenerationPlusieursDocument | undefined
) {
  return dataRMCAutoInscription && resultGenerationCertificat;
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
