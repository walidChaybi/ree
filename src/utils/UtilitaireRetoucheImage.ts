import { TCanvasRef, TCoordonnees } from "../composants/commun/retoucheImage/Canvas";
import { TOutilRetoucheImage } from "../composants/commun/retoucheImage/barreOutils/BarreOutils";
import { ILigne } from "../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import EtatImage from "../model/retoucheImage/EtatImage";

const TOLERANCE = 5;
const ZOOM_PAR_DEFAUT = 1; // X et Y
const INCLINAISON_PAR_DEFAUT = 0; // X et Y
const OFFSET_PAR_DEFAUT = 0; // X et Y
const X_INITIAL = 0;
const Y_INITIAL = 0;

export type TExtremite = "debut" | "fin";

export interface ILigneAvecExtremite extends ILigne {
  extremite: TExtremite;
}

const UtilitaireRetoucheImage = {
  reinitialiserEtatCanvas: (ctx: CanvasRenderingContext2D): void => {
    ctx.setTransform(
      ZOOM_PAR_DEFAUT,
      INCLINAISON_PAR_DEFAUT,
      INCLINAISON_PAR_DEFAUT,
      ZOOM_PAR_DEFAUT,
      OFFSET_PAR_DEFAUT,
      OFFSET_PAR_DEFAUT
    );
  },

  effacerCanvas: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
    ctx.clearRect(X_INITIAL, Y_INITIAL, canvas.width, canvas.height);
  },

  // Cette fonction permet d'afficher l'image dans le canvas
  redessiner: ({
    refCanvas,
    zoom,
    offset,
    etatImage,
    outilSelectionne,
    debutLigneTemporaire,
    pointsSelectionPolygonale,
    positionSouris
  }: {
    refCanvas: TCanvasRef;
    zoom: number;
    offset: TCoordonnees;
    etatImage: EtatImage;
    outilSelectionne: TOutilRetoucheImage;
    debutLigneTemporaire: TCoordonnees | null;
    pointsSelectionPolygonale: TCoordonnees[];
    positionSouris: TCoordonnees | null;
  }): void => {
    const canvas = refCanvas.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    UtilitaireRetoucheImage.reinitialiserEtatCanvas(ctx);
    UtilitaireRetoucheImage.effacerCanvas(ctx, canvas);

    ctx.imageSmoothingEnabled = true;

    ctx.setTransform(zoom, INCLINAISON_PAR_DEFAUT, INCLINAISON_PAR_DEFAUT, zoom, offset.x, offset.y);

    ctx.drawImage(etatImage.recupererBuffer, OFFSET_PAR_DEFAUT, OFFSET_PAR_DEFAUT, canvas.width, canvas.height);

    UtilitaireRetoucheImage.dessinerLigneTemporaire({
      ctx,
      zoom,
      epaisseurLignes: etatImage.epaisseurLignes,
      outilSelectionne,
      debutLigneTemporaire,
      pointsSelectionPolygonale,
      positionSouris
    });
  },

  // La ligne potentiellement dessinée avec cette fonction est temporaire et donc uniquement sur l'affichage
  dessinerLigneTemporaire: ({
    ctx,
    zoom,
    epaisseurLignes,
    outilSelectionne,
    debutLigneTemporaire,
    pointsSelectionPolygonale,
    positionSouris
  }: {
    ctx: CanvasRenderingContext2D;
    zoom: number;
    epaisseurLignes: number;
    outilSelectionne: TOutilRetoucheImage;
    debutLigneTemporaire: TCoordonnees | null;
    pointsSelectionPolygonale: TCoordonnees[];
    positionSouris: TCoordonnees | null;
  }): void => {
    if (
      ["tracerLigne", "selectionPolygonale"].includes(outilSelectionne) &&
      (debutLigneTemporaire || pointsSelectionPolygonale.length > 0) &&
      positionSouris
    ) {
      const pointDepart = debutLigneTemporaire || pointsSelectionPolygonale[pointsSelectionPolygonale.length - 1];

      ctx.beginPath();
      ctx.moveTo(pointDepart.x, pointDepart.y);
      ctx.lineTo(positionSouris.x, positionSouris.y);
      ctx.lineWidth = epaisseurLignes / zoom;
      ctx.setLineDash([5 / zoom, 3 / zoom]);
      ctx.strokeStyle = debutLigneTemporaire ? "gray" : "red";
      ctx.stroke();
      ctx.setLineDash([]);
    }
  },

  pointProcheDuPointDeDepart: ({
    position,
    positionPointDeDepart
  }: {
    position: TCoordonnees;
    positionPointDeDepart: TCoordonnees;
  }): boolean => {
    const dx = position.x - positionPointDeDepart.x;
    const dy = position.y - positionPointDeDepart.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= TOLERANCE;
  },

  pointEstDansLeRectangle: ({
    point,
    debutSelectionRectangulaire,
    finSelectionRectangulaire
  }: {
    point: TCoordonnees;
    debutSelectionRectangulaire: TCoordonnees;
    finSelectionRectangulaire: TCoordonnees;
  }): boolean => {
    const minX = Math.min(debutSelectionRectangulaire.x, finSelectionRectangulaire.x);
    const maxX = Math.max(debutSelectionRectangulaire.x, finSelectionRectangulaire.x);
    const minY = Math.min(debutSelectionRectangulaire.y, finSelectionRectangulaire.y);
    const maxY = Math.max(debutSelectionRectangulaire.y, finSelectionRectangulaire.y);

    return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
  },

  orientationLigne: (p: TCoordonnees, q: TCoordonnees, r: TCoordonnees): 0 | 1 | 2 => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val === 0) return 0; // colinéaire (= 3 points alignés)

    return val > 0 ? 1 : 2; // 1 = horaire (= angle dans le sens horaire d'une montre), 2 = anti-horaire (= angle dans le sens anti-horaire d'une montre)
  },

  lignesSeCroisent: (debutLigneA: TCoordonnees, finLigneA: TCoordonnees, debutLigneB: TCoordonnees, finLigneB: TCoordonnees): boolean => {
    const o1 = UtilitaireRetoucheImage.orientationLigne(debutLigneA, finLigneA, debutLigneB);
    const o2 = UtilitaireRetoucheImage.orientationLigne(debutLigneA, finLigneA, finLigneB);
    const o3 = UtilitaireRetoucheImage.orientationLigne(debutLigneB, finLigneB, debutLigneA);
    const o4 = UtilitaireRetoucheImage.orientationLigne(debutLigneB, finLigneB, finLigneA);

    if (o1 !== o2 && o3 !== o4) return true;

    return false;
  },

  peutAjouterPoint: (pointsSelectionPolygonale: TCoordonnees[], nouveauPoint: TCoordonnees): boolean => {
    if (pointsSelectionPolygonale.length < 3) return true;

    const dernierPoint = pointsSelectionPolygonale[pointsSelectionPolygonale.length - 1];

    const debutNouvelleLigne = dernierPoint;
    const finNouvelleLigne = nouveauPoint;

    // Vérifier intersection avec TOUS les segments existants
    for (let i = 0; i < pointsSelectionPolygonale.length - 2; i++) {
      const debutLigne = pointsSelectionPolygonale[i];
      const finLigne = pointsSelectionPolygonale[i + 1];

      if (UtilitaireRetoucheImage.lignesSeCroisent(debutNouvelleLigne, finNouvelleLigne, debutLigne, finLigne)) {
        return false; // croisement détecté
      }
    }

    return true;
  },

  estSelectionPolygonaleComplete: (pointsSelectionPolygonale: TCoordonnees[]): boolean => {
    return (
      pointsSelectionPolygonale.length >= 3 &&
      UtilitaireRetoucheImage.pointProcheDuPointDeDepart({
        position: pointsSelectionPolygonale[pointsSelectionPolygonale.length - 1],
        positionPointDeDepart: pointsSelectionPolygonale[0]
      })
    );
  },

  // Algorithme Ray casting
  estPointDansLePolygone: (point: TCoordonnees, pointsSelectionPolygonale: TCoordonnees[]): boolean => {
    let dedans = false;

    const { x: xPointATester, y: yPointATester } = point;

    for (
      let pointCourant = 0, pointPrecedent = pointsSelectionPolygonale.length - 1;
      pointCourant < pointsSelectionPolygonale.length;
      pointPrecedent = pointCourant++
    ) {
      const xPointCourant = pointsSelectionPolygonale[pointCourant].x;
      const yPointCourant = pointsSelectionPolygonale[pointCourant].y;

      const xPointPrecedent = pointsSelectionPolygonale[pointPrecedent].x;
      const yPointPrecedent = pointsSelectionPolygonale[pointPrecedent].y;

      const auDessusPointCourant = yPointCourant > yPointATester;
      const auDessusPointPrecedent = yPointPrecedent > yPointATester;
      const segmentCroiseLigneY = auDessusPointCourant !== auDessusPointPrecedent;

      const xIntersection =
        ((xPointPrecedent - xPointCourant) * (yPointATester - yPointCourant)) / (yPointPrecedent - yPointCourant) + xPointCourant;

      const intersectionADroite = xPointATester < xIntersection;

      const croisement = segmentCroiseLigneY && intersectionADroite;

      if (croisement) {
        dedans = !dedans;
      }
    }

    return dedans;
  },

  estClicSurLigne: ({
    positionClic,
    positionDebutLigne,
    positionFinLigne
  }: {
    positionClic: TCoordonnees;
    positionDebutLigne: TCoordonnees;
    positionFinLigne: TCoordonnees;
  }): boolean => {
    const vecteurX = positionFinLigne.x - positionDebutLigne.x;
    const vecteurY = positionFinLigne.y - positionDebutLigne.y;

    const longueurCarree = vecteurX * vecteurX + vecteurY * vecteurY;

    // si la ligne est très courte (relativement égale à un point)
    if (longueurCarree === 0) {
      const distancePoint = Math.hypot(positionClic.x - positionDebutLigne.x, positionClic.y - positionDebutLigne.y);

      return distancePoint <= TOLERANCE;
    }

    let clic = ((positionClic.x - positionDebutLigne.x) * vecteurX + (positionClic.y - positionDebutLigne.y) * vecteurY) / longueurCarree;

    clic = Math.max(0, Math.min(1, clic));

    const pointProjeteX = positionDebutLigne.x + clic * vecteurX;
    const pointProjeteY = positionDebutLigne.y + clic * vecteurY;

    // distance entre clic et projection
    const dist = Math.hypot(pointProjeteX - positionClic.x, pointProjeteY - positionClic.y);

    return dist <= TOLERANCE;
  },

  detecterClicSurLigne: (positionClic: TCoordonnees, lignes: ILigne[]): ILigne | null => {
    for (const ligne of lignes) {
      if (
        UtilitaireRetoucheImage.estClicSurLigne({
          positionClic,
          positionDebutLigne: ligne.debutLigne,
          positionFinLigne: ligne.finLigne
        })
      ) {
        return ligne;
      }
    }

    return null;
  },

  clicSurExtremite: (positionClic: TCoordonnees, ligne: ILigne): TExtremite | null => {
    const ecartAvecDebutLigneX = positionClic.x - ligne.debutLigne.x;
    const ecartAvecDebutLigneY = positionClic.y - ligne.debutLigne.y;

    const ecartAvecFinLigneX = positionClic.x - ligne.finLigne.x;
    const ecartAvecFinLigneY = positionClic.y - ligne.finLigne.y;

    const distanceAuPointDebutLigne = Math.hypot(ecartAvecDebutLigneX, ecartAvecDebutLigneY);
    const distanceAuPointFinLigne = Math.hypot(ecartAvecFinLigneX, ecartAvecFinLigneY);

    if (distanceAuPointDebutLigne <= TOLERANCE) {
      return "debut";
    }

    if (distanceAuPointFinLigne <= TOLERANCE) {
      return "fin";
    }

    return null;
  },

  detecterClicSurExtremite: (positionClic: TCoordonnees, lignes: ILigne[]): ILigneAvecExtremite | null => {
    for (const ligne of lignes) {
      const extremite = UtilitaireRetoucheImage.clicSurExtremite(positionClic, ligne);

      if (extremite) {
        return { ...ligne, extremite };
      }
    }

    return null;
  },

  recupererCoordonneesClic: (e: MouseEvent, canvas: HTMLCanvasElement, zoom: number, offset: TCoordonnees): TCoordonnees => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left - offset.x) / zoom,
      y: (e.clientY - rect.top - offset.y) / zoom
    };
  }
} as const;

export default UtilitaireRetoucheImage;
