import DateUtils, { IDateCompose } from "@util/DateUtils";
import { formatNom, formatPrenom, triListeObjetsSurPropriete } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { SectionContentProps } from "@widget/section/SectionContent";
import { ENationalite } from "../enum/Nationalite";
import { ESexe } from "../enum/Sexe";
import { IPrenom } from "../fiche/IPrenom";
import { IParent } from "./IParent";

export interface IInteresseDTO {
  numeroOrdreSaisi: number;
  nomFamille: string;
  dateNaissance: IDateCompose;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  nationalite: keyof typeof ENationalite;
  sexe: keyof typeof ESexe;
  autreNoms?: string[];
  autrePrenoms?: string[];
  prenoms?: IPrenom[];
  arrondissementNaissance?: string;
  dateDeces?: IDateCompose;
  villeDeces?: string;
  paysDeces?: string;
  regionDeces?: string;
  arrondissementDeces?: string;
  parents?: IParent[];
}

export class Interesse {
  private static readonly champsObligatoires: (keyof IInteresseDTO)[] = [
    "numeroOrdreSaisi",
    "nomFamille",
    "dateNaissance",
    "villeNaissance",
    "paysNaissance",
    "sexe",
    "nationalite"
  ];

  private _prenoms: IPrenom[];
  private constructor(
    public readonly numeroOrdreSaisi: number,
    public readonly nomFamille: string,
    public readonly dateNaissance: IDateCompose,
    public readonly villeNaissance: string,
    public readonly paysNaissance: string,
    public readonly regionNaissance: string,
    public readonly nationalite: ENationalite,
    public readonly sexe: ESexe,
    public readonly autreNoms: string[],
    public readonly autrePrenoms: string[],
    prenoms: IPrenom[],
    public readonly arrondissementNaissance?: string,
    public readonly dateDeces?: IDateCompose,
    public readonly villeDeces?: string,
    public readonly paysDeces?: string,
    public readonly regionDeces?: string,
    public readonly arrondissementDeces?: string,
    public readonly parents?: IParent[]
  ) {
    this._prenoms = prenoms;
  }

  public static readonly depuisDto = (interesse: IInteresseDTO): Interesse | null => {
    switch (true) {
      case Interesse.champsObligatoires.some(cle => interesse[cle] === undefined):
        console.error(`Un champ obligatoire d'un Interesse n'est pas défini.`);
        return null;
      case !Object.keys(ESexe).includes(interesse.sexe):
        console.error(`Le sexe d'un Interesse a la valeur ${interesse.sexe} au lieu d'une des suivantes : ${Object.keys(ESexe)}.`);
        return null;
      case !Object.keys(ENationalite).includes(interesse.nationalite):
        console.error(
          `La nationalité d'un Interesse a la valeur ${interesse.nationalite} au lieu d'une des suivantes : ${Object.keys(ENationalite)}.`
        );
        return null;
    }

    return new Interesse(
      interesse.numeroOrdreSaisi,
      formatNom(interesse.nomFamille),
      interesse.dateNaissance,
      interesse.villeNaissance,
      interesse.paysNaissance,
      interesse.regionNaissance,
      ENationalite[interesse.nationalite],
      ESexe[interesse.sexe],
      interesse.autreNoms?.map<string>(autreNom => formatNom(autreNom, undefined, false)) ?? [],
      interesse.autrePrenoms?.map<string>(autrePrenom => formatPrenom(autrePrenom, undefined, false)) ?? [],
      interesse.prenoms?.map<IPrenom>(prenom => {
        return { numeroOrdre: prenom.numeroOrdre, valeur: formatPrenom(prenom.valeur) };
      }) ?? [],
      interesse.arrondissementNaissance,
      interesse.dateDeces,
      interesse.villeDeces,
      interesse.paysDeces,
      interesse.regionDeces,
      interesse.arrondissementDeces,
      interesse.parents
    );
  };

  public readonly commeSectionContentPropsPourRca = (): SectionContentProps[] => {
    let interesseIno = this.commeSectionContentProps();
    if (this.dateDeces != null) {
      interesseIno = interesseIno.concat([
        {
          libelle: "Date de décès",
          value: this.dateDeces ? DateUtils.getDateStringFromDateCompose(this.dateDeces) : ""
        },
        {
          libelle: "Lieu de décès",
          value: LieuxUtils.getLieu(this.villeDeces, this.regionDeces, this.paysDeces, this.arrondissementDeces)
        }
      ]);
    }

    return interesseIno;
  };

  public readonly commeSectionContentProps = (): SectionContentProps[] => {
    return [
      {
        libelle: "Nom",
        value: <span className="nom">{this.nomFamille ?? ""}</span>
      },
      {
        libelle: "Autre(s) nom(s)",
        value: <span className="nom">{this.autreNoms ? this.autreNoms.join(", ") : ""}</span>
      },
      {
        libelle: "Prénom(s)",
        value: <span className="prenom">{this.prenoms}</span>
      },
      {
        libelle: "Autre(s) prénom(s)",
        value: <span className="prenom">{this.autrePrenoms ? this.autrePrenoms.join(", ") : ""}</span>
      },
      {
        libelle: "Date de naissance",
        value: this.dateNaissance ? DateUtils.getDateStringFromDateCompose(this.dateNaissance) : ""
      },
      {
        libelle: "Lieu de naissance",
        value: LieuxUtils.getLieu(this.villeNaissance, this.regionNaissance, this.paysNaissance, this.arrondissementNaissance)
      },
      {
        libelle: "Nationalité",
        value: this.nationalite !== ENationalite.INCONNUE ? this.nationalite : ""
      },
      {
        libelle: "Sexe",
        value: this.sexe !== ESexe.INCONNU ? this.sexe : ""
      }
    ];
  };

  public get prenoms() {
    return this._prenoms
      ? triListeObjetsSurPropriete([...this._prenoms], "numeroOrdre")
          .map(prenom => prenom.valeur)
          .join(", ")
      : "";
  }
}
