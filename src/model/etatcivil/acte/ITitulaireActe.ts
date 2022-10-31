import { getDateStringFromDateCompose } from "@util/DateUtils";
import {
  formatNom,
  formatPrenom,
  mapPrenomsVersPrenomsOrdonnes,
  numberToString,
  SNP,
  SPC
} from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IPrenomOrdonnes } from "../../requete/IPrenomOrdonnes";
import { LienParente } from "../enum/LienParente";
import { Sexe } from "../enum/Sexe";
import { TypeDeclarationConjointe } from "../enum/TypeDeclarationConjointe";
import { IAdresse } from "./IAdresse";
import { IEvenement } from "./IEvenement";
import { IFiliation } from "./IFiliation";

export interface ITitulaireActe {
  nom?: string;
  ordre: number;
  prenoms?: string[];
  sexe?: Sexe;
  naissance?: IEvenement;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
  filiations?: IFiliation[];
  nomPartie1?: string;
  nomPartie2?: string;
  nomAvantMariage?: string;
  nomApresMariage?: string;
  nomDernierConjoint?: string;
  prenomsDernierConjoint?: string;
  typeDeclarationConjointe?: TypeDeclarationConjointe; // concerne les titulaires de l'analyse marginale
  dateDeclarationConjointe?: Date; // concerne les titulaires de l'analyse marginale
  origineDeclarationConjointeTitulaireActe?: boolean;
  origineNomPartiesTitulaireActe?: boolean;
}

