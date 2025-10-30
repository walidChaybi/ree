import EtatImage from "@model/retoucheImage/EtatImage";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TCanvasRef } from "../../composants/commun/retoucheImage/Canvas";
import { ILigne } from "../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import UtilitaireRetoucheImage from "../../utils/UtilitaireRetoucheImage";

const mockImage = {
  width: 400,
  height: 800
} as HTMLImageElement;

let mockCtx: Partial<CanvasRenderingContext2D>;

describe("Test de l'objet utilitaire UtilitaireRetoucheImage", () => {
  beforeEach(() => {
    mockCtx = {
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      setLineDash: vi.fn(),
      stroke: vi.fn()
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: vi.fn(() => mockCtx),
      configurable: true
    });

    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
      value: vi.fn(() => "data:image/png;base64,MOCK_IMAGE"),
      configurable: true
    });

    global.Image = class {
      src = "";
    } as unknown as typeof Image;
  });

  test("Lorsque la fonction 'reinitialiserEtatCanvas' est appelée, le contexte est transformé à ses propriétés par défaut", () => {
    UtilitaireRetoucheImage.reinitialiserEtatCanvas(mockCtx as CanvasRenderingContext2D);

    expect(mockCtx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
  });

  test("Lorsque la fonction 'effacerCanvas' est appelée, le canvas est effacé selon les paramètres donnés", () => {
    const mockCanvas = document.createElement("canvas");

    mockCanvas.width = 500;
    mockCanvas.height = 300;

    UtilitaireRetoucheImage.effacerCanvas(mockCtx as CanvasRenderingContext2D, mockCanvas);

    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 500, 300);
  });

  test("Lorsque la fonction 'redessiner' est appelée, le canvas est redessiné avec les paramètres donnés", () => {
    const mockCanvas = document.createElement("canvas");
    const refCanvas: TCanvasRef = { current: mockCanvas };

    mockCanvas.width = 500;
    mockCanvas.height = 300;

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    UtilitaireRetoucheImage.redessiner({
      refCanvas,
      zoom: 2,
      offset: { x: 34, y: 28 },
      etatImage: etatImage,
      outilSelectionne: "deplacement",
      debutLigneTemporaire: null,
      pointsSelectionPolygonale: [],
      positionSouris: null
    });

    expect(mockCtx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 500, 300);
    expect(mockCtx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 34, 28);
    expect(mockCtx.drawImage).toHaveBeenCalledWith(etatImage.recupererBuffer, 0, 0);
  });

  test("Lorsque la fonction 'redessiner' est appelée mais que le canvas est null, rien n'est fait", () => {
    const refCanvas: TCanvasRef = { current: null };

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    UtilitaireRetoucheImage.redessiner({
      refCanvas,
      zoom: 1,
      offset: { x: 10, y: 20 },
      etatImage: etatImage,
      outilSelectionne: "deplacement",
      debutLigneTemporaire: null,
      pointsSelectionPolygonale: [],
      positionSouris: null
    });

    expect(mockCtx.clearRect).not.toHaveBeenCalled();
    expect(mockCtx.setTransform).not.toHaveBeenCalled();
  });

  test("Lorsque la fonction 'dessinerLigneTemporaire' est appelée avec les paramètres correspondant au traçage d'une ligne temporaire, celle-ci est dessinée", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    UtilitaireRetoucheImage.dessinerLigneTemporaire({
      ctx: mockCtx as CanvasRenderingContext2D,
      zoom: 1,
      epaisseurLignes: etatImage.epaisseurLignes,
      outilSelectionne: "tracerLigne",
      debutLigneTemporaire: { x: 11, y: 19 },
      pointsSelectionPolygonale: [],
      positionSouris: { x: 54, y: 129 }
    });

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalledWith(11, 19);
    expect(mockCtx.lineTo).toHaveBeenCalledWith(54, 129);
    expect(mockCtx.lineWidth).toEqual(etatImage.epaisseurLignes);
    expect(mockCtx.setLineDash).toHaveBeenCalledWith([5, 3]);
    expect(mockCtx.strokeStyle).toBe("gray");
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  test("Lorsque la fonction 'dessinerLigneTemporaire' est appelée mais que l'outil sélectionné n'est pas bon, rien n'est fait", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    UtilitaireRetoucheImage.dessinerLigneTemporaire({
      ctx: mockCtx as CanvasRenderingContext2D,
      zoom: 1,
      epaisseurLignes: etatImage.epaisseurLignes,
      outilSelectionne: "deplacement",
      debutLigneTemporaire: { x: 11, y: 19 },
      pointsSelectionPolygonale: [],
      positionSouris: { x: 54, y: 129 }
    });

    expect(mockCtx.beginPath).not.toHaveBeenCalled();
    expect(mockCtx.moveTo).not.toHaveBeenCalled();
    expect(mockCtx.lineTo).not.toHaveBeenCalled();
    expect(mockCtx.setLineDash).not.toHaveBeenCalled();
    expect(mockCtx.stroke).not.toHaveBeenCalled();
  });

  test("Lorsque la fonction 'pointProcheDuPointDeDepart' est appelée avec une position proche du départ, le résultat retourné est TRUE", () => {
    const position = { x: 11, y: 16 };
    const positionPointDeDepart = { x: 13, y: 14 };

    expect(UtilitaireRetoucheImage.pointProcheDuPointDeDepart({ position, positionPointDeDepart })).toBe(true);
  });

  test("Lorsque la fonction 'pointProcheDuPointDeDepart' est appelée avec une position loin du départ, le résultat retourné est FALSE", () => {
    const position = { x: 23, y: 41 };
    const positionPointDeDepart = { x: 13, y: 14 };

    expect(UtilitaireRetoucheImage.pointProcheDuPointDeDepart({ position, positionPointDeDepart })).toBe(false);
  });

  test("Lorsque la fonction 'pointEstDansLeRectangle' est appelée avec un point positionné dans le rectangle, le résultat retourné est TRUE", () => {
    const point = { x: 23, y: 41 };
    const debutSelectionRectangulaire = { x: 13, y: 14 };
    const finSelectionRectangulaire = { x: 39, y: 54 };

    expect(UtilitaireRetoucheImage.pointEstDansLeRectangle({ point, debutSelectionRectangulaire, finSelectionRectangulaire })).toBe(true);
  });

  test("Lorsque la fonction 'pointEstDansLeRectangle' est appelée avec un point positionné hors du rectangle, le résultat retourné est FALSE", () => {
    const point = { x: 23, y: 59 };
    const debutSelectionRectangulaire = { x: 13, y: 14 };
    const finSelectionRectangulaire = { x: 39, y: 54 };

    expect(UtilitaireRetoucheImage.pointEstDansLeRectangle({ point, debutSelectionRectangulaire, finSelectionRectangulaire })).toBe(false);
  });

  test("Lorsque la fonction 'orientationLigne' est appelée avec 3 points alignés, le résultat est 0 (= colinéaire)", () => {
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 4, y: 4 };
    const point3 = { x: 8, y: 8 };

    expect(UtilitaireRetoucheImage.orientationLigne(point1, point2, point3)).toBe(0);
  });

  test("Lorsque la fonction 'orientationLigne' est appelée avec 3 points formant un angle horaire, le résultat est 1 (= horaire)", () => {
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 1, y: 2 };
    const point3 = { x: 5, y: 4 };

    expect(UtilitaireRetoucheImage.orientationLigne(point1, point2, point3)).toBe(1);
  });

  test("Lorsque la fonction 'orientationLigne' est appelée avec 3 points formant un angle anti-horaire, le résultat est 2 (= anti-horaire)", () => {
    const point1 = { x: 0, y: 0 };
    const point2 = { x: 5, y: 5 };
    const point3 = { x: 3, y: 9 };

    expect(UtilitaireRetoucheImage.orientationLigne(point1, point2, point3)).toBe(2);
  });

  test("Lorsque la fonction 'lignesSeCroisent' est appelée avec des points générant un croisement, le résultat retourné est TRUE", () => {
    const debutLigneA = { x: 0, y: 0 };
    const finLigneA = { x: 4, y: 4 };
    const debutLigneB = { x: 0, y: 4 };
    const finLigneB = { x: 4, y: 0 };

    expect(UtilitaireRetoucheImage.lignesSeCroisent(debutLigneA, finLigneA, debutLigneB, finLigneB)).toBe(true);
  });

  test("Lorsque la fonction 'lignesSeCroisent' est appelée avec des points ne générant pas de croisement, le résultat retourné est FALSE", () => {
    const debutLigneA = { x: 0, y: 0 };
    const finLigneA = { x: 2, y: 2 };
    const debutLigneB = { x: 3, y: 3 };
    const finLigneB = { x: 5, y: 5 };

    expect(UtilitaireRetoucheImage.lignesSeCroisent(debutLigneA, finLigneA, debutLigneB, finLigneB)).toBe(false);
  });

  test("Lorsque la fonction 'peutAjouterPoint' est appelée avec un nouveau point ne formant aucun croisement de lignes, le résultat retourné est TRUE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 },
      { x: 12, y: 20 }
    ];

    const nouveauPoint = { x: 8, y: 17 };

    expect(UtilitaireRetoucheImage.peutAjouterPoint(pointsSelectionPolygonale, nouveauPoint)).toBe(true);
  });

  test("Lorsque la fonction 'peutAjouterPoint' est appelée avec un nouveau point formant un croisement entre deux lignes, le résultat retourné est FALSE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 },
      { x: 12, y: 20 }
    ];

    const nouveauPoint = { x: 11, y: 7 };

    expect(UtilitaireRetoucheImage.peutAjouterPoint(pointsSelectionPolygonale, nouveauPoint)).toBe(false);
  });

  test("Lorsque la fonction 'peutAjouterPoint' est appelée mais que moins de 3 points existent, le résultat retourné est TRUE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 }
    ];

    const nouveauPoint = { x: 11, y: 7 };

    expect(UtilitaireRetoucheImage.peutAjouterPoint(pointsSelectionPolygonale, nouveauPoint)).toBe(true);
  });

  test("Lorsque la fonction 'estSelectionPolygonaleComplete' est appelée et qu'une sélection polygonale existe, le résultat retourné est TRUE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 },
      { x: 12, y: 20 },
      { x: 10, y: 10 }
    ];

    expect(UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)).toBe(true);
  });

  test("Lorsque la fonction 'estSelectionPolygonaleComplete' est appelée mais que moins de 3 points sont présents, le résultat retourné est FALSE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 }
    ];

    expect(UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)).toBe(false);
  });

  test("Lorsque la fonction 'estSelectionPolygonaleComplete' est appelée mais que le dernier point n'est pas proche du premier, le résultat retourné est FALSE", () => {
    const pointsSelectionPolygonale = [
      { x: 10, y: 10 },
      { x: 15, y: 10 },
      { x: 12, y: 20 }
    ];

    expect(UtilitaireRetoucheImage.estSelectionPolygonaleComplete(pointsSelectionPolygonale)).toBe(false);
  });

  test("Lorsque la fonction 'estPointDansLePolygone' est appelée avec un point dans le polygone, le résultat retourné est TRUE", () => {
    const pointsSelectionPolygonale = [
      { x: 3, y: 1 },
      { x: 6, y: 0 },
      { x: 9, y: 2 },
      { x: 10, y: 5 },
      { x: 9, y: 8 },
      { x: 6, y: 10 },
      { x: 3, y: 9 },
      { x: 1, y: 6 },
      { x: 1, y: 3 },
      { x: 3, y: 1 }
    ];

    const point = { x: 8, y: 4 };

    expect(UtilitaireRetoucheImage.estPointDansLePolygone(point, pointsSelectionPolygonale)).toBe(true);
  });

  test("Lorsque la fonction 'estPointDansLePolygone' est appelée avec un point hors du polygone, le résultat retourné est FALSE", () => {
    const pointsSelectionPolygonale = [
      { x: 3, y: 1 },
      { x: 6, y: 0 },
      { x: 9, y: 2 },
      { x: 10, y: 5 },
      { x: 9, y: 8 },
      { x: 6, y: 10 },
      { x: 3, y: 9 },
      { x: 1, y: 6 },
      { x: 1, y: 3 },
      { x: 3, y: 1 }
    ];

    const point = { x: 8, y: 13 };

    expect(UtilitaireRetoucheImage.estPointDansLePolygone(point, pointsSelectionPolygonale)).toBe(false);
  });

  test("Lorsque la fonction 'estClicSurLigne' est appelée avec un clic positionné sur la ligne, le résultat retourné est TRUE", () => {
    const positionDebutLigne = { x: 5, y: 5 };
    const positionFinLigne = { x: 27, y: 31 };
    const positionClic = { x: 14, y: 15 };

    expect(UtilitaireRetoucheImage.estClicSurLigne({ positionClic, positionDebutLigne, positionFinLigne })).toBe(true);
  });

  test("Lorsque la fonction 'estClicSurLigne' est appelée avec un clic positionné hors de la ligne, le résultat retourné est FALSE", () => {
    const positionDebutLigne = { x: 5, y: 5 };
    const positionFinLigne = { x: 27, y: 31 };
    const positionClic = { x: 13, y: 24 };

    expect(UtilitaireRetoucheImage.estClicSurLigne({ positionClic, positionDebutLigne, positionFinLigne })).toBe(false);
  });

  test("Lorsque la fonction 'detecterClicSurLigne' est appelée avec un clic positionné sur l'une des lignes, le résultat retourné est la ligne correspondante", () => {
    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 1, y: 1 }, finLigne: { x: 10, y: 10 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 3, y: 3 }, finLigne: { x: 3, y: 7 }, enDeplacement: false, selectionnee: false },
      { id: "3", debutLigne: { x: 22, y: 25 }, finLigne: { x: 37, y: 41 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 7, y: 7 };

    expect(UtilitaireRetoucheImage.detecterClicSurLigne(positionClic, lignes)).toBe(lignes[0]);
  });

  test("Lorsque la fonction 'detecterClicSurLigne' est appelée avec un clic positionné sur aucune des lignes, le résultat retourné est NULL", () => {
    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 1, y: 1 }, finLigne: { x: 10, y: 10 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 3, y: 3 }, finLigne: { x: 3, y: 7 }, enDeplacement: false, selectionnee: false },
      { id: "3", debutLigne: { x: 22, y: 25 }, finLigne: { x: 37, y: 41 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 11, y: 17 };

    expect(UtilitaireRetoucheImage.detecterClicSurLigne(positionClic, lignes)).toBe(null);
  });

  test("Lorsque la fonction 'clicSurExtremite' est appelée, si le clic est proche de l'extrémité de début de la ligne, alors le résultat retourné est 'debut'", () => {
    const ligne: ILigne = { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false };
    const positionClic = { x: 4, y: 10 };

    expect(UtilitaireRetoucheImage.clicSurExtremite(positionClic, ligne)).toBe("debut");
  });

  test("Lorsque la fonction 'clicSurExtremite' est appelée, si le clic est proche de l'extrémité de fin de la ligne, alors le résultat retourné est 'fin'", () => {
    const ligne: ILigne = { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false };
    const positionClic = { x: 15, y: 28 };

    expect(UtilitaireRetoucheImage.clicSurExtremite(positionClic, ligne)).toBe("fin");
  });

  test("Lorsque la fonction 'clicSurExtremite' est appelée, si le clic n'est pas proche d'une extrémité de la ligne, alors le résultat retourné est NULL", () => {
    const ligne: ILigne = { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false };
    const positionClic = { x: 8, y: 28 };

    expect(UtilitaireRetoucheImage.clicSurExtremite(positionClic, ligne)).toBe(null);
  });

  test("Lorsque la fonction 'detecterClicSurExtremite' est appelée, si le clic est proche de l'extrémité de début d'une ligne, alors le résultat retourné est la ligne et 'debut'", () => {
    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 7, y: 12 }, finLigne: { x: 9, y: 12 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 4, y: 10 };

    expect(UtilitaireRetoucheImage.detecterClicSurExtremite(positionClic, lignes)).toStrictEqual({ ...lignes[0], extremite: "debut" });
  });

  test("Lorsque la fonction 'detecterClicSurExtremite' est appelée, si le clic est proche de l'extrémité de fin d'une ligne, alors le résultat retourné est la ligne et 'fin'", () => {
    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 7, y: 12 }, finLigne: { x: 9, y: 12 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 15, y: 28 };

    expect(UtilitaireRetoucheImage.detecterClicSurExtremite(positionClic, lignes)).toStrictEqual({ ...lignes[0], extremite: "fin" });
  });

  test("Lorsque la fonction 'detecterClicSurExtremite' est appelée, si le clic n'est pas proche d'une extrémité d'une ligne, alors le résultat retourné est NULL", () => {
    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 7, y: 12 }, finLigne: { x: 9, y: 12 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 8, y: 28 };

    expect(UtilitaireRetoucheImage.detecterClicSurExtremite(positionClic, lignes)).toBe(null);
  });

  test("Lorsque la fonction 'recupererCoordonneesClic' est appelée, je récupère les coordonnées correspondant à mon clic", () => {
    const mockCanvas = document.createElement("canvas");

    mockCanvas.width = 500;
    mockCanvas.height = 300;

    const mockEvenementClic = { clientX: 50, clientY: 60 } as MouseEvent;

    expect(UtilitaireRetoucheImage.recupererCoordonneesClic(mockEvenementClic, mockCanvas, 1, { x: 0, y: 0 }));

    const lignes: ILigne[] = [
      { id: "1", debutLigne: { x: 5, y: 10 }, finLigne: { x: 15, y: 30 }, enDeplacement: false, selectionnee: false },
      { id: "2", debutLigne: { x: 7, y: 12 }, finLigne: { x: 9, y: 12 }, enDeplacement: false, selectionnee: false }
    ];

    const positionClic = { x: 8, y: 28 };

    expect(UtilitaireRetoucheImage.detecterClicSurExtremite(positionClic, lignes)).toBe(null);
  });
});
