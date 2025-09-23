import { champsObligatoiresDuDtoAbsents, nettoyerAttributsDto, valeurDtoAbsenteDansEnum } from "@model/commun/dtoUtils";
import { TDateArrayDTO } from "@util/DateUtils";
import { DEUX, triListeObjetsSurPropriete } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import DateRECE from "../../../utils/DateRECE";
import ETypeDeclarationConjointe from "../enum/ETypeDeclarationConjointe";
import { ESexe } from "../enum/Sexe";
import { Filiation, IFiliationDto } from "./Filiation";
import { IAdresse } from "./IAdresse";
import { IEvenementDto } from "./IEvenement";

export interface ITitulaireActeDto {
  nom?: string;
  ordre: number;
  prenoms: string[];
  sexe: keyof typeof ESexe;
  naissance?: IEvenementDto;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
  filiations: IFiliationDto[];
  nomPartie1?: string;
  nomPartie2?: string;
  nomAvantMariage?: string;
  nomApresMariage?: string;
  nomDernierConjoint?: string;
  prenomsDernierConjoint?: string;
  typeDeclarationConjointe?: keyof typeof ETypeDeclarationConjointe;
  dateDeclarationConjointe?: TDateArrayDTO;
  origineDeclarationConjointeTitulaireActe?: boolean;
  origineNomPartiesTitulaireActe?: boolean;
  identiteAvantDecret?: string;
}

export class TitulaireActe {
  private static readonly champsObligatoires: (keyof ITitulaireActeDto)[] = ["ordre", "prenoms", "sexe", "filiations"];

  private constructor(
    public readonly nom: string,
    public readonly ordre: number,
    public readonly prenoms: string[],
    private _sexe: keyof typeof ESexe,
    private _naissance: IEvenementDto | null,
    private _age: number | null,
    public readonly profession: string | null,
    public readonly domicile: IAdresse | null,
    private _filiations: Filiation[],
    private _nomPartie1: string | null,
    private _nomPartie2: string | null,
    public readonly nomAvantMariage: string | null,
    public readonly nomApresMariage: string | null,
    public readonly nomDernierConjoint: string | null,
    public readonly prenomsDernierConjoint: string | null,
    private _typeDeclarationConjointe: keyof typeof ETypeDeclarationConjointe | null,
    private _dateDeclarationConjointe: DateRECE | null,
    private _origineDeclarationConjointeTitulaireActe: boolean | null,
    private _origineNomPartiesTitulaireActe: boolean | null,
    public readonly identiteAvantDecret: string | null
  ) {}

  public static readonly depuisDto = (titulaire: ITitulaireActeDto): TitulaireActe | null => {
    switch (true) {
      case champsObligatoiresDuDtoAbsents("ITitulaireActeDto", titulaire, this.champsObligatoires):
      case valeurDtoAbsenteDansEnum("ITitulaireActeDto", titulaire, "sexe", ESexe):
      case titulaire.typeDeclarationConjointe &&
        valeurDtoAbsenteDansEnum("ITitulaireActeDto", titulaire, "typeDeclarationConjointe", ETypeDeclarationConjointe):
        return null;
    }

    return new TitulaireActe(
      titulaire.nom ?? "",
      titulaire.ordre,
      titulaire.prenoms,
      titulaire.sexe,
      titulaire.naissance ?? null,
      titulaire.age ?? null,
      titulaire.profession ?? null,
      titulaire.domicile ?? null,
      triListeObjetsSurPropriete(
        titulaire.filiations.map(Filiation.depuisDto).filter((filiation): filiation is Filiation => filiation !== null),
        "ordre"
      ),
      titulaire.nomPartie1 ?? null,
      titulaire.nomPartie2 ?? null,
      titulaire.nomAvantMariage ?? null,
      titulaire.nomApresMariage ?? null,
      titulaire.nomDernierConjoint ?? null,
      titulaire.prenomsDernierConjoint ?? null,
      titulaire.typeDeclarationConjointe ?? null,
      titulaire.dateDeclarationConjointe ? DateRECE.depuisDateArrayDTO(titulaire.dateDeclarationConjointe) : null,
      titulaire.origineDeclarationConjointeTitulaireActe ?? null,
      titulaire.origineNomPartiesTitulaireActe ?? null,
      titulaire.identiteAvantDecret ?? null
    );
  };

