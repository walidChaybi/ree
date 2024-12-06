import { CONFIG_PATCH_DERNIERE_DELIVRANCE_ACTE } from "@api/configurations/etatCivil/acte/PatchDerniereDelivranceActeConfigApi";
import { CONFIG_PATCH_SIGNATURE_PAR_LOT_DOCUMENTS_REPONSES } from "@api/configurations/requete/documentsReponses/PatchSignatureParLotDocumentsResponsesConfigApi";
import { CONFIG_POST_SAUVEGARDER_DOCUMENTS } from "@api/configurations/televerification/PostSauvegarderDocumentsConfigApi";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import { IDocumentSigne } from "../../../utils/Signature";
import { TRAITEMENT_SANS_REPONSE, TTraitementApi } from "../TTraitementApi";

interface IParamTraitement {
  documentsSigne: IDocumentSigne[];
}

const TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES: TTraitementApi<IParamTraitement> = {
  Lancer: terminerTraitement => {
    const [enEchec, setEnEchec] = useState<boolean>(false);
    const { appelApi: appelEnregistrerRequeteApi } = useFetchApi(CONFIG_PATCH_SIGNATURE_PAR_LOT_DOCUMENTS_REPONSES);
    const { appelApi: appelEnregistrerTeleverificationApi } = useFetchApi(CONFIG_POST_SAUVEGARDER_DOCUMENTS);
    const { appelApi: appelMiseAJourDerniereDelivrance } = useFetchApi(CONFIG_PATCH_DERNIERE_DELIVRANCE_ACTE);

    const mettreAJourDerniereDelivrance = (idsActes: string[]) => {
      const idsActesAMettreAJour = [...idsActes];
      const idActe = idsActesAMettreAJour.shift();
      if (!idActe) {
        terminerTraitement();

        return;
      }

      appelMiseAJourDerniereDelivrance({
        parametres: { path: { idActe: idActe } },
        finalement: () => mettreAJourDerniereDelivrance(idsActesAMettreAJour)
      });
    };

    const lancer = (parametres?: IParamTraitement) => {
      if (!parametres) {
        terminerTraitement();

        return;
      }

      const idsActesConcernes = parametres.documentsSigne.reduce((idsActes: string[], documentSigne) => {
        const idActe = documentSigne.idActe;
        if (idActe?.length && !idsActes.includes(idActe)) {
          idsActes.push(idActe);
        }

        return idsActes;
      }, []);

      appelEnregistrerRequeteApi({
        parametres: {
          body: parametres.documentsSigne.map(documentSigne => ({
            id: documentSigne.id,
            idRequete: documentSigne.idRequete,
            numeroFonctionnel: documentSigne.numeroFonctionnel,
            contenu: documentSigne.contenu ?? ""
          }))
        },
        apresSucces: () =>
          appelEnregistrerTeleverificationApi({
            parametres: {
              body: parametres.documentsSigne.map(documentSigne => ({
                idDocumentReponse: documentSigne.id,
                idRequete: documentSigne.idRequete,
                pdf: documentSigne.contenu ?? ""
              }))
            },
            apresErreur: () => setEnEchec(true),
            finalement: () => mettreAJourDerniereDelivrance(idsActesConcernes)
          }),
        apresErreur: () => setEnEchec(true)
      });
    };

    useEffect(() => {
      if (!enEchec) {
        return;
      }

      terminerTraitement();
    }, [enEchec]);

    return { lancer, erreurTraitement: { enEchec }, reponseTraitement: TRAITEMENT_SANS_REPONSE };
  }
};

export default TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES;
