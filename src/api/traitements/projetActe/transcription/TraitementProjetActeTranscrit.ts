import { CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER } from "@api/configurations/etatCivil/acte/transcription/PatchIdActeSuiviDossier";
import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { IErreurTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useEffect, useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";

export interface IPostProjetActeTranscrit {
  idSuiviDossier: string;
  projetActe: IProjetActeTranscritDto;
  idRequete: string;
}

export interface IReponseProjetActe {
  projetActe: IProjetActeTranscritDto;
}

type TEtatAppel = "EN_ATTENTE" | "TERMINE";

interface IDonnesTraitement {
  idRequete: string;
  idActe: string;
  idSuiviDossier: string;
  appelStatutRequete: TEtatAppel;
  appelSuiviDossier: TEtatAppel;
}

const TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT: TTraitementApi<IPostProjetActeTranscrit, IReponseProjetActe> = {
  Lancer: terminerTraitement => {
    const [projetActeCree, setProjetActeCree] = useState<IReponseProjetActe>({ projetActe: {} as IProjetActeTranscritDto });
    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });
    const [donneesTraitement, setDonneesTraitement] = useState<IDonnesTraitement | null>(null);

    const { appelApi: appelPostProjetActeTranscription } = useFetchApi(CONFIG_POST_PROJET_ACTE_TRANSCRIPTION);
    const { appelApi: appelPatchCreationStatutRequete } = useFetchApi(CONFIG_PATCH_STATUT_REQUETE_CREATION, true);

    const { appelApi: appelPatchIdActeSuiviDossier } = useFetchApi(CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER);

    const lancer = (parametres: IPostProjetActeTranscrit): void => {
      const idRequete = parametres.idRequete;
      if (!idRequete) {
        terminerTraitement();
        return;
      }

      if (parametres.projetActe.idActe) {
        // TODO PATCH
        terminerTraitement();
        return;
      }

      appelPostProjetActeTranscription({
        parametres: {
          body: parametres.projetActe
        },
        // FIXME APRES REFACTO TYPAGE PROJET_ACTE
        apresSucces: (projetActe: any) => {
          setProjetActeCree(statePrecedent => ({ ...statePrecedent, projetActe }));
          setDonneesTraitement({
            idActe: projetActe.id,
            idRequete: idRequete,
            idSuiviDossier: parametres.idSuiviDossier,
            appelStatutRequete: "EN_ATTENTE",
            appelSuiviDossier: "EN_ATTENTE"
          });
        },
        apresErreur: erreur => {
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
