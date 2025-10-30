import { v6 as uuidv6 } from "uuid";
import type { TCoordonnees } from "../../composants/commun/retoucheImage/Canvas";
import type { ILigne } from "../../composants/commun/retoucheImage/barreOutils/ligne/TracerLigne";
import UtilitaireRetoucheImage, { TExtremite } from "../../utils/UtilitaireRetoucheImage";

interface IPositionLigne {
  debutLigne: TCoordonnees;
  finLigne: TCoordonnees;
}

type TActionRetoucheImage = "ajouterLigne" | "deplacerLigne" | "effacerLigne" | "recadrer" | "effacer" | "initialiser";

class EtatImage {
  public historique: { buffer: HTMLCanvasElement; action: TActionRetoucheImage; idLigne?: string; dernierePosition?: IPositionLigne }[] =
    [];
  public indexHistorique: number = -1;

  public lignes: ILigne[] = [];
  public lignesSupprimees: ILigne[] = [];
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

    this.enregistrerVersionDansHistorique("initialiser");
  }

  public effacer = (x: number, y: number, taille: number) => {
    this.ctx.clearRect(x - taille / 2, y - taille / 2, taille, taille);
  };

  public effacerDansRectangle = (x: number, y: number, largeur: number, hauteur: number) => {
    this.ctx.clearRect(x, y, largeur, hauteur);
  };

  public effacerDansPolygone = (x: number, y: number, taille: number, polygone: TCoordonnees[]) => {
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

  public dessinerLigne = (x1: number, y1: number, x2: number, y2: number) => {
    this.enregistrerNouvelleLigne(x1, y1, x2, y2);
    this.enregistrerVersionDansHistorique("ajouterLigne", this.lignes[this.lignes.length - 1].id);
  };

  public appliquerRotation = (degres: number) => {
    const radiusAngle = (degres * Math.PI) / 180;

    const largeur = this.buffer.width;
    const hauteur = this.buffer.height;

    const tempCanvas = document.createElement("canvas");

    tempCanvas.width = largeur;
    tempCanvas.height = hauteur;

    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.translate(largeur / 2, hauteur / 2);
    tempCtx.rotate(radiusAngle);
    tempCtx.drawImage(this.buffer, -largeur / 2, -hauteur / 2);

    const ctxBuffer = this.buffer.getContext("2d");
    if (!ctxBuffer) return;

    ctxBuffer.clearRect(0, 0, largeur, hauteur);
    ctxBuffer.drawImage(tempCanvas, 0, 0);

    this.enregistrerVersionDansHistorique("recadrer");
  };

  public effacerHorsRectangle = (x: number, y: number, largeur: number, hauteur: number) => {
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

    this.enregistrerVersionDansHistorique("effacer");
  };

  public effacerHorsPolygone = (pointsSelectionPolygonale: TCoordonnees[]) => {
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

    this.enregistrerVersionDansHistorique("effacer");
  };

  public debuterDeplacementLigne = (id: string) => {
    const ligneAExtraire = this.recupererLigneParId(id);

    if (!ligneAExtraire) return;

    this.lignes = this.lignes.map(ligne => ({ ...ligne, enDeplacement: ligne.id === ligneAExtraire.id }));
  };

  public finaliserDeplacementLigne = (id: string, deltaX: number, deltaY: number, extremites: TExtremite[]) => {
    const ligneAReintegrer = this.recupererLigneParId(id);

    if (!ligneAReintegrer) return;

    const dernierePosition = { debutLigne: ligneAReintegrer.debutLigne, finLigne: ligneAReintegrer.finLigne };

    ligneAReintegrer.enDeplacement = false;

    if (extremites.includes("debut")) {
      ligneAReintegrer.debutLigne = {
        x: ligneAReintegrer.debutLigne.x + deltaX,
        y: ligneAReintegrer.debutLigne.y + deltaY
      };
    }

    if (extremites.includes("fin")) {
      ligneAReintegrer.finLigne = {
        x: ligneAReintegrer.finLigne.x + deltaX,
        y: ligneAReintegrer.finLigne.y + deltaY
      };
    }

    this.lignes = this.lignes.map(ligne => (ligne.id === ligneAReintegrer.id ? ligneAReintegrer : ligne));

    this.enregistrerVersionDansHistorique("deplacerLigne", id, dernierePosition);
  };

  public selectionnerLigne = (idLigne: string): void => {
    this.lignes = this.lignes.map(ligne => ({ ...ligne, selectionnee: ligne.id === idLigne }));
  };

  public annulerSelectionLignes = (): void => {
    this.lignes = this.lignes.map(ligne => ({ ...ligne, selectionnee: false }));
  };

  public effacerLigne = (idLigne: string): void => {
    this.supprimerLigne(idLigne);

    this.enregistrerVersionDansHistorique("effacerLigne", idLigne);
  };

  public changerEpaisseurLignes = (nouvelleEpaisseur: number): void => {
    if (nouvelleEpaisseur < 1) return;

    this.epaisseurLignes = nouvelleEpaisseur;
  };

  public enregistrerVersionDansHistorique = (action: TActionRetoucheImage, idLigne?: string, dernierePosition?: IPositionLigne): void => {
    this.historique = this.historique.slice(0, this.indexHistorique + 1);

    const clone = document.createElement("canvas");

    clone.width = this.buffer.width;
    clone.height = this.buffer.height;

    clone.getContext("2d")!.drawImage(this.buffer, 0, 0);

    this.historique.push({ buffer: clone, action, idLigne, dernierePosition });
    this.indexHistorique = this.historique.length - 1;
  };

  public annuler = (): void => {
    if (this.indexHistorique > 0) {
      const idPotentielleLigne = this.historique[this.indexHistorique].idLigne;

      if (idPotentielleLigne) {
        this.annulerActionLigne(this.historique[this.indexHistorique].action, idPotentielleLigne);
      }

      this.indexHistorique--;

      this.retablirDepuisHistorique();
    }
  };

  public retablir = (): void => {
    if (this.indexHistorique < this.historique.length - 1) {
      this.indexHistorique++;

      const idPotentielleLigne = this.historique[this.indexHistorique].idLigne;

      if (idPotentielleLigne) {
        this.retablirActionLigne(this.historique[this.indexHistorique].action, idPotentielleLigne);
      }

      this.retablirDepuisHistorique();
    }
  };

  public recupererLigneParId = (id: string) => {
    return this.lignes.find(ligne => ligne.id === id);
  };

  private readonly enregistrerNouvelleLigne = (x1: number, y1: number, x2: number, y2: number) => {
    this.lignes.push({
      id: uuidv6(),
      debutLigne: { x: x1, y: y1 },
      finLigne: { x: x2, y: y2 },
      enDeplacement: false,
      selectionnee: false
    });
  };

  private readonly supprimerLigne = (idLigne: string): void => {
    const ligneASupprimer = this.lignes.find(ligne => ligne.id === idLigne);

    if (ligneASupprimer) {
      this.lignesSupprimees.push(ligneASupprimer);
      this.lignes = this.lignes.filter(ligne => ligne.id !== ligneASupprimer.id);
    }
  };

  private readonly reintegrerLigne = (idLigne: string): void => {
    const ligneAReintegrer = this.lignesSupprimees.find(ligne => ligne.id === idLigne);

    if (ligneAReintegrer) {
      this.lignes.push(ligneAReintegrer);
      this.lignesSupprimees = this.lignesSupprimees.filter(ligne => ligne.id !== ligneAReintegrer.id);
    }
  };

  private readonly deplacerLigneDepuisDernierePosition = (
    ligneADeplacer: ILigne,
    idLigne: string,
    dernierePositionLigne: IPositionLigne
  ): void => {
    const nouvelleDernierePosition: IPositionLigne = { debutLigne: ligneADeplacer.debutLigne, finLigne: ligneADeplacer.finLigne };

    this.lignes = this.lignes.map(ligne =>
      ligne.id === idLigne ? { ...ligne, debutLigne: dernierePositionLigne.debutLigne, finLigne: dernierePositionLigne.finLigne } : ligne
    );

    this.historique[this.indexHistorique].dernierePosition = nouvelleDernierePosition;
  };

  private readonly annulerActionLigne = (action: TActionRetoucheImage, idLigne: string): void => {
    switch (action) {
      case "ajouterLigne":
        this.supprimerLigne(idLigne);

        break;
      case "deplacerLigne": {
        const dernierePositionLigne = this.historique[this.indexHistorique].dernierePosition;
        const ligneADeplacer = this.lignes.find(ligne => ligne.id === idLigne);

        if (dernierePositionLigne && ligneADeplacer) {
          this.deplacerLigneDepuisDernierePosition(ligneADeplacer, idLigne, dernierePositionLigne);
        }

        break;
      }
      case "effacerLigne":
        this.reintegrerLigne(idLigne);

        break;
      default:
        break;
    }
  };

  private readonly retablirActionLigne = (action: TActionRetoucheImage, idLigne: string): void => {
    switch (action) {
      case "ajouterLigne": {
        this.reintegrerLigne(idLigne);

        break;
      }
      case "deplacerLigne": {
        const dernierePositionLigne = this.historique[this.indexHistorique].dernierePosition;
        const ligneADeplacer = this.lignes.find(ligne => ligne.id === idLigne);

        if (dernierePositionLigne && ligneADeplacer) {
          this.deplacerLigneDepuisDernierePosition(ligneADeplacer, idLigne, dernierePositionLigne);
        }

        break;
      }
      case "effacerLigne":
        this.supprimerLigne(idLigne);

        break;
      default:
        break;
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
