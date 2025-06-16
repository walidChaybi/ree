import {
  CONFIG_POST_COMPOSITION_ACTE_TEXTE,
  IReponseCompositionActePDF
} from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { TitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/TitulaireProjetActeTranscrit";
import messageManager from "@util/messageManager";
import { useEffect, useMemo, useState } from "react";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import AffichagePDF from "../../../../commun/affichageDocument/AffichagePDF";
import Bouton from "../../../../commun/bouton/Bouton";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";

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
  const { appelApi: appelerCompositionPdf } = useFetchApi(CONFIG_POST_COMPOSITION_ACTE_TEXTE);

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
          messageManager.showWarning("L'aperçu PDF n'a pas pu être généré");
        }
      },
      apresErreur: messageErreur => {
        console.error(`Erreur lors de la génération du PDF : ${messageErreur}`);
        messageManager.showError("Une erreur est survenue lors de la composition de l'acte");
      }
    });
  }, [projetActe]);

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

          <div className="h-full w-2/5 animate-entree-droite border-l border-gray-200 p-6">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-6">
              <div className="mb-4 text-gray-500">{/*Zone de signature*/}</div>
            </div>
          </div>
        </div>
      </div>
    </ConteneurModale>
  );
};

export default ModaleProjetActe;