  public readonly versDto = (): ITitulaireActeDto =>
    nettoyerAttributsDto<ITitulaireActeDto>({
      nom: this.nom ?? undefined,
      ordre: this.ordre,
      prenoms: this.prenoms,
      sexe: this.sexe,
      naissance: this.naissance ?? undefined,
      age: this.age ?? undefined,
      profession: this.profession ?? undefined,
      domicile: this.domicile ?? undefined,
      filiations: triListeObjetsSurPropriete(
        this.filiations.map(filiation => filiation.versDto()),
        "ordre"
      ),
      nomPartie1: this.nomPartie1 ?? undefined,
      nomPartie2: this.nomPartie2 ?? undefined,
      nomAvantMariage: this.nomAvantMariage ?? undefined,
      nomApresMariage: this.nomApresMariage ?? undefined,
      nomDernierConjoint: this.nomDernierConjoint ?? undefined,
      prenomsDernierConjoint: this.prenomsDernierConjoint ?? undefined,
      typeDeclarationConjointe: this.typeDeclarationConjointe ?? undefined,
      dateDeclarationConjointe: this.dateDeclarationConjointe?.versDateArrayDTO() ?? undefined,
      origineDeclarationConjointeTitulaireActe: this.origineDeclarationConjointeTitulaireActe ?? undefined,
      origineNomPartiesTitulaireActe: this.origineNomPartiesTitulaireActe ?? undefined,
      identiteAvantDecret: this.identiteAvantDecret ?? undefined
    });

  public get origineDeclarationConjointeTitulaireActe(): boolean | null {
    return this._origineDeclarationConjointeTitulaireActe;
  }
  protected set origineDeclarationConjointeTitulaireActe(origineTitulaireActe: boolean | null) {
    this._origineDeclarationConjointeTitulaireActe = origineTitulaireActe;
  }
  public get dateDeclarationConjointe(): DateRECE | null {
    return this._dateDeclarationConjointe;
  }
  protected set dateDeclarationConjointe(value: DateRECE | null) {
    this._dateDeclarationConjointe = value;
  }
  public get typeDeclarationConjointe(): keyof typeof ETypeDeclarationConjointe | null {
    return this._typeDeclarationConjointe;
  }
  protected set typeDeclarationConjointe(value: keyof typeof ETypeDeclarationConjointe | null) {
    this._typeDeclarationConjointe = value;
  }
  public get origineNomPartiesTitulaireActe(): boolean | null {
    return this._origineNomPartiesTitulaireActe;
  }
  protected set origineNomPartiesTitulaireActe(value: boolean | null) {
    this._origineNomPartiesTitulaireActe = value;
  }
  public get nomPartie2(): string | null {
    return this._nomPartie2;
  }
  protected set nomPartie2(value: string | null) {
    this._nomPartie2 = value;
  }
  public get nomPartie1(): string | null {
    return this._nomPartie1;
  }
  protected set nomPartie1(value: string | null) {
    this._nomPartie1 = value;
  }
  public get filiations(): Filiation[] {
    return this._filiations;
  }
  protected set filiations(value: Filiation[]) {
    this._filiations = value;
  }
  public get age(): number | null {
    return this._age;
  }
  protected set age(value: number | null) {
    this._age = value;
  }
  public get naissance(): IEvenementDto | null {
    return this._naissance;
  }
  protected set naissance(value: IEvenementDto | null) {
    this._naissance = value;
  }
  public get sexe(): keyof typeof ESexe {
    return this._sexe;
  }
  protected set sexe(value: keyof typeof ESexe) {
    this._sexe = value;
  }

