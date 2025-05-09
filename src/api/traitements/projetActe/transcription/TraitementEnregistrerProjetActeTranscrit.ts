import { CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER } from "@api/configurations/etatCivil/acte/transcription/PatchIdActeSuiviDossierConfigApi";
import { CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PatchProjetActeTranscriptionConfigApi";
import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";

import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { IErreurTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { IProjetActeTranscritFormDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritFormDto";
import { IProjetActeTranscritDto, ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";

export interface IPostProjetActeTranscrit {
  idSuiviDossier: string;
  projetActe: IProjetActeTranscritFormDto;
  idRequete: string;
  statutRequete: StatutRequete;
}

type TEtatAppel = "EN_ATTENTE" | "TERMINE";

interface IDonnesTraitement {
  idRequete: string;
  idActe: string;
  idSuiviDossier: string;
  appelStatutRequete: TEtatAppel;
  appelSuiviDossier: TEtatAppel;
}

const TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT: TTraitementApi<IPostProjetActeTranscrit, ProjetActeTranscrit | null> = {
  Lancer: terminerTraitement => {
    const [projetActeCree, setProjetActeCree] = useState<ProjetActeTranscrit | null>(null);
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });
    const [donneesTraitement, setDonneesTraitement] = useState<IDonnesTraitement | null>(null);

    const { appelApi: appelPostProjetActeTranscription } = useFetchApi(CONFIG_POST_PROJET_ACTE_TRANSCRIPTION);

    const { appelApi: appelPatchProjetActeTranscription } = useFetchApi(CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION);
    const { appelApi: appelPatchCreationStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION, true);
    const { appelApi: appelPatchIdActeSuiviDossier } = useFetchApi(CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER);
    const lancer = (parametres: IPostProjetActeTranscrit): void => {
      const idRequete = parametres.idRequete;
      if (!idRequete) {
        terminerTraitement();
        return;
      }
      /* v8 ignore start */
      if (parametres.statutRequete === StatutRequete.A_SIGNER) {
        appelPatchProjetActeTranscription({
          parametres: {
            body: parametres.projetActe
          },
          apresSucces: (projetActe: IProjetActeTranscritDto) => {
            setProjetActeCree(ProjetActeTranscrit.depuisDto(projetActe));
            terminerTraitement();
          },
          apresErreur: erreur => {
            console.error(erreur);
            setErreurTraitement({
              enEchec: true,
              message: "Impossible de modifier le projet d'acte transcrit"
            });
            terminerTraitement();
          }
        });

        return;
      }
      /*v8 ignore stop*/

      appelPostProjetActeTranscription({
        parametres: {
          body: parametres.projetActe
        },
        apresSucces: (projetActe: IProjetActeTranscritDto) => {
          setProjetActeCree(ProjetActeTranscrit.depuisDto(projetActe));
          setDonneesTraitement({
            idActe: projetActe.id,
            idRequete: idRequete,
            idSuiviDossier: parametres.idSuiviDossier,
            appelStatutRequete: "EN_ATTENTE",
            appelSuiviDossier: "EN_ATTENTE"
          });
        },
        apresErreur: erreur => {
          console.error(erreur);
          setErreurTraitement({
            enEchec: true,
            message: "Impossible d'enregister le projet d'acte transcrit"
          });
          terminerTraitement();
        }
      });
    };

    useEffect(() => {
      if (!donneesTraitement) {
        return;
      }

      if (donneesTraitement.appelStatutRequete === "TERMINE" && donneesTraitement.appelSuiviDossier === "TERMINE") {
        terminerTraitement();

        return;
      }

      if (donneesTraitement.appelSuiviDossier === "EN_ATTENTE" && donneesTraitement.appelStatutRequete === "EN_ATTENTE") {
        lancerPatchCreationStatutRequete();
        lancerPatchIdActeSuiviDossier();
      }
    }, [donneesTraitement]);

    const lancerPatchIdActeSuiviDossier = () => {
      if (!donneesTraitement) return;

      appelPatchIdActeSuiviDossier({
        parametres: {
          path: { idSuivi: donneesTraitement.idSuiviDossier, idActe: donneesTraitement.idActe }
        },
        apresErreur: messageErreur => {
          console.error(`Erreur lors de la mise à jour de l'id du projet d'acte dans le suivi de dossier : ${messageErreur}`);
          setErreurTraitement({
            enEchec: true,
            message: "Une erreur est survenue lors de la mise à jour de l'id du projet d'acte dans le suivi de dossier"
          });
          terminerTraitement();
        },
        finalement: () => {
          setDonneesTraitement(donneesTraitementPrec =>
            donneesTraitementPrec
              ? {
                  ...donneesTraitementPrec,
                  appelSuiviDossier: "TERMINE"
                }
              : null
          );
        }
      });
    };

    const lancerPatchCreationStatutRequete = () => {
      if (!donneesTraitement) return;

      appelPatchCreationStatutRequete({
        parametres: {
          path: {
            idRequete: donneesTraitement.idRequete
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
          setDonneesTraitement(donneesTraitementPrec =>
            donneesTraitementPrec
              ? {
                  ...donneesTraitementPrec,
                  appelStatutRequete: "TERMINE"
                }
              : null
          );
        }
      });
    };

    return { lancer, erreurTraitement, reponseTraitement: projetActeCree };
  }
};

export default TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT;