export const TitulaireActe = {
  getNom(titulaire?: ITitulaireActe): string {
    return titulaire ? formatNom(titulaire.nom) : "";
  },
  getPrenom(numero: number, titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.prenoms
      ? formatPrenom(titulaire.prenoms[numero])
      : "";
  },
  getPrenom1(titulaire?: ITitulaireActe): string {
    return this.getPrenom(0, titulaire);
  },
  getPrenom2(titulaire?: ITitulaireActe): string {
    return this.getPrenom(1, titulaire);
  },
  getPrenom3(titulaire?: ITitulaireActe): string {
    const deux = 2;
    return this.getPrenom(deux, titulaire);
  },
  getPrenoms(titulaire?: ITitulaireActe): string {
    return `${this.getPrenom1(titulaire)}${
      this.getPrenom2(titulaire) ? " " : ""
    }${this.getPrenom2(titulaire)}${
      this.getPrenom3(titulaire) ? " " : ""
    }${this.getPrenom3(titulaire)}`;
  },
  getPrenomsSeparerPar(
    titulaire: ITitulaireActe,
    separateur: string = ","
  ): string {
    let prenom = "";
    if (titulaire.prenoms?.length) {
      prenom = titulaire.prenoms?.join(`${separateur} `);
    }

    return prenom;
  },
  getDateNaissance(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.naissance
      ? getDateStringFromDateCompose({
          jour: numberToString(titulaire.naissance.jour),
          mois: numberToString(titulaire.naissance.mois),
          annee: numberToString(titulaire.naissance.annee)
        })
      : "";
  },
  getSexeOuVide(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.sexe ? titulaire.sexe.libelle : "";
  },
  getSexeOuInconnu(titulaire?: ITitulaireActe | IFiliation): Sexe {
    return titulaire && titulaire.sexe ? titulaire.sexe : Sexe.INCONNU;
  },
  getLieuNaissance(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.naissance
      ? LieuxUtils.getLieu(
          titulaire.naissance.ville,
          titulaire.naissance.region,
          titulaire.naissance.pays,
          titulaire.naissance.arrondissement
        )
      : "";
  },

  getLieuDeRepriseOuLieuNaissance(titulaire?: ITitulaireActe): string {
    if (titulaire && titulaire?.naissance?.lieuReprise) {
      return titulaire.naissance.lieuReprise;
    } else {
      return LieuxUtils.getLocalisationEtrangerOuFranceParDefaut(
        titulaire?.naissance?.ville,
        titulaire?.naissance?.region,
        titulaire?.naissance?.pays,
        titulaire?.naissance?.arrondissement
      );
    }
  },
  getParentsDirects(titulaire?: ITitulaireActe): IFiliation[] {
    return this.getParents(
      (filiation: IFiliation) => filiation.lienParente === LienParente.PARENT,
      titulaire
    );
  },

  getParentDirectMasculin(titulaire?: ITitulaireActe): IFiliation | undefined {
    const parents = TitulaireActe.getParentsDirects(titulaire);

    return parents.find(parent => parent.sexe === Sexe.MASCULIN);
  },

  getParentDirectFeminin(titulaire?: ITitulaireActe): IFiliation | undefined {
    const parents = TitulaireActe.getParentsDirects(titulaire);

    return parents.find(parent => parent.sexe === Sexe.FEMININ);
  },

  getTousLesParents(titulaire?: ITitulaireActe): IFiliation[] {
    return this.getParents(
      (filiation: IFiliation) =>
        [
          LienParente.PARENT,
          LienParente.PARENT_ADOPTANT,
          LienParente.ADOPTANT_CONJOINT_DU_PARENT
        ].includes(filiation.lienParente),

      titulaire
    );
  },
  getParentAdoptantsDansLOrdre(titulaire?: ITitulaireActe): IFiliation[] {
    let parentsAdoptants: IFiliation[] = [];
    if (titulaire?.filiations) {
      parentsAdoptants = titulaire.filiations
        .filter(
          filiation => filiation.lienParente === LienParente.PARENT_ADOPTANT
        )
        .sort(
          (parent1: IFiliation, parent2: IFiliation) =>
            parent1.ordre - parent2.ordre
        );
    }
    return parentsAdoptants;
  },

  getParentAdoptant1(titulaire?: ITitulaireActe): IFiliation | undefined {
    return this.getParentAdoptantsDansLOrdre(titulaire)[0];
  },

  ilExisteUnParentAdoptant(titulaire?: ITitulaireActe): boolean {
    return titulaire?.filiations
      ? titulaire.filiations.find(
          filiation => filiation.lienParente === LienParente.PARENT_ADOPTANT
        ) != null
      : false;
  },

  getParents(
    filtre: (filiation: IFiliation) => boolean,
    titulaire?: ITitulaireActe
  ): IFiliation[] {
    return titulaire && titulaire.filiations
      ? titulaire.filiations
          .filter(filiation => filtre(filiation))
          .sort((a, b) => a.ordre - b.ordre)
      : [];
  },

  /* Renvoit les parents directs:
    - soit [{},{}]
    - soit [p1, {}]
    - soit [p1, p2]
  */
  getAuMoinsDeuxParentsDirects(titulaire?: ITitulaireActe): IFiliation[] {
    let parents = this.getParentsDirects(titulaire);
    if (parents.length === 0) {
      parents = [{} as IFiliation, {} as IFiliation];
    } else if (parents.length === 1) {
      parents = [parents[0], {} as IFiliation];
    }
    return parents;
  },

  /* Renvoit les parents adoptants:
    - soit []
    - soit [p1, {}]
    - soit [p1, p2]
  */
  getDeuxParentsAdoptantsOuVide(titulaire?: ITitulaireActe): IFiliation[] {
    let parentsAdoptants = this.getParentAdoptantsDansLOrdre(titulaire);
    if (parentsAdoptants.length === 1) {
      parentsAdoptants = [parentsAdoptants[0], {} as IFiliation];
    }
    return parentsAdoptants;
  },

  getDeuxParentsAdoptantsVides(): IFiliation[] {
    return [{} as IFiliation, {} as IFiliation];
  },

  mapPrenomsVersPrenomsOrdonnes(titulaire?: ITitulaireActe): IPrenomOrdonnes[] {
    return mapPrenomsVersPrenomsOrdonnes(titulaire?.prenoms);
  },

  genreIndetermineOuParentDeMemeSexe(titulaire: ITitulaireActe) {
    return (
      titulaire.sexe === Sexe.INDETERMINE ||
      TitulaireActe.parentsSontDeMemeSexe(titulaire) ||
      TitulaireActe.getParentsDirects(titulaire).some(
        el => el.sexe === Sexe.INDETERMINE
      )
    );
  },

  parentsSontDeMemeSexe(titulaire: ITitulaireActe) {
    const parents = TitulaireActe.getParentsDirects(titulaire);
    if (parents?.length) {
      const sexe = parents[0].sexe;
      return parents.every(el => el.sexe === sexe);
    } else {
      return false;
    }
  },

  aDonneesLieuOuAnneeNaissanceAbsentes(titulaire: ITitulaireActe) {
    return (
      !titulaire.naissance?.annee ||
      (!titulaire.naissance?.lieuReprise &&
        !titulaire.naissance?.ville &&
        !titulaire.naissance?.region &&
        !titulaire.naissance?.pays)
    );
  },
  nomAbsentOuNomEgalSNP(titulaire: ITitulaireActe): boolean {
    return !titulaire.nom || titulaire.nom === SNP;
  },
  prenomAbsentOuNomEgalSPC(titulaire: ITitulaireActe): boolean {
    return titulaire.prenoms?.length === 0 || titulaire.prenoms?.[0] === SPC;
  }
};
