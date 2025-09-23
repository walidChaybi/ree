import { champsObligatoiresDuDtoAbsents, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import DateUtils, { IDateCompose } from "@util/DateUtils";
import { formatNom } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { Evenement, IEvenementDto } from "../acte/IEvenement";
import { ETypeAutreNom } from "../enum/ETypeAutreNom";
import { ENationalite, Nationalite } from "../enum/Nationalite";
import { ESexe, Sexe } from "../enum/Sexe";
import { AutreNom, IAutreNomDto, IAutresNoms } from "./AutresNoms";
import { IFamille } from "./IFamille";
import { IFicheLien } from "./IFicheLien";
import { IFicheLienActes } from "./IFicheLienActes";
import { ILieuEvenement } from "./ILieuEvenement";

// TODO: supprimer après le refacto du projet acte établi
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

export interface IPersonneDTO {
  id: string;
  nom: string;
  autresNoms: IAutreNomDto[];
  prenoms: string[];
  autresPrenoms: string[];
  nationalite: keyof typeof ENationalite;
  sexe: keyof typeof ESexe;
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

  private readonly _autresNoms: AutreNom[];
  private readonly _prenoms: string[];
  private readonly _autresPrenoms: string[];
  private readonly _lieuNaissance: ILieuEvenement;
  private readonly _dateNaissance: IDateCompose;
  private readonly _lieuDeces?: ILieuEvenement;
  private readonly _dateDeces?: IDateCompose;

  private constructor(
    public readonly id: string,
    public readonly nom: string,
    autresNoms: AutreNom[],
    prenoms: string[],
    autresPrenoms: string[],
    public readonly nationalite: keyof typeof ENationalite,
    public readonly sexe: keyof typeof ESexe,
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
      case champsObligatoiresDuDtoAbsents("IPersonneDTO", personne, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("IPersonneDTO", personne, "sexe", ESexe):
      case valeurDtoAbsenteDansEnum("IPersonneDTO", personne, "nationalite", ENationalite):
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
      personne.nationalite,
      personne.sexe,
      personne.parents,
      personne.enfants,
      personne.actes?.filter(acte => acte.numero !== numero),
      personne.pacss.filter(pacs => pacs.numero !== numero),
      personne.rcs.filter(rc => rc.numero !== numero),
      personne.rcas.filter(rca => rca.numero !== numero),
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
