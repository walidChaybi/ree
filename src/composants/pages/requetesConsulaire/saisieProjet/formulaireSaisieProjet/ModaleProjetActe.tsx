import AffichagePDF from "../../../../commun/affichageDocument/AffichagePDF";
import Bouton from "../../../../commun/bouton/Bouton";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";

interface IModaleProjetActeProps {
  pdfBase64: string | null;
  fermerModale: () => void;
}

const ModaleProjetActe: React.FC<IModaleProjetActeProps> = ({ pdfBase64, fermerModale }) => {
  if (!pdfBase64) return null;

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
