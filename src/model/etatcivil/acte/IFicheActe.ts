import { DATE_MES } from "../../../views/common/util/DateUtils";
import {
  compactObject,
  getValeurOuVide,
  triListeObjetsSurPropriete
} from "../../../views/common/util/Utils";
import { IPersonne } from "../commun/IPersonne";
import { NatureActe } from "../enum/NatureActe";
import { TypeActe } from "../enum/TypeActe";
import { TypeDeclarationConjointe } from "../enum/TypeDeclarationConjointe";
import { TypeVisibiliteArchiviste } from "../enum/TypeVisibiliteArchiviste";
import { TypeExtrait } from "./../enum/TypeExtrait";
import { AnalyseMarginale, IAnalyseMarginale } from "./IAnalyseMarginale";
import { ICorpsExtraitRectification } from "./ICorpsExtraitRectification";
import { ICorpsText } from "./ICorpsText";
import { IDetailMariage } from "./IDetailMariage";
import { IEvenement } from "./IEvenement";
import { ICorpsImage } from "./imageActe/ICorpsImage";
import { IRegistre } from "./IRegistre";
import { ITitulaireActe } from "./ITitulaireActe";
import { IMention } from "./mention/IMention";

export interface IFicheActe {
  id: string;
  titulaires: ITitulaireActe[];
  evenement?: IEvenement;
  nature: NatureActe;
  numero: string;
  numeroBisTer: string;
  personnes: IPersonne[];
  estReecrit?: boolean;
  registre: IRegistre;
  dateDerniereMaj?: Date;
  dateDerniereDelivrance?: Date;
  visibiliteArchiviste: TypeVisibiliteArchiviste;
  analyseMarginales?: IAnalyseMarginale[];
  detailMariage?: IDetailMariage;
  corpsTexte?: ICorpsText;
  corpsImage?: ICorpsImage;
  type: TypeActe;
  corpsExtraitRectifications: ICorpsExtraitRectification[];
  mentions: IMention[];
}

interface ITitulairesActe {
  titulaireActe1: ITitulaireActe;
  titulaireActe2?: ITitulaireActe;
}

