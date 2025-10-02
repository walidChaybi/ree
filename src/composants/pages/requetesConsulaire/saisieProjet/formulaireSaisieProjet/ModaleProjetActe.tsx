import { compositionApi } from "@api/appels/compositionApi";
import {
  CONFIG_POST_COMPOSITION_ACTE_TEXTE,
  IReponseCompositionActePDF
} from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { TitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/TitulaireProjetActeTranscrit";
import { useContext, useEffect, useMemo, useState } from "react";
import { SaisieProjetActeTranscritContext } from "../../../../../contexts/SaisieProjetActeTranscritContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import LiensRECE from "../../../../../router/LiensRECE";
import { INFO_PAGE_MES_REQUETES_CONSULAIRES } from "../../../../../router/infoPages/InfoPagesEspaceConsulaire";
import AfficherMessage from "../../../../../utils/AfficherMessage";
import AffichagePDF from "../../../../commun/affichageDocument/AffichagePDF";
import Bouton from "../../../../commun/bouton/Bouton";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";
import SignatureDocument from "../../../../commun/signature/SignatureDocument";

// /!\ À supprimer après le FIX dans Composition API /ACTE_TEXTE/1
/*v8 ignore start */
const formaterNomPrenomTitulaire = (titulaire: TitulaireProjetActeTranscrit): string => {
  if (!titulaire) {
    return "";
  }

  let nomPrenomsFormates = "de\u00A0";

  if (titulaire.prenoms && titulaire.prenoms.length > 0) {
    nomPrenomsFormates += titulaire.prenoms.join(", ") + " ";
  }

  nomPrenomsFormates += titulaire?.nom;

  return nomPrenomsFormates;
};
/*v8 ignore stop */

interface IModaleProjetActeProps {
  projetActe: ProjetActeTranscrit;
  fermerModale: () => void;
}

const ModaleProjetActe: React.FC<IModaleProjetActeProps> = ({ fermerModale, projetActe }) => {
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const { requete } = useContext(SaisieProjetActeTranscritContext);
  const [estActeSigne, setEstActeSigne] = useState<boolean>(false);
  const { appelApi: appelerCompositionPdf } = useFetchApi(CONFIG_POST_COMPOSITION_ACTE_TEXTE);
  const { appelApi: getDonneesPourCompositionActeTexte } = useFetchApi(CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR);

  const natureActe = useMemo(() => {
    const { prefixeTitre, natureActe } = (() => {
      switch (projetActe.nature) {
        case "NAISSANCE":
          return { prefixeTitre: "ACTE DE", natureActe: "NAISSANCE" };
        default:
          return { prefixeTitre: "ACTE", natureActe: "<nature acte>" };
      }
    })();

    return `${prefixeTitre} ${natureActe}`;
  }, [projetActe.nature]);

  useEffect(() => {
    if (!estActeSigne) return;

    getDonneesPourCompositionActeTexte({
      parametres: { path: { idActe: projetActe.id } },
      apresSucces: donneesComposition => {
        compositionApi.getCompositionActeTexte(donneesComposition).then(retour => {
          setPdfBase64(retour.body.data.contenu ?? "");
        });
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de la récupération de l'acte: ${messageErreur}`);
      }
    });
  }, [estActeSigne]);

  useEffect(() => {
    appelerCompositionPdf({
      parametres: {
        body: {
          nature_acte: natureActe,
          texte_corps_acte: projetActe.corpsTexte.texte || "",
          titulaires: formaterNomPrenomTitulaire(projetActe.titulaires[0])
        }
      },
      apresSucces: (reponse: IReponseCompositionActePDF) => {
        if (reponse.contenu) {
          setPdfBase64(reponse.contenu);
        } else {
          AfficherMessage.avertissement("L'aperçu PDF n'a pas pu être généré");
        }
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de la génération du PDF : ${messageErreur}`);
        AfficherMessage.erreur("Une erreur est survenue lors de la composition de l'acte", { erreurs: messageErreur });
      }
    });
  }, [projetActe, estActeSigne]);

  return (
    <ConteneurModale fermerModale={fermerModale}>
      <div className="flex h-[90vh] w-[90vw] animate-apparition flex-col overflow-hidden rounded-lg bg-blanc shadow-2xl">
        <div className="flex items-center justify-end border-b border-gris bg-bleu p-2">
          <Bouton
            onClick={fermerModale}
            aria-label="Fermer"
            styleBouton="suppression"
          >
            X
          </Bouton>
        </div>

        <div className="flex flex-grow overflow-hidden">
          <div className="h-full w-3/5 animate-entree-gauche overflow-hidden p-6">
            <div className="flex h-[calc(100%-2rem)] w-full rounded-lg border border-gray-100 shadow-md">
              <AffichagePDF
                contenuBase64={pdfBase64}
                typeZoom={90}
              />
            </div>
          </div>

          <div className="w-2/5 p-6">
            <div className="m-auto flex h-full max-w-md items-center justify-center rounded-lg p-6 text-center">
              <div className="text-center">
                {!estActeSigne ? (
                  <SignatureDocument
                    typeSignature="TRANSCRIT"
                    idActe={projetActe.id}
                    idRequete={requete.id}
                    apresSignature={(succes: boolean) => {
                      if (succes) {
                        setEstActeSigne(true);
                        AfficherMessage.succes("L'acte a été signé avec succès.", { fermetureAuto: true });
                      } else {
                        fermerModale();
                      }
                    }}
                  />
                ) : (
                  <Bouton
                    title="Mes requêtes consulaires"
                    styleBouton="principal"
                    lienVers={LiensRECE.genererLien(INFO_PAGE_MES_REQUETES_CONSULAIRES.url)}
                  >
                    {"Mes requêtes consulaires"}
                  </Bouton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConteneurModale>
  );
};

export default ModaleProjetActe;
