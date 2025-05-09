import { CONFIG_GET_PROJET_ACTE } from "@api/configurations/etatCivil/acte/GetProjetActeConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { IErreurTraitement, TTraitementApi } from "@api/traitements/TTraitementApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ProjetActeTranscrit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useState } from "react";
import useFetchApi from "../../../../hooks/api/FetchApiHook";

interface IParamsChargement {
  idRequete: string;
  estModeConsultation: boolean;
}

interface IRequeteEtProjetActe {
  requete: IRequeteCreationTranscription | null;
  projetActe: ProjetActeTranscrit | null;
}

const TRAITEMENT_CHARGER_REQUETE_TRANSCRIPTION_ET_PROJET_ACTE_TRANSCRIT: TTraitementApi<IParamsChargement, IRequeteEtProjetActe> = {
  Lancer: terminerTraitement => {
    const [requeteEtProjetActe, setRequeteEtProjetActe] = useState<IRequeteEtProjetActe>({
      requete: null,
      projetActe: null
    });

    const [erreurTraitement, setErreurTraitement] = useState<IErreurTraitement>({ enEchec: false });

    const { appelApi: getDetailRequete } = useFetchApi(CONFIG_GET_DETAIL_REQUETE);
    const { appelApi: getProjetActe } = useFetchApi(CONFIG_GET_PROJET_ACTE);

    const lancer = ({ idRequete, estModeConsultation }: IParamsChargement) => {
      if (!idRequete) terminerTraitement();

      getDetailRequete({
        parametres: {
          path: {
            idRequete: idRequete
          },
          query: {
            isConsultation: estModeConsultation,
            isConsultationHistoriqueAction: false
          }
        },
        apresSucces: requeteDto => {
          const requeteTranscription = mappingRequeteCreation(requeteDto);
          setRequeteEtProjetActe(valeurPrecedente => ({ ...valeurPrecedente, requete: requeteTranscription }));

          if (
            requeteTranscription.statutCourant.statut === StatutRequete.A_SIGNER &&
            requeteTranscription.titulaires?.[0].suiviDossiers?.[0].idActe
          ) {
            getProjetActe({
              parametres: { path: { idActe: requeteTranscription.titulaires[0].suiviDossiers[0].idActe } },
              apresSucces: projetActeDto => {
                setRequeteEtProjetActe(valeurPrecedente => ({
                  ...valeurPrecedente,
                  projetActe: ProjetActeTranscrit.depuisDto(projetActeDto)
                }));
                terminerTraitement();
              },
              apresErreur: messageErreur => {
                setErreurTraitement({ enEchec: true, message: "Une erreur est survenue lors de la récupération du projet d'acte" });
                console.error(`Erreur lors de la récupération du projet d'acte: ${messageErreur}`);
                terminerTraitement();
              }
            });
          } else {
            terminerTraitement();
          }
        },
        apresErreur: messageErreur => {
          setErreurTraitement({ enEchec: true, message: "Une erreur est survenue lors de la récupération de la requête de transcription" });
          console.error(`Erreur lors de la récupération de la requete: ${messageErreur}`);
          terminerTraitement();
        }
      });
    };
    return { lancer, erreurTraitement, reponseTraitement: requeteEtProjetActe };
  }
};

export default TRAITEMENT_CHARGER_REQUETE_TRANSCRIPTION_ET_PROJET_ACTE_TRANSCRIT;
