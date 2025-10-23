import { v6 as uuidv6 } from "uuid";
import type { TCoordonnees } from "../../composants/commun/retoucheImage/Canvas";
import type { ILigne } from "../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import UtilitaireRetoucheImage, { TExtremite } from "../../utils/UtilitaireRetoucheImage";

class EtatImage {
  public historique: { buffer: HTMLCanvasElement; idLigne?: string }[] = [];
  public indexHistorique: number = -1;

  public lignes: ILigne[] = [];
  public epaisseurLignes: number = 1;

  private buffer: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(largeur: number, hauteur: number, image?: HTMLImageElement) {
    this.buffer = document.createElement("canvas");
    this.buffer.width = largeur;
    this.buffer.height = hauteur;

    const ctx = this.buffer.getContext("2d");

    if (!ctx) throw new Error("Impossible d'initialiser le buffer");

    this.ctx = ctx;

    if (image) {
      this.ctx.drawImage(image, 0, 0, largeur, hauteur);
    }

    this.enregistrerVersionDansHistorique();
  }

  effacer = (x: number, y: number, taille: number) => {
    this.ctx.clearRect(x - taille / 2, y - taille / 2, taille, taille);
  };

  effacerDansRectangle = (x: number, y: number, largeur: number, hauteur: number) => {
    this.ctx.clearRect(x, y, largeur, hauteur);
  };

  effacerDansPolygone = (x: number, y: number, taille: number, polygone: TCoordonnees[]) => {
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.moveTo(polygone[0].x, polygone[0].y);

    for (let i = 1; i < polygone.length; i++) {
      this.ctx.lineTo(polygone[i].x, polygone[i].y);
    }

    this.ctx.closePath();
    this.ctx.clip();

    this.effacer(x, y, taille);

    this.ctx.restore();
  };

  dessinerLigne = (x1: number, y1: number, x2: number, y2: number) => {
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = this.epaisseurLignes;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    this.enregistrerNouvelleLigne(x1, y1, x2, y2);
    this.enregistrerVersionDansHistorique(this.lignes[this.lignes.length - 1].id);
  };

  enregistrerNouvelleLigne = (x1: number, y1: number, x2: number, y2: number) => {
    this.lignes.push({
      id: uuidv6(),
      debutLigne: { x: x1, y: y1 },
      finLigne: { x: x2, y: y2 }
    });
  };

  appliquerRotation = (degres: number) => {
    const radiusAngle = (degres * Math.PI) / 180;

    const cos = Math.abs(Math.cos(radiusAngle));
    const sin = Math.abs(Math.sin(radiusAngle));

    const largeurOriginale = this.buffer.width;
    const hauteurOriginale = this.buffer.height;

    const nouvelleLargeur = Math.ceil(largeurOriginale * cos + hauteurOriginale * sin);
    const nouvelleHauteur = Math.ceil(largeurOriginale * sin + hauteurOriginale * cos);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = nouvelleLargeur;
    tempCanvas.height = nouvelleHauteur;

    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.translate(nouvelleLargeur / 2, nouvelleHauteur / 2);
    tempCtx.rotate(radiusAngle);
    tempCtx.drawImage(this.buffer, -largeurOriginale / 2, -hauteurOriginale / 2);

    this.buffer.width = nouvelleLargeur;
    this.buffer.height = nouvelleHauteur;

    UtilitaireRetoucheImage.effacerCanvas(this.ctx, this.buffer);
    this.ctx.drawImage(tempCanvas, 0, 0);

    this.enregistrerVersionDansHistorique();
  };

  effacerHorsRectangle = (x: number, y: number, largeur: number, hauteur: number) => {
    const canvasTemporaire = document.createElement("canvas");

    canvasTemporaire.width = this.buffer.width;
    canvasTemporaire.height = this.buffer.height;

    const contexteTemporaire = canvasTemporaire.getContext("2d");

    if (!contexteTemporaire) return;

    contexteTemporaire.drawImage(this.buffer, x, y, largeur, hauteur, x, y, largeur, hauteur);

    UtilitaireRetoucheImage.effacerCanvas(this.ctx, this.buffer);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.buffer.width, this.buffer.height);

    this.ctx.drawImage(canvasTemporaire, 0, 0);

