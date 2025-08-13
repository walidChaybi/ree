import { useEffect, useState } from "react";

interface IStyleDocument {
  padding?: string;
  fontSize?: string;
}

const COEFFICIENT_MARGE = 0.035;
const COEFFICIENT_TAILLE_POLICE = 0.0177;

const DocumentTexte: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [refDocument, setRefDocument] = useState<HTMLDivElement | null>(null);
  const [refContenuDocument, setRefContenuDocument] = useState<HTMLDivElement | null>(null);
  const [styleDocument, setStyleDocument] = useState<IStyleDocument>({});

  useEffect(() => {
    if (!refDocument || !refContenuDocument) return;

    const observeurTaille = new ResizeObserver(elements => {
      elements.forEach(element => {
        const largeur = element.contentRect.width;
        setStyleDocument({
          padding: `${largeur * COEFFICIENT_MARGE}px`,
          fontSize: `${largeur * COEFFICIENT_TAILLE_POLICE}px`
        });
      });
    });
    observeurTaille.observe(refDocument);

    return () => {
      observeurTaille.disconnect();
    };
  }, [refDocument, refContenuDocument]);

  return (
    <div
      ref={setRefDocument}
      className="mx-auto flex w-full max-w-[750px] bg-blanc font-liberation shadow-lg"
    >
      <div
        ref={setRefContenuDocument}
        className="contenu-document-texte flex aspect-[21/29.7] w-full overflow-hidden break-words"
        style={styleDocument}
      >
        {children}
      </div>
    </div>
  );
};

export default DocumentTexte;
