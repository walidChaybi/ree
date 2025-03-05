import DateUtils, { IDateCompose } from "@util/DateUtils";
import { formatNom, formatNoms, formatPrenoms, jointPrenoms } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { SectionPartProps } from "@widget/section/SectionPart";
import { Nationalite } from "../enum/Nationalite";
import { Sexe } from "../enum/Sexe";
import { IPrenom } from "../fiche/IPrenom";

export interface IPartenaireDTO {
  numeroOrdreSaisi: number;
  nomFamille: string;
  dateNaissance: IDateCompose;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  nationalite: string;
  sexe: string;
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
    "regionNaissance",
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
    public readonly nationalite: Nationalite,
    public readonly sexe: Sexe,
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
      case !Object(Sexe).hasOwnProperty(partenaire.sexe):
        console.error(`Le sexe de ${typeof partenaire} a la valeur interdite : ${partenaire.sexe}.`);
        return null;
    }

    return new Partenaire(
      partenaire.numeroOrdreSaisi,
      partenaire.nomFamille,
      partenaire.dateNaissance,
      partenaire.villeNaissance,
      partenaire.paysNaissance,
      partenaire.regionNaissance,
      Nationalite.getEnumFor(partenaire.nationalite),
      Sexe.getEnumFor(partenaire.sexe),
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
            value: this.nationalite?.libelle
          },
          {
            libelle: "Sexe",
            value: this.sexe?.libelle
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