    this.enregistrerVersionDansHistorique();
  };

  effacerHorsPolygone = (pointsSelectionPolygonale: TCoordonnees[]) => {
    const canvasTemporaire = document.createElement("canvas");

    canvasTemporaire.width = this.buffer.width;
    canvasTemporaire.height = this.buffer.height;

    const ctxTemporaire = canvasTemporaire.getContext("2d");

    if (!ctxTemporaire) return;

    ctxTemporaire.drawImage(this.buffer, 0, 0);

    UtilitaireRetoucheImage.effacerCanvas(this.ctx, this.buffer);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.buffer.width, this.buffer.height);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(pointsSelectionPolygonale[0].x, pointsSelectionPolygonale[0].y);

    for (let i = 1; i < pointsSelectionPolygonale.length; i++) {
      this.ctx.lineTo(pointsSelectionPolygonale[i].x, pointsSelectionPolygonale[i].y);
    }

    this.ctx.closePath();
    this.ctx.clip();

    this.ctx.drawImage(canvasTemporaire, 0, 0);

    this.ctx.restore();

    this.enregistrerVersionDansHistorique();
  };

  extraireLigne = (id: string, epaisseurLigne: number = this.epaisseurLignes) => {
    const ligne = this.recupererLigneParId(id);

    if (!ligne) return;

    this.ctx.save();

    this.ctx.globalCompositeOperation = "destination-out";
    this.ctx.lineWidth = epaisseurLigne + 2; // + 2 pour que tout le trait soit bien pris en compte
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(ligne.debutLigne.x, ligne.debutLigne.y);
    this.ctx.lineTo(ligne.finLigne.x, ligne.finLigne.y);
    this.ctx.stroke();
    this.ctx.restore();
  };

  reintegrerLigne = (id: string, deltaX: number, deltaY: number, extremites: TExtremite[]) => {
    const ligne = this.recupererLigneParId(id);

    if (!ligne) return;

    if (extremites.includes("debut")) {
      ligne.debutLigne = {
        x: ligne.debutLigne.x + deltaX,
        y: ligne.debutLigne.y + deltaY
      };
    }

    if (extremites.includes("fin")) {
      ligne.finLigne = {
        x: ligne.finLigne.x + deltaX,
        y: ligne.finLigne.y + deltaY
      };
    }

    this.ctx.save();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = this.epaisseurLignes;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.moveTo(ligne.debutLigne.x, ligne.debutLigne.y);
    this.ctx.lineTo(ligne.finLigne.x, ligne.finLigne.y);
    this.ctx.stroke();
    this.ctx.restore();

    this.enregistrerVersionDansHistorique(id);
  };

  changerEpaisseurLignes = (nouvelleEpaisseur: number): void => {
    if (nouvelleEpaisseur < 1) return;

    const precedenteEpaisseurLignes = this.epaisseurLignes;

    this.epaisseurLignes = nouvelleEpaisseur;

    if (this.lignes.length > 0) {
      this.redessinerToutesLesLignes(precedenteEpaisseurLignes);
    }
  };

  redessinerToutesLesLignes = (precedenteEpaisseurLignes: number): void => {
    for (const ligne of this.lignes) {
      this.extraireLigne(ligne.id, precedenteEpaisseurLignes);
      this.reintegrerLigne(ligne.id, 0, 0, []);
    }

    this.enregistrerVersionDansHistorique();
  };

  enregistrerVersionDansHistorique = (idLigne?: string): void => {
    this.historique = this.historique.slice(0, this.indexHistorique + 1);

    const clone = document.createElement("canvas");

    clone.width = this.buffer.width;
    clone.height = this.buffer.height;

    clone.getContext("2d")!.drawImage(this.buffer, 0, 0);

    this.historique.push({ buffer: clone, idLigne });
    this.indexHistorique = this.historique.length - 1;
  };

  annuler = (): void => {
    if (this.indexHistorique > 0) {
      this.indexHistorique--;

      this.retablirDepuisHistorique();
    }
  };

  retablir = (): void => {
    if (this.indexHistorique < this.historique.length - 1) {
      this.indexHistorique++;

      this.retablirDepuisHistorique();
    }
  };

  private readonly retablirDepuisHistorique = (): void => {
    const version = this.historique[this.indexHistorique];

    this.buffer = document.createElement("canvas");

    this.buffer.width = version.buffer.width;
    this.buffer.height = version.buffer.height;

    this.ctx = this.buffer.getContext("2d")!;
    this.ctx.drawImage(version.buffer, 0, 0);
  };

  recupererLigneParId = (id: string) => {
    return this.lignes.find(ligne => ligne.id === id);
  };

  get recupererImage(): HTMLImageElement {
    const img = new Image();

    img.src = this.buffer.toDataURL();

    return img;
  }

  get recupererBuffer(): HTMLCanvasElement {
    return this.buffer;
  }
  // exporter sera utile pour la suite pour renvoyer l'image retouchée au backend
  get exporter(): string {
    return this.buffer.toDataURL("image/png");
  }
}

export default EtatImage;
