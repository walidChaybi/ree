import DateUtils, { IDateCompose } from "@util/DateUtils";
import { formatNom, getValeurOuVide } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { Evenement, IEvenementDto } from "../acte/IEvenement";
import { AutresNoms, ETypeAutreNom } from "../enum/ETypeAutreNom";
import { Nationalite } from "../enum/Nationalite";
import { NatureActe } from "../enum/NatureActe";
import { Sexe } from "../enum/Sexe";
import { AutreNom, IAutreNomDto, IAutresNoms } from "./AutresNoms";
import { IFamille } from "./IFamille";
import { IFicheLien } from "./IFicheLien";
import { IFicheLienActes } from "./IFicheLienActes";
import { ILieuEvenement } from "./ILieuEvenement";

// TODO: supprimer après le refacto du mapping acte
export interface IPersonne {
  id: string;
  nom: string;
  autresNoms: IAutresNoms[];
  prenoms: string[];
  autresPrenoms: string[];
  lieuNaissance: ILieuEvenement;
  dateNaissance: IDateCompose;
  nationalite: Nationalite;
  dateDeces?: IDateCompose;
  lieuDeces?: ILieuEvenement;
  sexe: Sexe;
  parents: IFamille[];
  enfants: IFamille[];
  actes: IFicheLienActes[];
  pacss: IFicheLien[];
  rcs: IFicheLien[];
  rcas: IFicheLien[];
}

// TODO: supprimer après le refacto du mapping acte
export const PersonneUtils = {
  getNom(personne: IPersonne): string {
    return personne.nom ?? "";
  },

  getAutresNoms(personne: IPersonne): string {
    return personne.autresNoms
      ? personne.autresNoms
          .map(nom => {
            const typeNom = ` (${nom.type.libelle})`;
            return `${nom.nom}${AutresNoms.isAutre(nom.type) ? "" : typeNom}`;
          })
          .join(", ")
      : "";
  },

  getPrenoms(personne: IPersonne): string {
    return personne.prenoms ? personne.prenoms.join(", ") : "";
  },

  getAutresPrenom(personne: IPersonne): string {
    return personne.autresPrenoms ? personne.autresPrenoms.join(", ") : "";
  },

  getLieuNaissance(personne: IPersonne): string {
    return personne.lieuNaissance
      ? LieuxUtils.getLieu(
          personne.lieuNaissance.ville,
          personne.lieuNaissance.region,
          personne.lieuNaissance.pays,
          personne.lieuNaissance.arrondissement
        )
      : "";
  },

  getLieuDeces(personne: IPersonne): string {
    return personne.lieuDeces
      ? LieuxUtils.getLieu(personne.lieuDeces.ville, personne.lieuDeces.region, personne.lieuDeces.pays, personne.lieuDeces.arrondissement)
      : "";
  },

  getDateNaissance(personne: IPersonne): string {
    return personne.dateNaissance ? DateUtils.getDateStringFromDateCompose(personne.dateNaissance) : "";
  },

  getDateDeces(personne: IPersonne): string {
    return personne.dateDeces ? DateUtils.getDateStringFromDateCompose(personne.dateDeces) : "";
  },

  getNationalite(personne: IPersonne): string {
    return getValeurOuVide(personne.nationalite?.libelle);
  },

  getSexe(personne: IPersonne): string {
    return personne.sexe?.libelle;
  },

  getParents(personne: IPersonne): IFamille[] {
    return personne.parents;
  },

  getEnfants(personne: IPersonne): IFamille[] {
    return personne.enfants;
  },

  getActes(personne: IPersonne): IFicheLienActes[] {
    return personne.actes;
  },

  getPacss(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.pacss;
  },

  getRcs(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.rcs;
  },

  getRcas(personne: IPersonne, numeroFiche?: string): IFicheLien[] {
    return personne.rcas;
  }
};

export interface IPersonneDTO {
  id: string;
  nom: string;
  autresNoms: IAutreNomDto[];
  prenoms: string[];
  autresPrenoms: string[];
  nationalite: string;
  sexe: string;
  parents: IFamille[];
  enfants: IFamille[];
  actes: IFicheLienActes[];
  pacss: IFicheLien[];
  rcs: IFicheLien[];
  rcas: IFicheLien[];
  naissance: IEvenementDto;
  deces?: IEvenementDto;
}

export class Personne {
  private static readonly champsObligatoires: (keyof IPersonneDTO)[] = ["id", "nom", "nationalite", "sexe", "naissance"];

