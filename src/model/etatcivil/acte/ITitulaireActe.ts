import { IEvenement } from "./IEvenement";
import { IAdresse } from "./IAdresse";
import { IFiliation } from "./IFiliation";
import { Sexe } from "../Sexe";
import { formatNom, formatPrenom } from "../../../views/common/util/Utils";
import { getDateStringFromDateCompose } from "../../../views/common/util/DateUtils";
import { SexeUtil } from "../enum/Sexe";
import { LieuxUtils } from "../../Lieux";

export interface ITitulaireActe {
  nom?: string;
  ordre: number;
  prenoms?: string[];
  sexe?: Sexe;
  naissance?: IEvenement;
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
          jour: titulaire.naissance.jour.toString(),
          mois: titulaire.naissance.mois.toString(),
          annee: titulaire.naissance.annee.toString()
        })
      : "";
  },
  getSexe(titulaire?: ITitulaireActe): string {
    return titulaire ? SexeUtil.getLibelle(titulaire.sexe) : "";
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
