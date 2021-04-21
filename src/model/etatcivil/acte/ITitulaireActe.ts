import { IEvenement } from "./IEvenement";
import { IAdresse } from "./IAdresse";
import { IFiliation } from "./IFiliation";

import {
  formatNom,
  formatPrenom,
  numberToString
} from "../../../views/common/util/Utils";
import { getDateStringFromDateCompose } from "../../../views/common/util/DateUtils";
import { LieuxUtils } from "../../LieuxUtils";
import { Sexe } from "../enum/Sexe";

export interface ITitulaireActe {
  nom?: string;
  ordre: number;
  prenoms?: string[];
  sexe?: string;
  naissance?: IEvenement;
  age?: number;
  profession?: string;
  domicile?: IAdresse;
  filiations?: IFiliation[];
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
  getDateNaissance(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.naissance
      ? getDateStringFromDateCompose({
          jour: numberToString(titulaire.naissance.jour),
          mois: numberToString(titulaire.naissance.mois),
          annee: numberToString(titulaire.naissance.annee)
        })
      : "";
  },
  getSexe(titulaire?: ITitulaireActe): string {
    return titulaire && titulaire.sexe
      ? Sexe.getEnumFor(titulaire.sexe).libelle
      : "";
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
  }
};