  private _autresNoms: AutreNom[];
  private _prenoms: string[];
  private _autresPrenoms: string[];
  private _lieuNaissance: ILieuEvenement;
  private _dateNaissance: IDateCompose;
  private _lieuDeces?: ILieuEvenement;
  private _dateDeces?: IDateCompose;

  private constructor(
    public readonly id: string,
    public readonly nom: string,
    autresNoms: AutreNom[],
    prenoms: string[],
    autresPrenoms: string[],
    public readonly nationalite: Nationalite,
    public readonly sexe: Sexe,
    public readonly parents: IFamille[],
    public readonly enfants: IFamille[],
    public readonly actes: IFicheLienActes[],
    public readonly pacss: IFicheLien[],
    public readonly rcs: IFicheLien[],
    public readonly rcas: IFicheLien[],
    lieuNaissance: ILieuEvenement,
    dateNaissance: IDateCompose,
    lieuDeces?: ILieuEvenement,
    dateDeces?: IDateCompose
  ) {
    this._autresNoms = autresNoms;
    this._prenoms = prenoms;
    this._autresPrenoms = autresPrenoms;
    this._lieuNaissance = lieuNaissance;
    this._dateNaissance = dateNaissance;
    this._lieuDeces = lieuDeces;
    this._dateDeces = dateDeces;
  }

  public static readonly depuisDto = (personne: IPersonneDTO, numero: string): Personne | null => {
    switch (true) {
      case Personne.champsObligatoires.some(cle => personne[cle] === undefined):
        console.error(`Un champ obligatoire d'un Personne n'est pas défini.`);
        return null;
      case !Object(Sexe).hasOwnProperty(personne.sexe):
        console.error(`Le sexe d'un Personne a la valeur interdite : ${personne.sexe}.`);
        return null;
      case !Object(Nationalite).hasOwnProperty(personne.nationalite):
        console.error(`La nationalité d'un Personne a la valeur interdite : ${personne.nationalite}.`);
        return null;
    }

    return new Personne(
      personne.id,
      formatNom(personne.nom),
      personne.autresNoms
        .map<AutreNom | null>(AutreNom.depuisDto)
        .filter((autreNom: AutreNom | null): autreNom is AutreNom => autreNom !== null),
      personne.prenoms,
      personne.autresPrenoms,
      Nationalite.getEnumFor(personne.nationalite),
      Sexe.getEnumFor(personne.sexe),
      personne.parents,
      personne.enfants,
      personne.actes
        ?.filter((acte: any) => acte.numero !== numero)
        .map((acte: any) => {
          return {
            ...acte,
            nature: NatureActe.getEnumFor(acte.nature)
          };
        }),
      personne.pacss.filter((pacs: IFicheLien) => pacs.numero !== numero),
      personne.rcs.filter((rc: IFicheLien) => rc.numero !== numero),
      personne.rcas.filter((rca: IFicheLien) => rca.numero !== numero),
      Evenement.getLieuEvenement(personne.naissance),
      Evenement.getDateCompose(personne.naissance),
      personne.deces && Evenement.getLieuEvenement(personne.deces),
      personne.deces && Evenement.getDateCompose(personne.deces)
    );
  };

  get autresNoms(): string {
    return this._autresNoms
      ? this._autresNoms
          .map(autreNom => {
            const typeNom = ` (${autreNom.type})`;
            return `${autreNom.nom}${autreNom.type === ETypeAutreNom.AUTRE ? "" : typeNom}`;
          })
          .join(", ")
      : "";
  }

  get prenoms(): string {
    return this._prenoms.join(", ");
  }

  get autresPrenoms(): string {
    return this._autresPrenoms.join(", ");
  }

  get lieuNaissance(): string {
    return LieuxUtils.getLieu(
      this._lieuNaissance.ville,
      this._lieuNaissance.region,
      this._lieuNaissance.pays,
      this._lieuNaissance.arrondissement
    );
  }

  get lieuDeces(): string {
    return this._lieuDeces
      ? LieuxUtils.getLieu(this._lieuDeces.ville, this._lieuDeces.region, this._lieuDeces.pays, this._lieuDeces.arrondissement)
      : "";
  }

  get dateNaissance(): string {
    return DateUtils.getDateStringFromDateCompose(this._dateNaissance);
  }

  get dateDeces(): string {
    return this._dateDeces ? DateUtils.getDateStringFromDateCompose(this._dateDeces) : "";
  }
}
