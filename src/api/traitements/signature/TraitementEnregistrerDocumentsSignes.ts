import { CONFIG_PATCH_DERNIERE_DELIVRANCE_ACTE } from "@api/configurations/etatCivil/acte/PatchDerniereDelivranceActeConfigApi";
import { CONFIG_POST_RECUPERER_DONNEES_POUR_TELEVERIFICATION } from "@api/configurations/etatCivil/acte/PostRecupererDonneesPourTeleverificationConfigApi";
import { CONFIG_PATCH_SIGNATURE_PAR_LOT_DOCUMENTS_REPONSES } from "@api/configurations/requete/documentsReponses/PatchSignatureParLotDocumentsResponsesConfigApi";
import { CONFIG_POST_SAUVEGARDER_DOCUMENTS } from "@api/configurations/televerification/PostSauvegarderDocumentsConfigApi";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { useEffect, useState } from "react";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import { IDocumentSigne } from "../../../utils/Signature";
import { TRAITEMENT_SANS_REPONSE, TTraitementApi } from "../TTraitementApi";

interface IParamTraitement {
  documentsSigne: IDocumentSigne[];
}

interface IDonneesTeleverification {
  [cleIdActe: string]: {
    idActe: string;
    natureActe?: string;
    anneeEvenement?: number;
    nomTitulaire1?: string;
    nomTitulaire2?: string;
  };
}

const TRAITEMENT_ENREGISTRER_DOCUMENTS_SIGNES: TTraitementApi<IParamTraitement> = {
  Lancer: terminerTraitement => {
    const [enEchec, setEnEchec] = useState<boolean>(false);
    const { appelApi: appelEnregistrerLotDocumentsSignes } = useFetchApi(CONFIG_PATCH_SIGNATURE_PAR_LOT_DOCUMENTS_REPONSES);
    const { appelApi: appelRecupererDonneesPourTeleverification } = useFetchApi(CONFIG_POST_RECUPERER_DONNEES_POUR_TELEVERIFICATION);
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
      let donneesPourTeleverification: IDonneesTeleverification = {};

      appelEnregistrerLotDocumentsSignes({
        parametres: {
          body: parametres.documentsSigne.map(documentSigne => ({
            id: documentSigne.id,
            idRequete: documentSigne.idRequete,
            numeroFonctionnel: documentSigne.numeroFonctionnel,
            contenu: documentSigne.contenu ?? ""
          }))
        },
        apresSucces: () =>
          gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_CIBLE_EXTRAITS_COPIES)
            ? appelRecupererDonneesPourTeleverification({
                parametres: { body: idsActesConcernes },
                apresSucces: donneesPourTeleverificationDtos => {
                  donneesPourTeleverification = donneesPourTeleverificationDtos.reduce(
                    (donnees, donneesDto) => ({
                      ...donnees,
                      [donneesDto.idActe]: donneesDto
                    }),
                    {}
                  );
                },
                finalement: () =>
                  appelEnregistrerTeleverificationApi({
                    parametres: {
                      body: parametres.documentsSigne.map(documentSigne => ({
                        idDocument: documentSigne.id,
                        idRequete: documentSigne.idRequete,
                        pdf: documentSigne.contenu ?? "",
                        ...(donneesPourTeleverification[documentSigne.idActe ?? ""] ?? {})
                      }))
                    },
                    apresErreur: () => setEnEchec(true),
                    finalement: () => mettreAJourDerniereDelivrance(idsActesConcernes)
                  })
              })
            : mettreAJourDerniereDelivrance(idsActesConcernes),
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
