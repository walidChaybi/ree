import { MdPrint } from "react-icons/md";
import PolicesEtStylesRECE from "../../../utils/PolicesEtStylesRECE";

const imprimerDocument = () => {
  const pagesDocumentTexte = document.querySelectorAll(".contenu-document-texte");
  const fenetreImpression = window.open("", "_blank", "left=0,top=0,width=800,height=800,toolbar=0,scrollbars=0,status=0");
  if (!fenetreImpression || !pagesDocumentTexte.length) return;

  PolicesEtStylesRECE.copieDansFenetreExterne(fenetreImpression);

  pagesDocumentTexte.forEach(page => {
    let elem = fenetreImpression.document.createElement("div");
    elem.innerHTML = page.innerHTML;
    elem.style.fontSize = "13.65px";
    elem.style.height = "100vh";
    elem.style.display = "flex";
    elem.style.fontFamily = "Liberation Mono";
    fenetreImpression.document.body.appendChild(elem);
  });

  fenetreImpression.document.title = "Aperçu projet acte";
  fenetreImpression.document.close();
  fenetreImpression.focus();
  fenetreImpression.print();
  fenetreImpression.close();
};

interface IConteneurDocumentProps {
  imprimable?: boolean;
}

const ConteneurDocument: React.FC<React.PropsWithChildren<IConteneurDocumentProps>> = ({ children, imprimable }) => {
  return (
    <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-gris-clair">
      {imprimable && (
        <div className="sticky top-0 text-end">
          <button
            className="min-w-0 bg-transparent px-1.5 py-0.5 text-bleu-sombre transition-colors hover:text-bleu focus-visible:text-bleu"
            title="Imprimer"
            aria-label="Imprimer"
            type="button"
            onClick={imprimerDocument}
          >
            <MdPrint
              className="text-lg"
              aria-hidden
            />
          </button>
        </div>
      )}

      <div
        className="absolute w-[calc(100%-80px)] pb-24 transition-all duration-100"
        style={{ top: "40px", left: "40px" }}
      >
        {children}
      </div>
    </div>
  );
};

export default ConteneurDocument;