  public readonly getLieuDeRepriseOuLieuNaissance = (paysInconnu = false): string => {
    if (this.naissance?.lieuReprise) {
      return this.naissance.lieuReprise;
    } else if (paysInconnu) {
      return LieuxUtils.getLocalisationEtrangerOuFrance(this.naissance?.ville, this.naissance?.region, "", this.naissance?.arrondissement);
    } else {
      return LieuxUtils.getLocalisationEtrangerOuFranceParDefaut(
        this.naissance?.ville,
        this.naissance?.region,
        this.naissance?.pays,
        this.naissance?.arrondissement
      );
    }
  };

  /** Mise à jour des informations de "déclaration conjointe" à partir du titulaire de l'acte si besoin */
  public readonly majDeclarationConjointe = (titulaireActe: TitulaireActe) => {
    if (this.typeDeclarationConjointe === "ABSENCE_DECLARATION_VALIDEE") {
      this.dateDeclarationConjointe = null;
      // Remarque on ne change pas le type ABSENCE_DECLARATION_VALIDEE en ABSENCE_DECLARATION car ils ont tous les deux le même libellé
    } else if (!this.typeDeclarationConjointe || this.typeDeclarationConjointe === "ABSENCE_DECLARATION") {
      this.typeDeclarationConjointe = titulaireActe.typeDeclarationConjointe;
      this.dateDeclarationConjointe = titulaireActe.dateDeclarationConjointe;
      this.origineDeclarationConjointeTitulaireActe = true;
    }
  };

  /** Mise à jour des informations de "nom sécable" à partir du titulaire de l'acte si besoin */
  public readonly majNomSecable = (titulaireActe: TitulaireActe) => {
    // Si titulaireAM.nomPartie1 est égal à "ABSENCE_VALIDEE" alors il reste à "ABSENCE_VALIDEE" (c'est le code par la suite qui gère cette valeur)
    if (this && !this.nomPartie1 && titulaireActe) {
      this.origineNomPartiesTitulaireActe = true;

      this.nomPartie1 = titulaireActe.nomPartie1;
      this.nomPartie2 = titulaireActe.nomPartie2;
    }
  };

  public readonly majSexeAgeNaissanceEtFiliation = (titulaireActe: TitulaireActe) => {
    this.sexe = titulaireActe.sexe;
    this.filiations = titulaireActe.filiations;
    this.age = titulaireActe.age;
    this.naissance = titulaireActe.naissance;
  };

  public readonly parentsSontDeMemeSexe = (): boolean => {
    const parents = this.filiations.filter(filiation => filiation.lienParente === "PARENT");

    if (parents.length >= DEUX) {
      return parents.every(parent => parent.sexe === parents[0].sexe);
    }

    return false;
  };

  public readonly aParentDeSexeIndetermine = (): boolean =>
    this.filiations.filter(filiation => filiation.lienParente === "PARENT").some(parent => parent.sexe === "INDETERMINE");

  public readonly aParentDeSexeInconnu = (): boolean =>
    this.filiations.filter(filiation => filiation.lienParente === "PARENT").some(parent => parent.sexe === "INCONNU");

  public readonly getDateNaissance = (): string => (this?.naissance ? DateRECE.depuisObjetDate(this.naissance).format("JJ/MM/AAAA") : "");

  /* Renvoit les parents directs:
    - soit [{},{}]
    - soit [p1, {}]
    - soit [p1, p2]
  */
  /**@deprecated Refactorer les parties du code qui reposent sur ce fonctionnement */
  public readonly getAuMoinsDeuxParentsDirects = (): (Filiation | {})[] => {
    const parents = this.filiations.filter(filiation => filiation.lienParente === "PARENT");

    if (parents.length === 0) {
      return [{}, {}];
    } else if (parents.length === 1) {
      return [parents[0], {}];
    }
    return parents;
  };
}
