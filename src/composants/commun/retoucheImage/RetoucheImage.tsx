import { CONFIG_GET_IMAGES_ACTE_FORMAT_TIFF } from "@api/configurations/etatCivil/acte/GetImagesActeFormatTiffConfigApi";
import { useEffect, useState } from "react";
import * as UTIF from "utif";
import useFetchApi from "../../../hooks/api/FetchApiHook";
import EtatImage from "../../../model/retoucheImage/EtatImage";
import { EMimeType } from "../../../ressources/EMimeType";
import AfficherMessage from "../../../utils/AfficherMessage";
import Canvas from "./Canvas";
import GestionnairePages from "./GestionnairePages";

export interface ITaille {
  largeur: number;
  hauteur: number;
}

const POURCENTAGE_LARGEUR_CANVAS = 0.45;
const MIME_BASE64_PNG = "data:image/png;base64";
const SIGNATURE_OCTETS_PNG = [0x89, 0x50, 0x4e, 0x47];

interface IRetoucheImageProps {
  idActe: string;
}

const convertirImagesTiffAuFormatPng = (images: string[]): string[] => {
  try {
    return images.map(base64 => {
      const donneesBase64 = base64.replace(/^data:image\/(png|tif|tiff);base64,/, "");

      const binaire = atob(donneesBase64);
      const octets = new Uint8Array(binaire.length);

      for (let i = 0; i < binaire.length; i++) {
        octets[i] = binaire.charCodeAt(i);
      }

      const estPng = octets.length >= SIGNATURE_OCTETS_PNG.length && SIGNATURE_OCTETS_PNG.every((octet, i) => octet === octets[i]);

      if (estPng) {
        return `${MIME_BASE64_PNG},${donneesBase64}`;
      }

      // Décodage du TIFF
      const ifds = UTIF.decode(octets.buffer);

      UTIF.decodeImage(octets.buffer, ifds[0]);

      const rgba = UTIF.toRGBA8(ifds[0]);

      // Dessin sur un canvas fictif
      const { width, height } = ifds[0];

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Impossible de convertir l'image");
      }

      const donneesImage = new ImageData(new Uint8ClampedArray(rgba), width, height);

      ctx.putImageData(donneesImage, 0, 0);

      // Export en base64 PNG complet
      return canvas.toDataURL(EMimeType.IMAGE_PNG);
    });
  } catch (erreur: unknown) {
    if (erreur instanceof Error) {
      AfficherMessage.erreur(erreur.message);
    }

    return [];
  }
};

const RetoucheImage: React.FC<IRetoucheImageProps> = ({ idActe }) => {
  const [pages, setPages] = useState<EtatImage[]>([]);
  const [imagesTiff, setImagesTiff] = useState<string[]>([]);
  const [pageCourante, setPageCourante] = useState<number>(0);
  const [tailles, setTailles] = useState<ITaille[]>([]);

  const { appelApi: getImagesActeFormatTiff } = useFetchApi(CONFIG_GET_IMAGES_ACTE_FORMAT_TIFF);

  const creerPages = async () => {
    const imagesPng = convertirImagesTiffAuFormatPng(imagesTiff);

    if (imagesPng.length === 0) return;

    const imgs = await Promise.all(
      imagesPng.map(
        src =>
          new Promise<HTMLImageElement>(resolve => {
            const img = new Image();
            img.src = src;
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
    if (imagesTiff.length > 0) {
      creerPages();

      window.addEventListener("resize", creerPages);

      return () => window.removeEventListener("resize", creerPages);
    }
  }, [imagesTiff]);

  useEffect(() => {
    getImagesActeFormatTiff({
      parametres: { path: { idActe } },
      apresSucces: images => setImagesTiff(images.map(image => image.contenu)),
      apresErreur: erreurs => AfficherMessage.erreur("Impossible de récupérer les images associées à l'acte", { erreurs })
    });
  }, [idActe]);

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
