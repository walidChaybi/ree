/* istanbul ignore file */
/* v8 ignore start A TESTER 03/25 */
import {
  CONFIG_COMPOSITION_ACTE_PDF,
  CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
  IPostProjetActeTranscriptionConfigApiParams,
  IReponseCompositionActePDF
} from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { IErreurTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { ITitulaireDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ITitulaireDto";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";

export interface IPostProjetActeTranscritEtPdfParams extends IPostProjetActeTranscriptionConfigApiParams {
  nature_acte?: string;
  formaterTitulaire?: (titulaire: ITitulaireDto) => string;
}

export interface IReponseProjetActeEtPdf {
  projetActe: IProjetActeTranscritDto;
  pdf?: {
    contenu: string;
    nbPages: number;
  };
}

export interface ICreationActionEtMiseAjourStatutParams {
  libelleAction?: string;
  statutRequete?: StatutRequete;
  idRequete?: string;
}

const TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT: TTraitementApi<IPostProjetActeTranscritEtPdfParams, IReponseProjetActeEtPdf> = {
  Lancer: terminerTraitement => {
    const [resultat, setResultat] = useState<IReponseProjetActeEtPdf>({ projetActe: {} as IProjetActeTranscritDto });
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });

    const { appelApi: appelEnregistrerRequeteApi } = useFetchApi(CONFIG_POST_PROJET_ACTE_TRANSCRIPTION);
    const { appelApi: appelPatchCreationStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION);
    const { appelApi: appelerCompositionPdf } = useFetchApi(CONFIG_COMPOSITION_ACTE_PDF);

    const lancer = (parametres?: IPostProjetActeTranscritEtPdfParams): void => {
      const idRequete = parametres?.idRequete;
      if (!parametres || !idRequete) {
        terminerTraitement();
        return;
      }

      appelEnregistrerRequeteApi({
        parametres: {
          body: parametres.projetActe
        },
        apresSucces: (projetActe: IProjetActeTranscritDto) => {
          setResultat(statePrecedente => ({ ...statePrecedente, projetActe }));

          if (parametres.formaterTitulaire && projetActe.titulaires) {
            appelerCompositionPdf({
              parametres: {
                path: { typeComposition: "ACTE_TEXTE", version: "1" },
                body: {
                  nature_acte: parametres.nature_acte,
                  texte_corps_acte: projetActe?.corpsTexte?.texte,
                  titulaires: parametres.formaterTitulaire(projetActe.titulaires[0])
                }
              },
              apresSucces: (reponse: IReponseCompositionActePDF) => {
                setResultat(statePrecedente => ({
                  ...statePrecedente,
                  pdf: {
                    contenu: reponse.contenu,
                    nbPages: reponse.nbPages
                  }
                }));

                lancerPatchCreationStatutRequete(idRequete);
              },
              apresErreur: messageErreur => {
                console.error(`Erreur lors de la génération du PDF : ${messageErreur}`);
                setErreurTraitement({
                  enEchec: true,
                  message: "Une erreur est survenue lors de la génération du PDF"
                });
                terminerTraitement();
              }
            });
          } else {
            lancerPatchCreationStatutRequete(idRequete);
          }
        },
        apresErreur: () => {
          setErreurTraitement({
            enEchec: true,
            message: "Impossible d'enregister le projet d'acte transcrit"
          });
          terminerTraitement();
        }
      });
    };

    const lancerPatchCreationStatutRequete = (idRequete: string) => {
      appelPatchCreationStatutRequete({
        parametres: {
          path: {
            idRequete: idRequete
          },
          query: {
            statut: StatutRequete.getKey(StatutRequete.A_SIGNER)
          }
        },
        apresErreur: () =>
          setErreurTraitement({
            enEchec: true,
            message: "Impossible de mettre à jour le statut de la requête"
          }),
        finalement: () => {
          terminerTraitement();
        }
      });
    };

    return { lancer, erreurTraitement, reponseTraitement: resultat };
  }
};

export default TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT;
/* v8 ignore end */
