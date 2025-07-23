import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { useEffect, useState } from "react";
import { IResultGenerationPlusieursInscriptions } from "../generationUtils";
import { useGenerationCertificatPACSOuRCOuRCAHook } from "./generationCertificatPacsRcRca/GenerationCertificatPACSOuRCOuRCAHook";

export function useGenerationInscriptionsHook(
  requete?: IRequeteTableauDelivrance,
  dataRMCAutoInscription?: TResultatRMCInscription[],
  isOldDocumentsDeleted?: boolean,
  inscriptionsRcRadiation?: IInscriptionRc
) {
  const [listeRC, setListeRC] = useState<ResultatRMCInscription<"RC">[]>();

  const [listeRCA, setListeRCA] = useState<ResultatRMCInscription<"RCA">[]>();

  const [listePACS, setListePACS] = useState<ResultatRMCInscription<"PACS">[]>();

  const [idDocumentsReponse, setIdDocumentsReponse] = useState<string[]>([]);

  const [listeRCTraiter, setListeRCTraiter] = useState<FicheRcRca[]>();

  const [listeRCATraiter, setListeRCATraiter] = useState<FicheRcRca[]>();

  const [resultGenerationPlusieursInscriptions, setResultGenerationPlusieursInscriptions] =
    useState<IResultGenerationPlusieursInscriptions>();

  // 1 - Récupération des RC
  useEffect(() => {
    if (dataRMCAutoInscription && isOldDocumentsDeleted) {
      setListeRC(
        dataRMCAutoInscription.filter((inscription): inscription is ResultatRMCInscription<"RC"> => "RC" === inscription.categorie)
      );
    }
  }, [dataRMCAutoInscription, isOldDocumentsDeleted]);

  // 1.1 - Génération d'une ou des incriptions RC
  const resultGenerationCertificatRC = useGenerationCertificatPACSOuRCOuRCAHook(
    ETypePacsRcRca.RC,
    requete,
    listeRC,
    inscriptionsRcRadiation
  );

  // 2 - Stockage en mémoire des RC générés
  //   - Puis on récupère les RCA
  useEffect(() => {
    if (dataRMCAutoInscription && resultGenerationCertificatRC) {
      if (resultGenerationCertificatRC?.idDocumentsReponse) {
        setIdDocumentsReponse(resultGenerationCertificatRC.idDocumentsReponse);
        setListeRCTraiter(resultGenerationCertificatRC.fiches as FicheRcRca[]);
      }
      setListeRCA(
        dataRMCAutoInscription.filter((inscription): inscription is ResultatRMCInscription<"RCA"> => "RCA" === inscription.categorie)
      );
    }
  }, [resultGenerationCertificatRC]);

  // 2.1 Génération d'une ou des incriptions RCA
  const resultGenerationCertificatRCA = useGenerationCertificatPACSOuRCOuRCAHook(ETypePacsRcRca.RCA, requete, listeRCA);

  // 3 - Stockage en mémoire des RCA générés
  //   - On récupère les PACS
  useEffect(() => {
    if (dataRMCAutoInscription && resultGenerationCertificatRCA) {
      if (resultGenerationCertificatRCA?.idDocumentsReponse) {
        setIdDocumentsReponse([...idDocumentsReponse, ...resultGenerationCertificatRCA.idDocumentsReponse]);
        setListeRCATraiter(resultGenerationCertificatRCA.fiches as FicheRcRca[]);
      }
      setListePACS(
        dataRMCAutoInscription.filter((inscription): inscription is ResultatRMCInscription<"PACS"> => "PACS" === inscription.categorie)
      );
    }
  }, [resultGenerationCertificatRCA]);

  // 3.1 Génération d'une ou des incriptions PACS
  const resultGenerationCertificatPACS = useGenerationCertificatPACSOuRCOuRCAHook(ETypePacsRcRca.PACS, requete, listePACS);

  // 4 - Maj du state résultat 'resultGenerationInscription' pour invoquer ensuite la génération du certificat de situation général (cf. DelivrerCertificatSituationHook.ts)
  useEffect(() => {
    if (resultGenerationCertificatPACS?.idDocumentsReponse) {
      setResultGenerationPlusieursInscriptions({
        idDocumentsReponse: [...idDocumentsReponse, ...resultGenerationCertificatPACS.idDocumentsReponse],
        pacs: resultGenerationCertificatPACS.fiches as FichePacs[],
        rc: listeRCTraiter,
        rca: listeRCATraiter
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultGenerationCertificatPACS]);

  return resultGenerationPlusieursInscriptions;
}
