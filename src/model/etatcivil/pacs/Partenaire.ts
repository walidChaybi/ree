import DateUtils, { IDateCompose } from "@util/DateUtils";
import { formatNom, formatNoms, formatPrenoms, jointPrenoms } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { SectionPartProps } from "@widget/section/SectionPart";
import { ENationalite } from "../enum/Nationalite";
import { ESexe } from "../enum/Sexe";
import { IPrenom } from "../fiche/IPrenom";

export interface IPartenaireDTO {
  numeroOrdreSaisi: number;
  nomFamille: string;
  dateNaissance: IDateCompose;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  nationalite: keyof typeof ENationalite;
  sexe: keyof typeof ESexe;
  prenoms: IPrenom[];
  autreNoms?: string[];
  autrePrenoms?: string[];
  arrondissementNaissance?: string;
}

export class Partenaire {
  private _prenoms: IPrenom[];
  private _nomFamille: string;

  private static readonly champsObligatoires: (keyof IPartenaireDTO)[] = [
    "numeroOrdreSaisi",
    "nomFamille",
    "dateNaissance",
    "villeNaissance",
    "paysNaissance",
    "nationalite",
    "sexe"
  ];

  private constructor(
    public readonly numeroOrdreSaisi: number,
    nomFamille: string,
    public readonly dateNaissance: IDateCompose,
    public readonly villeNaissance: string,
    public readonly paysNaissance: string,
    public readonly regionNaissance: string,
    public readonly nationalite: ENationalite,
    public readonly sexe: ESexe,
    prenoms: IPrenom[],
    public readonly autreNoms?: string[],
    public readonly autrePrenoms?: string[],
    public readonly arrondissementNaissance?: string
  ) {
    this._prenoms = prenoms;
    this._nomFamille = nomFamille;
  }

  public static readonly depuisDto = (partenaire: IPartenaireDTO): Partenaire | null => {
    switch (true) {
      case Partenaire.champsObligatoires.some(cle => partenaire[cle] === undefined):
        console.error(`Un champ obligatoire d'un Partenaire n'est pas défini.`);
        return null;
      case !Object.keys(ESexe).includes(partenaire.sexe):
        console.error(`Le sexe d'un Partenaire a la valeur ${partenaire.sexe} au lieu d'une des suivantes : ${Object.keys(ESexe)}.`);
        return null;
      case !Object.keys(ENationalite).includes(partenaire.nationalite):
        console.error(
          `La nationalité d'un Partenaire a la valeur ${partenaire.nationalite} au lieu d'une des suivantes : ${Object.keys(ENationalite)}.`
        );
        return null;
    }

    return new Partenaire(
      partenaire.numeroOrdreSaisi,
      partenaire.nomFamille,
      partenaire.dateNaissance,
      partenaire.villeNaissance,
      partenaire.paysNaissance,
      partenaire.regionNaissance,
      ENationalite[partenaire.nationalite],
      ESexe[partenaire.sexe],
      partenaire.prenoms,
      partenaire.autreNoms,
      partenaire.autrePrenoms,
      partenaire.arrondissementNaissance
    );
  };

  public readonly commeSectionPartProps = (idx: number): SectionPartProps => {
    return {
      partContent: {
        title: `Partenaire ${idx + 1}`,
        contents: [
          {
            libelle: "Nom",
            value: this.nomFamille
          },
          {
            libelle: "Autre(s) nom(s)",
            value: formatNoms(this.autreNoms)
          },
          {
            libelle: "Prénoms",
            value: this.prenoms
          },
          {
            libelle: "Autre(s) prénom(s)",
            value: formatPrenoms(this.autrePrenoms)
          },
          {
            libelle: "Date de naissance",
            value: DateUtils.getDateStringFromDateCompose(this.dateNaissance)
          },
          {
            libelle: "Lieu de naissance",
            value: LieuxUtils.getLieu(this.villeNaissance, this.regionNaissance, this.paysNaissance, this.arrondissementNaissance)
          },
          {
            libelle: "Nationalité",
            value: this.nationalite
          },
          {
            libelle: "Sexe",
            value: this.sexe
          }
        ]
      }
    };
  };

  public static readonly commeTableauSectionPartProps = (partenaires: (Partenaire | null)[]): SectionPartProps[] => {
    return partenaires.map((p, idx) => {
      if (p) {
        return p.commeSectionPartProps(idx);
      } else {
        return {
          partContent: {
            title: `Partenaire ${idx + 1}`,
            contents: []
          }
        };
      }
    });
  };

  public readonly getLieuNaissance = (): string => {
    return LieuxUtils.getLieu(this.villeNaissance, this.regionNaissance, this.paysNaissance, this.arrondissementNaissance);
  };

  get prenoms() {
    return jointPrenoms(this._prenoms);
  }

  get nomFamille() {
    return formatNom(this._nomFamille);
  }
}
