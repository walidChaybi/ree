import EtatImage from "@model/retoucheImage/EtatImage";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TCoordonnees } from "../../../composants/commun/retoucheImage/Canvas";
import { ILigne } from "../../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";

const LARGEUR_IMAGE_MOCK = 200;
const HAUTEUR_IMAGE_MOCK = 400;

const mockImage = {
  width: LARGEUR_IMAGE_MOCK,
  height: HAUTEUR_IMAGE_MOCK
} as HTMLImageElement;

let mockCtx: Partial<CanvasRenderingContext2D>;

describe("Test du model EtatImage", () => {
  beforeEach(() => {
    mockCtx = {
      drawImage: vi.fn(),
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      stroke: vi.fn(),
      clip: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      beginPath: vi.fn(),
      lineTo: vi.fn(),
      moveTo: vi.fn(),
      closePath: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 1
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

  test("Lorsque je créé un objet de la classe EtatImage avec des paramètres, je les retrouve bien dans mon celui-ci", async () => {
    const spyDessinerImage = vi.spyOn(mockCtx, "drawImage");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage).toBeDefined();
    expect(spyDessinerImage).toHaveBeenCalledWith(mockImage, 0, 0, LARGEUR_IMAGE_MOCK, HAUTEUR_IMAGE_MOCK);
  });

  test("Lorsque la méthode 'effacer' est appelée, le contenu est effacé sur le canvas selon les paramètres donnés", () => {
    const spyEffacer = vi.spyOn(mockCtx, "clearRect");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const x = 50;
    const y = 80;
    const taille = 20;

    etatImage.effacer(x, y, taille);

    expect(spyEffacer).toHaveBeenCalledWith(x - taille / 2, y - taille / 2, taille, taille);
  });

  test("Lorsque la méthode 'effacerDansRectangle' est appelée, le contenu est effacé sur le canvas selon les paramètres donnés", () => {
    const spyEffacer = vi.spyOn(mockCtx, "clearRect");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const x = 50;
    const y = 80;
    const largeur = 20;
    const hauteur = 30;

    etatImage.effacerDansRectangle(x, y, largeur, hauteur);

    expect(spyEffacer).toHaveBeenCalledWith(x, y, largeur, hauteur);
  });

  test("Lorsque la méthode 'effacerDansPolygone' est appelée, le contenu est effacé sur le canvas selon les paramètres donnés", () => {
    const spyEffacer = vi.spyOn(mockCtx, "clearRect");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const x = 20;
    const y = 20;
    const taille = 20;

    const polygone = [
      { x: 2, y: 2 },
      { x: 2, y: 30 },
      { x: 30, y: 30 },
      { x: 30, y: 2 }
    ];

    etatImage.effacerDansPolygone(x, y, taille, polygone);

    expect(spyEffacer).toHaveBeenCalledWith(x - taille / 2, y - taille / 2, taille, taille);
  });

  test("Lorsque la méthode 'dessinerLigne' est appelée, une ligne est dessinée sur le canvas selon les paramètres donnés", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const pointDepart = { x: 5, y: 5 };
    const pointFin = { x: 17, y: 19 };

    etatImage.dessinerLigne(pointDepart.x, pointDepart.y, pointFin.x, pointFin.y);

    expect(etatImage.lignes).toHaveLength(1);
    expect(etatImage.lignes[0]).toStrictEqual({
      id: etatImage.lignes[0].id,
      debutLigne: pointDepart,
      finLigne: pointFin,
      enDeplacement: false,
      selectionnee: false
    });
  });

  test("Lorsque la méthode 'dessinerLigne' est appelée, la nouvelle ligne est enregistrée dans le tableau dédié", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyEnregistrerNouvelleLigne = vi.spyOn(etatImage as any, "enregistrerNouvelleLigne");

    const pointDepart = { x: 5, y: 5 };
    const pointFin = { x: 17, y: 19 };

    expect(etatImage.lignes).toHaveLength(0);

    etatImage.dessinerLigne(pointDepart.x, pointDepart.y, pointFin.x, pointFin.y);

    expect(spyEnregistrerNouvelleLigne).toHaveBeenCalledWith(pointDepart.x, pointDepart.y, pointFin.x, pointFin.y);
    expect(etatImage.lignes).toHaveLength(1);
  });

  test("Lorsque la méthode 'appliquerRotation' est appelée, la rotation passée en paramètre est appliquée au canvas", () => {
    const spyRotation = vi.spyOn(mockCtx, "rotate");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const degres = 45;

    etatImage.appliquerRotation(degres);

    expect(spyRotation).toHaveBeenCalledWith((degres * Math.PI) / 180);
  });

  test("Lorsque la méthode 'effacerHorsRectangle' est appelée, tout ce qui n'est pas dans le rectangle passé en paramètre est effacé", () => {
    const spyEffacement = vi.spyOn(mockCtx, "fillRect");
    const spyDessinerImage = vi.spyOn(mockCtx, "drawImage");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const rectangleSelection = { x: 8, y: 10, largeur: 24, hauteur: 16 };

    etatImage.effacerHorsRectangle(rectangleSelection.x, rectangleSelection.y, rectangleSelection.largeur, rectangleSelection.hauteur);

    expect(spyDessinerImage).toHaveBeenCalledWith(
      expect.anything(),
      rectangleSelection.x,
      rectangleSelection.y,
      rectangleSelection.largeur,
      rectangleSelection.hauteur,
      rectangleSelection.x,
      rectangleSelection.y,
      rectangleSelection.largeur,
      rectangleSelection.hauteur
    );

    expect(spyEffacement).toHaveBeenCalledWith(0, 0, mockImage.width, mockImage.height);

    expect(spyDessinerImage).toHaveBeenCalledWith(expect.any(HTMLCanvasElement), 0, 0);
  });

  test("Lorsque la méthode 'effacerHorsPolygone' est appelée, tout ce qui n'est pas dans le polygone passé en paramètre est effacé", () => {
    const spyEffacement = vi.spyOn(mockCtx, "fillRect");
    const spyDessinerImage = vi.spyOn(mockCtx, "drawImage");
    const spyDeplacerA = vi.spyOn(mockCtx, "moveTo");
    const spyDessinerLigne = vi.spyOn(mockCtx, "lineTo");
    const spyDessinerPolygone = vi.spyOn(mockCtx, "clip");

    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const points: TCoordonnees[] = [
      { x: 10, y: 10 },
      { x: 50, y: 10 },
      { x: 50, y: 50 },
      { x: 10, y: 50 }
    ];

    etatImage.effacerHorsPolygone(points);

    expect(spyDessinerImage).toHaveBeenCalledWith(expect.anything(), 0, 0);

    expect(spyEffacement).toHaveBeenCalledWith(0, 0, mockImage.width, mockImage.height);

    expect(spyDeplacerA).toHaveBeenCalledWith(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      expect(spyDessinerLigne).toHaveBeenCalledWith(points[i].x, points[i].y);
    }

    expect(spyDessinerPolygone).toHaveBeenCalled();
    expect(spyDessinerImage).toHaveBeenCalledWith(expect.any(HTMLCanvasElement), 0, 0);
  });

  test("Lorsque la méthode 'debuterDeplacementLigne' est appelée et qu'une ligne existe, la ligne demandée est considérée comme étant en deplacement", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyRecupererLigneParId = vi.spyOn(etatImage, "recupererLigneParId");

    const pointDepart = { x: 5, y: 5 };
    const pointFin = { x: 17, y: 19 };

    etatImage.dessinerLigne(pointDepart.x, pointDepart.y, pointFin.x, pointFin.y);

    const nouvelleLigne = etatImage.lignes[0];

    etatImage.debuterDeplacementLigne(nouvelleLigne.id);

    expect(spyRecupererLigneParId).toHaveBeenCalledWith(nouvelleLigne.id);
    expect(etatImage.recupererLigneParId(nouvelleLigne.id)).toStrictEqual({ ...nouvelleLigne, enDeplacement: true });
  });

  test("Lorsque la méthode 'debuterDeplacementLigne' est appelée et qu'aucune ligne n'existe, la méthode ne fait rien", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyRecupererLigneParId = vi.spyOn(etatImage, "recupererLigneParId");

    const fauxId = "6423843";

    etatImage.debuterDeplacementLigne(fauxId);

    expect(spyRecupererLigneParId).toHaveBeenCalledWith(fauxId);
    expect(etatImage.recupererLigneParId(fauxId)).toBe(undefined);
  });

  test("Lorsque la méthode 'finaliserDeplacementLigne' est appelée et qu'une ligne existe, le déplacement de celle-ci est finalisé", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyRecupererLigneParId = vi.spyOn(etatImage, "recupererLigneParId");

    const pointDepart = { x: 5, y: 5 };
    const pointFin = { x: 17, y: 19 };

    etatImage.dessinerLigne(pointDepart.x, pointDepart.y, pointFin.x, pointFin.y);

    const nouvelleLigne = etatImage.lignes[0];

    const deltaX = 8;
    const deltaY = 11;

    etatImage.finaliserDeplacementLigne(nouvelleLigne.id, deltaX, deltaY, ["debut", "fin"]);

    expect(spyRecupererLigneParId).toHaveBeenCalledWith(nouvelleLigne.id);
    expect(etatImage.recupererLigneParId(nouvelleLigne.id)).toBe(nouvelleLigne);
    expect(etatImage.lignes[0].debutLigne).toStrictEqual({ x: pointDepart.x + deltaX, y: pointDepart.y + deltaY });
    expect(etatImage.lignes[0].finLigne).toStrictEqual({ x: pointFin.x + deltaX, y: pointFin.y + deltaY });
  });

  test("Lorsque la méthode 'finaliserDeplacementLigne' est appelée et qu'aucune ligne n'existe, la méthode ne fait rien", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyRecupererLigneParId = vi.spyOn(etatImage, "recupererLigneParId");

    const fauxId = "6423843";

    etatImage.finaliserDeplacementLigne(fauxId, 34, 52, []);

    expect(spyRecupererLigneParId).toHaveBeenCalledWith(fauxId);
    expect(etatImage.recupererLigneParId(fauxId)).toBe(undefined);
  });

  test("Lorsque la méthode 'changerEpaisseurLignes' est appelée, l'épaisseur des lignes change pour celle passée en paramètre", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.epaisseurLignes).toBe(1);

    etatImage.changerEpaisseurLignes(2);

    expect(etatImage.epaisseurLignes).toBe(2);
  });

  test("Lorsque la méthode 'changerEpaisseurLignes' est appelée avec une épaisseur inférieure à 1, l'épaisseur des lignes ne change pas", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.epaisseurLignes).toBe(1);

    etatImage.changerEpaisseurLignes(0);

    expect(etatImage.epaisseurLignes).toBe(1);
  });

  test("Lorsque la méthode 'enregistrerVersionDansHistorique' est appelée, une nouvelle versions du buffer est enregistrée dans l'historique", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.historique).toHaveLength(1);

    etatImage.enregistrerVersionDansHistorique("initialiser");

    expect(etatImage.historique).toHaveLength(2);
  });

  test("Lorsque la méthode 'enregistrerVersionDansHistorique' est appelée avec un id de ligne en paramètre, la version ajoutée dans l'historique possède cet id de ligne", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const fauxId = "723473";

    etatImage.enregistrerVersionDansHistorique("ajouterLigne", fauxId);

    expect(etatImage.historique[etatImage.historique.length - 1].idLigne).toBe("723473");
  });

  test("Lorsque la méthode 'enregistrerVersionDansHistorique' est appelée et que la version active n'est pas la dernière, les suivantes enregistrées sont effacées", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    etatImage.enregistrerVersionDansHistorique("initialiser");
    etatImage.enregistrerVersionDansHistorique("effacer");

    expect(etatImage.historique).toHaveLength(3);

    etatImage.indexHistorique = 0;

    etatImage.enregistrerVersionDansHistorique("deplacerLigne");

    expect(etatImage.historique).toHaveLength(2);
  });

  test("Lorsque la méthode 'annuler' est appelée, la version active recule de 1 version", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    etatImage.enregistrerVersionDansHistorique("initialiser");

    expect(etatImage.indexHistorique).toBe(1);

    etatImage.annuler();

    expect(etatImage.indexHistorique).toBe(0);
  });

  test("Lorsque la méthode 'retablir' est appelée, la version active avance de 1 version", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    etatImage.enregistrerVersionDansHistorique("initialiser");

    etatImage.indexHistorique = 0;

    expect(etatImage.indexHistorique).toBe(0);

    etatImage.retablir();

    expect(etatImage.indexHistorique).toBe(1);
  });

  test("Lorsque la méthode 'recupererImage' est appelée, l'image correspondant au buffer est retournée", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.recupererImage).toEqual({ src: "data:image/png;base64,MOCK_IMAGE" });
  });

  test("Lorsque la méthode 'recupererLigneParId' est appelée et que la ligne existe, elle est retournée", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const fausseLigne: ILigne = {
      id: "478359",
      debutLigne: { x: 8, y: 12 },
      finLigne: { x: 23, y: 24 },
      enDeplacement: false,
      selectionnee: false
    };

    etatImage.lignes = [fausseLigne];

    expect(etatImage.recupererLigneParId(fausseLigne.id)).toStrictEqual(fausseLigne);
  });

  test("Lorsque la méthode 'recupererLigneParId' est appelée et que la ligne n'existe pas, rien n'est retourné", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.recupererLigneParId("287594")).toBe(undefined);
  });

  test("Lorsque la méthode 'recupererBuffer' est appelée, le buffer est retourné", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.recupererBuffer).toStrictEqual(etatImage.historique[0].buffer);
  });

  test("Lorsque la méthode 'exporter' est appelée, l'image correspondant au buffer est retournée", () => {
    const etatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    expect(etatImage.exporter).toEqual("data:image/png;base64,MOCK_IMAGE");
  });
});
