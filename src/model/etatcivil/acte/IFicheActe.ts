import {
  compactObject,
  getValeurOuVide,
  triListeObjetsSurPropriete
} from "../../../views/common/util/Utils";
import { IPersonne } from "../commun/IPersonne";
import { NatureActe } from "../enum/NatureActe";
import { TypeActe } from "../enum/TypeActe";
import { TypeVisibiliteArchiviste } from "../enum/TypeVisibiliteArchiviste";
import { TypeExtrait } from "./../enum/TypeExtrait";
import { IAnalyseMarginale } from "./IAnalyseMarginale";
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
  corpsText?: ICorpsText;
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
      cer => (cer.type = typeExtrait)
    );
    return corpsExtraitRectification
      ? corpsExtraitRectification.texte
      : undefined;
  },

  getTitulairesDansLeBonOrdre(acte: IFicheActe): ITitulairesActe {
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
  }
};