export const FicheActe = {
  getNature(acte?: IFicheActe): string {
    return acte && acte.nature ? acte.nature.libelle : "";
  },
  estActeNaissance(acte?: IFicheActe) {
    return acte?.nature === NatureActe.NAISSANCE;
  },
  acteEstACQouOP2ouOP3(acte?: IFicheActe) {
    return (
      acte?.registre.famille === "ACQ" ||
      acte?.registre.famille === "OP2" ||
      acte?.registre.famille === "OP3"
    );
  },

  getReference(acte?: IFicheActe): string {
    const registre: any = {
      famille: getValeurOuVide(acte?.registre?.famille).toLocaleUpperCase(),
      pocopa: getValeurOuVide(acte?.registre?.pocopa).toLocaleUpperCase(),
      annee: getValeurOuVide(acte?.registre?.annee),
      support1: getValeurOuVide(acte?.registre?.support1).toLocaleUpperCase(),
      support2: getValeurOuVide(acte?.registre?.support2).toLocaleUpperCase(),
      numeroActe: getValeurOuVide(acte?.numero),
      numeroBisTer: getValeurOuVide(acte?.numeroBisTer)
    };
    return Object.values(compactObject(registre)).join(".");
  },
  estActeImage(acte: IFicheActe) {
    return (
      acte.type === TypeActe.IMAGE ||
      (acte.corpsImage &&
        acte.corpsImage.images &&
        acte.corpsImage.images.length > 0)
    );
  },
  estActeTexte(acte: IFicheActe) {
    return acte.type === TypeActe.TEXTE || !acte.corpsImage;
  },
  getCorpsExtraitRectificationTexte(
    acte: IFicheActe,
    typeExtrait: TypeExtrait
  ): string | undefined {
    const corpsExtraitRectification = acte.corpsExtraitRectifications.find(
      cer => cer.type === typeExtrait
    );
    return corpsExtraitRectification
      ? corpsExtraitRectification.texte
      : undefined;
  },

  getTitulairesActeTabDansLOrdre(acte: IFicheActe): ITitulaireActe[] {
    const titulairesActeTab: ITitulaireActe[] = [];

    const titulairesActe = this.getTitulairesActeDansLOrdre(acte);
    titulairesActeTab.push(titulairesActe.titulaireActe1);

    if (titulairesActe.titulaireActe2) {
      titulairesActeTab.push(titulairesActe.titulaireActe2);
    }

    return titulairesActeTab;
  },

  getTitulairesActeDansLOrdre(acte: IFicheActe): ITitulairesActe {
    let resultatTitulairesActe: any = {};
    if (acte) {
      const titulaires = triListeObjetsSurPropriete(
        [...acte.titulaires],
        "ordre"
      );
      resultatTitulairesActe = {
        titulaireActe1: titulaires[0],
        titulaireActe2: titulaires[1]
      };
    }
    return resultatTitulairesActe;
  },

  getAnalyseMarginaleLaPlusRecente(acte: IFicheActe) {
    return AnalyseMarginale.getAnalyseMarginaleLaPlusRecente(
      acte.analyseMarginales
    );
  },

  getTitulairesAMDansLOrdreAvecMajDeclConjEtMajPartiesNom(acte: IFicheActe) {
    const titulairesAMs: ITitulaireActe[] = [];
    const titulairesActeDansLOrdre = this.getTitulairesActeDansLOrdre(acte);

    const analyseMarginale = this.getAnalyseMarginaleLaPlusRecente(acte);
    if (analyseMarginale) {
      const titulairesAMDansLOrdre =
        AnalyseMarginale.getTitulairesDansLOrdre(analyseMarginale);

      if (titulairesAMDansLOrdre.titulaireAM1) {
        titulairesAMs[0] = { ...titulairesAMDansLOrdre.titulaireAM1 };

        majDeclarationConjointe(
          titulairesAMs[0],
          titulairesActeDansLOrdre.titulaireActe1
        );
        majNomSequable(
          titulairesAMs[0],
          titulairesActeDansLOrdre.titulaireActe1
        );

        titulairesAMs[0].sexe = titulairesActeDansLOrdre.titulaireActe1.sexe;
      }

      if (titulairesAMDansLOrdre.titulaireAM2) {
        titulairesAMs[1] = { ...titulairesAMDansLOrdre.titulaireAM2 };
        majNomSequable(
          titulairesAMs[1],
          titulairesActeDansLOrdre.titulaireActe2
        );

        if (titulairesActeDansLOrdre.titulaireActe2) {
          titulairesAMs[1].sexe = titulairesActeDansLOrdre.titulaireActe2.sexe;
        }
      }
    }
    return titulairesAMs;
  },

  estPremiereDelivrance(acte: IFicheActe) {
    return (
      !acte.dateDerniereDelivrance ||
      acte.dateDerniereDelivrance.getTime() < DATE_MES.getTime()
    );
  },

  getImages(acte?: IFicheActe): string[] {
    const imagesDeLActe: string[] = [];

    acte?.corpsImage?.images.forEach(image =>
      imagesDeLActe.push(image.contenu)
    );

    return imagesDeLActe;
  },

  setImages(acte: IFicheActe, images: string[]): void {
    acte.corpsImage = { images: [] };
    images.forEach((image: string, index: number) => {
      //@ts-ignore acte non null
      acte.corpsImage.images.push({
        contenu: image,
        noPage: index
      });
    });
  }
};

/** Mise à jour des informations de "déclaration conjointe" à partir du titulaire de l'acte si besoin */
function majDeclarationConjointe(
  titulaireAM: ITitulaireActe,
  titulaireActe: ITitulaireActe
) {
  if (
    titulaireAM.typeDeclarationConjointe ===
    TypeDeclarationConjointe.ABSENCE_DECLARATION_VALIDEE
  ) {
    titulaireAM.dateDeclarationConjointe = undefined;
    // Remarque on ne change pas le type ABSENCE_DECLARATION_VALIDEE en ABSENCE_DECLARATION car ils ont tous les deux le même libellé
  } else if (
    !titulaireAM.typeDeclarationConjointe ||
    titulaireAM.typeDeclarationConjointe ===
      TypeDeclarationConjointe.ABSENCE_DECLARATION
  ) {
    titulaireAM.typeDeclarationConjointe =
      titulaireActe.typeDeclarationConjointe;
    titulaireAM.dateDeclarationConjointe =
      titulaireActe.dateDeclarationConjointe;
    titulaireAM.origineDeclarationConjointeTitulaireActe = true;
  }
}

/** Mise à jour des informations de "nom sécable" à partir du titulaire de l'acte si besoin */
function majNomSequable(
  titulaireAM?: ITitulaireActe,
  titulaireActe?: ITitulaireActe
) {
  // Si titulaireAM.nomPartie1 est égal à "ABSENCE_VALIDEE" alors il reste à "ABSENCE_VALIDEE" (c'est le code par la suite qui gère cette valeur)
  if (titulaireAM && !titulaireAM.nomPartie1 && titulaireActe) {
    titulaireAM.origineNomPartiesTitulaireActe = true;

    titulaireAM.nomPartie1 = titulaireActe.nomPartie1;
    titulaireAM.nomPartie2 = titulaireActe.nomPartie2;
  }
}
