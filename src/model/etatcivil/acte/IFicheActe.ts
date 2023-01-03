import { DATE_MES } from "@util/DateUtils";
import {
  compactObject,
  DEUX,
  getValeurOuVide,
  premiereLettreEnMinuscule,
  SNP,
  SPC,
  supprimeSautDeLigneEtEspaceInutiles,
  triListeObjetsSurPropriete,
  TROIS,
  UN
} from "@util/Utils";
import { ChoixDelivrance } from "../../requete/enum/ChoixDelivrance";
import { IPersonne } from "../commun/IPersonne";
import { NatureActe } from "../enum/NatureActe";
import { NATIONALITE, NatureMention } from "../enum/NatureMention";
import { Sexe } from "../enum/Sexe";
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
import { ITitulaireActe, TitulaireActe } from "./ITitulaireActe";
import { IMention, Mention } from "./mention/IMention";

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
  dateCreation?: Date;
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

  estActeNaissance(acte?: IFicheActe): boolean {
    return acte?.nature === NatureActe.NAISSANCE;
  },
  estActeMariage(acte?: IFicheActe): boolean {
    return acte?.nature === NatureActe.MARIAGE;
  },
  estActeDeces(acte?: IFicheActe): boolean {
    return acte?.nature === NatureActe.DECES;
  },
  estActeDecesOuMariage(acte?: IFicheActe): boolean {
    return this.estActeDeces(acte) || this.estActeMariage(acte);
  },
  acteEstACQouOP2ouOP3(acte?: IFicheActe): boolean {
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

  estActeTexte(acte: IFicheActe): boolean {
    return acte.type === TypeActe.TEXTE || !acte.corpsImage;
  },

  estActeImageReecrit(acte: IFicheActe): boolean {
    return (
      acte.type === TypeActe.IMAGE &&
      Boolean(acte.estReecrit) &&
      Boolean(acte.corpsTexte?.texte)
    );
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

  getTitulairesAMDansLOrdreAvecMajDonneesTitulaireActe(acte: IFicheActe) {
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
        majNomSecable(
          titulairesAMs[0],
          titulairesActeDansLOrdre.titulaireActe1
        );

        majSexeAgeNaissanceEtFiliattion(
          titulairesAMs[0],
          titulairesActeDansLOrdre.titulaireActe1
        );
      }

      if (titulairesAMDansLOrdre.titulaireAM2) {
        titulairesAMs[1] = { ...titulairesAMDansLOrdre.titulaireAM2 };
        majNomSecable(
          titulairesAMs[1],
          titulairesActeDansLOrdre.titulaireActe2
        );

        if (titulairesActeDansLOrdre.titulaireActe2) {
          majSexeAgeNaissanceEtFiliattion(
            titulairesAMs[1],
            titulairesActeDansLOrdre.titulaireActe2
          );
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
  },

  getMentionNationalite(acte: IFicheActe, choixDelivrance?: ChoixDelivrance) {
    if (acte && necessiteMentionNationalite(acte, choixDelivrance)) {
      let max = 0;
      acte.mentions.forEach(el => {
        max = max < el.numeroOrdreExtrait ? el.numeroOrdreExtrait : max;
      });
      return [
        {
          numeroOrdreExtrait: max + 1,
          textes: {
            texteMentionDelivrance: extraireMentionNationalite(
              acte.corpsTexte?.texte
            )
          },
          typeMention: {
            nature: {
              id: NatureMention.getKeyForCode(NatureMention, NATIONALITE)
            }
          }
        }
      ];
    } else return [];
  },

  estNombreDeTitulaireErrone(acte: IFicheActe): boolean | undefined {
    let error;
    if (acte && acte.titulaires) {
      const nombreTitulaire = acte.titulaires?.length;
      switch (acte.nature) {
        case NatureActe.DECES:
        case NatureActe.NAISSANCE:
          if (nombreTitulaire > UN) {
            error = true;
          }
          break;
        case NatureActe.MARIAGE:
          if (nombreTitulaire > DEUX) {
            error = true;
          }
          break;
        default:
          break;
      }

      if (!error) {
        return false;
      } else {
        return true;
      }
    }
  },

  aNomEtPrenomTitulaireAbsentsAnalyseMarginale(acte: IFicheActe): boolean {
    const analyseMarginale = AnalyseMarginale.getAnalyseMarginaleLaPlusRecente(
      acte.analyseMarginales
    );

    if (analyseMarginale) {
      return Boolean(
        analyseMarginale.titulaires?.find(
          titulaire =>
            (!titulaire.nom && titulaire.prenoms?.length === 0) ||
            (titulaire.nom === SNP && titulaire.prenoms?.[0] === SPC)
        )
      );
    }
    return true;
  },

  aTitulaireGenreIndetermine(acte: IFicheActe): boolean {
    const titulaires = acte.titulaires;

    return Boolean(
      titulaires?.find(titulaire => Sexe.estIndetermine(titulaire.sexe))
    );
  },

  aGenreTitulaireInconnu(acte: IFicheActe): boolean {
    const titulaires = acte.titulaires;

    return Boolean(
      titulaires?.find(titulaire => titulaire.sexe === Sexe.INCONNU)
    );
  },

  aDonneesLieuOuAnneeEvenementAbsentes(acte: IFicheActe) {
    return (
      !acte.evenement?.annee ||
      (!acte.evenement?.lieuReprise &&
        !acte.evenement?.ville &&
        !acte.evenement?.region &&
        !acte.evenement?.pays)
    );
  },

  aGenreParentsTitulaireInconnu(acte: IFicheActe): boolean {
    const parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
      acte.titulaires[0]
    );

    return Boolean(parents.find(parent => parent.sexe === Sexe.INCONNU));
  },

  estIncomplet(acte: IFicheActe): boolean {
    switch (acte.nature) {
      case NatureActe.MARIAGE:
        return (
          this.aNomEtPrenomTitulaireAbsentsAnalyseMarginale(acte) ||
          this.aGenreTitulaireInconnu(acte) ||
          this.aDonneesLieuOuAnneeEvenementAbsentes(acte)
        );
      case NatureActe.NAISSANCE:
      case NatureActe.DECES:
        return (
          this.aNomEtPrenomTitulaireAbsentsAnalyseMarginale(acte) ||
          this.aGenreTitulaireInconnu(acte) ||
          this.aGenreParentsTitulaireInconnu(acte) ||
          this.aDonneesLieuOuAnneeEvenementAbsentes(acte)
        );
      default:
        return false;
    }
  },

  estEnErreur(acte: IFicheActe): boolean {
    const titulaire =
      FicheActe.getTitulairesActeDansLOrdre(acte).titulaireActe1;

    switch (acte.nature) {
      case NatureActe.MARIAGE:
        return (
          this.aTitulairesDeMemeSexe(acte) ||
          this.aTitulaireGenreIndetermine(acte) ||
          this.tousLesTitulairesInconnusOuIndetermines(acte)
        );
      case NatureActe.NAISSANCE:
      case NatureActe.DECES:
        return (
          this.aTitulaireGenreIndetermine(acte) ||
          TitulaireActe.parentsSontDeMemeSexe(titulaire) ||
          this.aGenreParentsTitulaireIndetermine(acte)
        );
      default:
        return false;
    }
  },

  aGenreParentsTitulaireIndetermine(acte: IFicheActe): boolean {
    const parents = TitulaireActe.getAuMoinsDeuxParentsDirects(
      acte.titulaires[0]
    );

    return Boolean(parents.find(parent => parent.sexe === Sexe.INDETERMINE));
  },

  aTitulairesDeMemeSexe(acte: IFicheActe): boolean {
    const titulaires = acte.titulaires;
    return titulaires.length > 1
      ? titulaires[0]?.sexe === titulaires[1]?.sexe
      : false;
  },

  tousLesTitulairesInconnusOuIndetermines(acte: IFicheActe): boolean {
    const titulaires = acte.titulaires;

    return (
      titulaires.some(el => el.sexe === Sexe.INDETERMINE) ||
      titulaires.some(el => el.sexe === Sexe.INCONNU)
    );
  },

  getTitulaireMasculin(acte: IFicheActe): ITitulaireActe | undefined {
    return acte.titulaires.find(titulaire => titulaire.sexe === Sexe.MASCULIN);
  },

  getTitulaireFeminin(acte: IFicheActe): ITitulaireActe | undefined {
    return acte.titulaires.find(titulaire => titulaire.sexe === Sexe.FEMININ);
  }
};

function majSexeAgeNaissanceEtFiliattion(
  titulairesAM: ITitulaireActe,
  titulaireActe: ITitulaireActe
) {
  titulairesAM.sexe = titulaireActe.sexe;
  titulairesAM.filiations = titulaireActe.filiations;
  titulairesAM.age = titulaireActe.age;
  titulairesAM.naissance = titulaireActe.naissance;
}

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
function majNomSecable(
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

const SOUS_LE_NOM = "sous le nom de";
const SOUS_L_IDENTITE = "sous l'identité de";
function extraireMentionNationalite(texte?: string) {
  if (texte) {
    let regex;
    if (texte.indexOf(SOUS_LE_NOM) !== -1) {
      regex =
        /(Français par|Française par)[:\s]+([\s\w\W]*)sous le nom de[^(]*([\s\w\W]*?)\r?\n\r?\n/gm;
    } else if (texte.indexOf(SOUS_L_IDENTITE) !== -1) {
      regex =
        /(Français par|Française par)[:\s]+([\s\w\W]*)sous l'identité de[^(]*([\s\w\W]*?)\r?\n\r?\n/gm;
    } else {
      regex = /(Français par|Française par)[:\s]+([\s\w\W]*?)\r?\n\r?\n/gm;
    }

    const matches = new RegExp(regex).exec(texte);
    const partieMilieu = supprimeSautDeLigneEtEspaceInutiles(
      premiereLettreEnMinuscule(matches?.[DEUX])
    );
    const entreParenthese = supprimeSautDeLigneEtEspaceInutiles(
      matches?.[TROIS]
    );
    return `${matches?.[1]} ${partieMilieu} ${entreParenthese}`;
  }
  return "Nationalite";
}

export function necessiteMentionNationalite(
  acte: IFicheActe,
  choixDelivrance?: ChoixDelivrance
): boolean {
  return (
    FicheActe.estActeNaissance(acte) &&
    FicheActe.acteEstACQouOP2ouOP3(acte) &&
    (FicheActe.estActeTexte(acte) || FicheActe.estActeImageReecrit(acte)) &&
    !Mention.mentionNationalitePresente(acte.mentions) &&
    ChoixDelivrance.estAvecFiliation(choixDelivrance)
  );
}
