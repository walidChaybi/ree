import { useEffect, useState } from "react";
import EtatImage from "../../../model/retoucheImage/EtatImage";
import Canvas from "./Canvas";
import GestionnairePages from "./GestionnairePages";

export interface ITaille {
  largeur: number;
  hauteur: number;
}

const POURCENTAGE_LARGEUR_CANVAS = 0.45;
const MIME_BASE64_PNG = "data:image/png;base64";

interface IRetoucheImageProps {
  images: string[];
}

const RetoucheImage: React.FC<IRetoucheImageProps> = ({ images }) => {
  const [pages, setPages] = useState<EtatImage[]>([]);
  const [pageCourante, setPageCourante] = useState<number>(0);
  const [tailles, setTailles] = useState<ITaille[]>([]);

  const creerPages = async () => {
    const imgs = await Promise.all(
      images.map(
        src =>
          new Promise<HTMLImageElement>(resolve => {
            const img = new Image();
            img.src = `${MIME_BASE64_PNG},${src}`;
            img.onload = () => resolve(img);
          })
      )
    );

    const nouveauxEtats = imgs.map(img => {
      const ratio = img.height / img.width;
      const largeurCanvas = window.innerWidth * POURCENTAGE_LARGEUR_CANVAS;

      const largeur = largeurCanvas;
      const hauteur = largeurCanvas * ratio;

      return new EtatImage(largeur, hauteur, img);
    });

    setPages(nouveauxEtats);

    const tailles = imgs.map(img => {
      const ratio = img.height / img.width;
      const largeurCanvas = window.innerWidth * POURCENTAGE_LARGEUR_CANVAS;

      return { largeur: largeurCanvas, hauteur: largeurCanvas * ratio };
    });

    setTailles(tailles);
  };

  useEffect(() => {
    if (images.length > 0) {
      creerPages();

      window.addEventListener("resize", creerPages);

      return () => window.removeEventListener("resize", creerPages);
    }
  }, [images]);

  return pages.length > 0 ? (
    <div
      id="retouche-image"
      className="relative m-auto flex h-full w-full flex-col"
    >
      {pages.length > 1 && (
        <GestionnairePages
          pageCourante={pageCourante}
          nombreDePages={pages.length}
          setPageCourante={setPageCourante}
        />
      )}
      <Canvas
        etatImage={pages[pageCourante]}
        tailleCanvas={tailles[pageCourante]}
        pageCourante={pageCourante}
      />
    </div>
  ) : (
    <p className="text-center">Aucune image à afficher</p>
  );
};

export default RetoucheImage;
