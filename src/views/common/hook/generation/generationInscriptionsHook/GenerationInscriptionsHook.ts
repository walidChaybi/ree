import { useEffect, useState } from "react";
import {
  FicheUtil,
  TypeFiche
} from "../../../../../model/etatcivil/enum/TypeFiche";
import { TypePacsRcRca } from "../../../../../model/etatcivil/enum/TypePacsRcRca";
import { IFichePacs } from "../../../../../model/etatcivil/pacs/IFichePacs";
import { IFicheRcRca } from "../../../../../model/etatcivil/rcrca/IFicheRcRca";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  IResultGenerationInscriptions,
  IResultGenerationPlusieursInscriptions
} from "../generationUtils";
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

  const [listeRCTraiter, setListeRCTraiter] = useState<IFicheRcRca[]>();

  const [listeRCATraiter, setListeRCATraiter] = useState<IFicheRcRca[]>();

  const [
    resultGenerationPlusieursInscriptions,
    setResultGenerationPlusieursInscriptions
  ] = useState<IResultGenerationPlusieursInscriptions>();

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
        setListeRCTraiter(resultGenerationCertificatRC.fiches as IFicheRcRca[]);
      }
      setListeRCA(
        // @ts-ignore dataRMCAutoInscription forcément non vide
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.RCA)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRC]);

  // 2.1 Génération d'une ou des incriptions RCA
  const resultGenerationCertificatRCA = useGenerationCertificatPACSOuRCOuRCAHook(
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
        setListeRCATraiter(
          resultGenerationCertificatRCA.fiches as IFicheRcRca[]
        );
      }
      setListePACS(
        // @ts-ignore dataRMCAutoInscription forcément non vide
        filterInscriptionsSurUnType(dataRMCAutoInscription, TypeFiche.PACS)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatRCA]);

  // 3.1 Génération d'une ou des incriptions PACS
  const resultGenerationCertificatPACS = useGenerationCertificatPACSOuRCOuRCAHook(
    TypePacsRcRca.PACS,
    requete,
    listePACS
  );

  // 4 - Maj du state résultat 'resultGenerationInscription' pour invoquer ensuite la génération du certificat de situation général (cf. DelivrerCertificatSituationHook.ts)
  useEffect(() => {
    if (resultGenerationCertificatPACS?.idDocumentsReponse) {
      setResultGenerationPlusieursInscriptions({
        idDocumentsReponse: [
          ...idDocumentsReponse,
          ...resultGenerationCertificatPACS.idDocumentsReponse
        ],
        pacs: resultGenerationCertificatPACS.fiches as IFichePacs[],
        rc: listeRCTraiter,
        rca: listeRCATraiter
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatPACS]);

  return resultGenerationPlusieursInscriptions;
}

function nonVide(
  dataRMCAutoInscription?: IResultatRMCInscription[],
  resultGenerationCertificat?: IResultGenerationInscriptions | undefined
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
