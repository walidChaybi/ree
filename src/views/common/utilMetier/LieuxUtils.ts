import { Evenement, IEvenement } from "@model/etatcivil/acte/IEvenement";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { Option, Options } from "@util/Type";
import {
  NEUF,
  SEIZE,
  VINGT,
  chainesEgalesIgnoreCasseEtAccent,
  estRenseigne,
  formatLigne,
  getValeurOuVide,
  supprimerZerosAGauche
} from "@util/Utils";

export const FRANCE = "FRANCE";
const France = "France";
const PARIS = "PARIS";
const MARSEILLE = "MARSEILLE";
const LYON = "LYON";
const villesMarseilleLyonParis = [MARSEILLE, LYON, PARIS];
const villesMarseilleLyon = [MARSEILLE, LYON];
const JERUSALEM = "JERUSALEM";
const INCONNU = "INCONNU";

export class LieuxUtils {
  public static estVilleFranceAvecArrondissement(
    pays?: string,
    ville?: string
  ): boolean {
    return (
      LieuxUtils.estPaysFrance(pays) &&
      LieuxUtils.estVilleMarseilleLyonParis(ville)
    );
  }

  public static estVilleAvecArrondissement(ville?: string): boolean {
    return LieuxUtils.estVilleMarseilleLyonParis(ville);
  }

  public static estPaysFrance(pays?: string): boolean {
    return pays != null && pays.toUpperCase() === FRANCE;
  }

  public static estPaysInconnu(pays?: string): boolean {
    return !pays || pays.toUpperCase() === INCONNU;
  }

  public static estPaysEtranger(pays?: string): boolean {
    return !this.estPaysFrance(pays) && !this.estPaysInconnu(pays);
  }

  public static estVilleParis(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === PARIS;
  }

  public static estVilleMarseille(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === MARSEILLE;
  }

  public static estVilleLyon(ville?: string): boolean {
    return ville != null && ville.toUpperCase() === LYON;
  }

  public static estVilleMarseilleLyonParis(ville?: string): boolean {
    return (
      ville != null && villesMarseilleLyonParis.includes(ville.toUpperCase())
    );
  }

  public static estVilleMarseilleLyon(ville?: string): boolean {
    return ville != null && villesMarseilleLyon.includes(ville.toUpperCase());
  }

  public static getDepartement(ville?: string, departement?: string): string {
    // Quand la ville vaut "Paris" le champ "Département" est vide
    return LieuxUtils.estVilleParis(ville) ? "" : getValeurOuVide(departement);
  }

  public static getArrondissement(ville?: string, arrondissement?: string) {
    // Le champ "Arrondissement" s'affiche quand la ville vaut Lyon, Marseille ou Paris.
    return LieuxUtils.estVilleMarseilleLyonParis(ville)
      ? getValeurOuVide(arrondissement)
      : "";
  }

  public static getRegionDepartement(
    ville?: string,
    departement?: string,
    numero?: string,
    region?: string
  ): string {
    let res = "";
    // Le champ "Région/dpt" vaut le libellé du département et le numéro entre parenthèses (si connu)
    // Quand la ville vaut "Paris" le champ "Département" est vide
    if (!this.estVilleParis(ville)) {
      if (departement) {
        res = departement;
      }

      if (numero) {
        res = res ? res + ` (${numero})` : numero;
      }

      if (!res) {
        res = getValeurOuVide(region);
      }
    }
    return res;
  }

  /**
   * Quand le pays naissance vaut "France" et quand la ville naissance est différente de "Lyon,Marseille et Paris":
   *  le lieu de naissance est composé de la ville naissance suivi de la région naissance entre parenthèses.
   *  Ex: Lille (Nord)
   * Quand le pays naissance vaut "France", et la ville naissance est parmi "Lyon,Marseille":
   *  le lieu de naissance est composé de la ville naissance suivie de l'arrondissement naissance puis de la région naissance entre parenthèses.
   *  Ex: Lyon Arrdt08 (Rhône)
   * Quand le pays naissance vaut "France", et la ville naissance est "Paris":
   *  le lieu de naissance est composé de la ville naissance suivie de l'arrondissement naissance .
   *  Ex:	Paris Arrdt14
   * Quand le pays naissance est différent de "France":
   *  le lieu de naissance est composé de la ville naissance - région naissance suivie du pays naissance entre parenthèses.
   *  Ex:	San remo (Italie) ou Atlantis - Floride (Etats-unis)
   */
  public static getLieu(
    ville?: string,
    region?: string,
    pays?: string,
    arrondissement?: string
  ): string {
    const villeString = getValeurOuVide(ville);
    const regionString = getValeurOuVide(region);
    const paysString = getValeurOuVide(pays);
    const arrondissementString = getValeurOuVide(
      arrondissement && this.formateArrondissement(arrondissement, true)
    );

    if (
      LieuxUtils.estPaysFrance(pays) ||
      this.estVilleJerusalem(ville) ||
      !pays
    ) {
      return this.getLieuModeFrance(
        villeString,
        regionString,
        arrondissementString
      );
    } else {
      return LieuxUtils.formatAdresseEtrangere(
        paysString,
        regionString,
        villeString
      );
    }
  }

  public static getLieuModeFrance(
    ville?: string,
    region?: string,
    arrondissement?: string
  ) {
    const arrondissementFormate =
      LieuxUtils.estVilleAvecArrondissement(ville) && arrondissement;
    const regionFormate =
      !LieuxUtils.estVilleParis(ville) && region && `(${region})`;

    const villeArrondissement = formatLigne(
      [ville, arrondissementFormate],
      " "
    );
    return getValeurOuVide(
      formatLigne(
        [
          villeArrondissement,
          !villeArrondissement && regionFormate && `--`,
          regionFormate
        ],
        " "
      )
    );
  }

  public static getLieuExtraitCopie(
    ville?: string,
    region?: string,
    pays?: string,
    arrondissement?: string,
    formateElements = true
  ): string {
    const { paysString, regionString, villeString } =
      LieuxUtils.getVilleRegionPays(formateElements, ville, region, pays);
    const arrondissementString = arrondissement ? ` ${arrondissement}` : "";

    if (!ville && !region && !pays) {
      return "";
    } else if (!ville && !region) {
      return `-- (${paysString})`;
    } else if (!ville) {
      return `${regionString} (${paysString})`;
    } else if (!pays) {
      return `${villeString}${arrondissementString}, ${regionString}`;
    } else if (!region) {
      return `${villeString}${arrondissementString} (${paysString})`;
    }
    return `${villeString}${arrondissementString}, ${regionString} (${paysString})`;
  }

  private static getVilleRegionPays(
    formateElements: boolean,
    ville?: string,
    region?: string,
    pays?: string
  ) {
    const villeString = getValeurOuVide(ville);
    const regionString = getValeurOuVide(region);
    const paysString = getValeurOuVide(pays);
    return { paysString, regionString, villeString };
  }

  public static getVillePays(ville?: string, pays?: string) {
    return `${getValeurOuVide(ville)}${this.getLieuEntreParentheses(pays)}`;
  }

  private static getLieuEntreParentheses(lieu?: string) {
    return lieu ? ` (${lieu})` : "";
  }

  public static getLocalisationAutorite(
    ville?: string,
    libelleDepartement?: string,
    region?: string,
    pays?: string,
    arrondissement?: string
  ): string {
    const villeString = getValeurOuVide(ville);
    const libelleDepartementString = LieuxUtils.getLieuEntreParentheses(
      getValeurOuVide(libelleDepartement)
    );
    const regionString = getValeurOuVide(region);
    const paysString = getValeurOuVide(pays);

    if (LieuxUtils.estPaysFrance(pays)) {
      if (
        !LieuxUtils.estVilleAvecArrondissement(ville) ||
        arrondissement == null
      ) {
        if (!ville) {
          return `--${libelleDepartementString}`;
        } else {
          return `${villeString}${libelleDepartementString}`;
        }
      } else if (!LieuxUtils.estVilleParis(villeString)) {
        return `${villeString} ${LieuxUtils.formateArrondissement(
          arrondissement,
          true
        )}${libelleDepartementString}`;
      } else {
        return `${villeString} ${LieuxUtils.formateArrondissement(
          arrondissement,
          true
        )}`;
      }
    } else {
      return LieuxUtils.formatAdresseEtrangere(
        paysString,
        regionString,
        villeString
      );
    }
  }

  public static formateArrondissement(
    arrondissement?: string,
    formatVerbeux = false
  ) {
    let arrondissementFormate = "";
    const arrondissementSansZero = supprimerZerosAGauche(arrondissement);
    if (formatVerbeux) {
      if (arrondissementSansZero === "1") {
        arrondissementFormate = "1er arrondissement";
      } else if (arrondissement) {
        arrondissementFormate = `${arrondissementSansZero}ème arrondissement`;
      }
    } else {
      arrondissementFormate = `arr.${arrondissement}`;
    }
    return arrondissementFormate;
  }

  private static formatAdresseEtrangere(
    pays: string,
    region: string,
    ville: string
  ) {
    const villeRegion = formatLigne([ville, region]);
    const paysFormate = pays && `(${pays})`;

    return getValeurOuVide(
      formatLigne([villeRegion, !villeRegion && pays && `--`, paysFormate], " ")
    );
  }

  public static affichagePaysCourrier(pays: string) {
    return this.estPaysFrance(pays) ? "" : pays;
  }

  public static getNumeros(debut: number, finComprise: number): string[] {
    return Array.from({ length: finComprise }, (_, i) => String(i + debut));
  }

  public static getNumerosArrondissement(ville?: string) {
    let numeros: string[] = [];

    if (LieuxUtils.estVilleParis(ville)) {
      numeros = LieuxUtils.getNumeros(1, VINGT);
    } else if (LieuxUtils.estVilleMarseille(ville)) {
      numeros = LieuxUtils.getNumeros(1, SEIZE);
    } else if (LieuxUtils.estVilleLyon(ville)) {
      numeros = LieuxUtils.getNumeros(1, NEUF);
    }

    return numeros;
  }

  public static getOptionsArrondissement(ville?: string): Options {
    const villeNumeros: string[] = LieuxUtils.getNumerosArrondissement(ville);
    return villeNumeros.map(
      numero => ({ cle: numero, libelle: numero } as Option)
    );
  }

  /**
   *  Utilisé pour lagénération d'un extrait plurilingue de la page édition du document réponse
   *  Si le pays n'est pas renseigné alors on considère que la localisation est France (sauf si la ville est Jérusalem)
   */
  public static getLocalisationEtrangerOuFranceParDefaut(
    ville?: string,
    regionOuDepartement?: string,
    pays?: string,
    arrondissement?: string
  ) {
    let paysParDefaut = pays;
    if (!pays && !this.estVilleJerusalem(ville)) {
      paysParDefaut = France;
    }
    return this.getLocalisationEtrangerOuFrance(
      ville,
      regionOuDepartement,
      paysParDefaut,
      arrondissement
    );
  }

  /**
   *  Utilisé pour le formulaire de saisi d'un extrait de la page édition du document réponse
   *  Si le pays n'est pas renseigné alors on considère que la localisation est étrangère
   */
  public static getLocalisationEtrangerOuFrance(
    ville?: string,
    regionOuDepartement?: string,
    pays?: string,
    arrondissement?: string
  ): string {
    if (LieuxUtils.estPaysFrance(pays)) {
      return LieuxUtils.getLocalisationFrance(
        ville,
        regionOuDepartement,
        arrondissement
      );
    } else {
      return LieuxUtils.getLocalisationEtrangere(
        ville,
        regionOuDepartement,
        pays
      );
    }
  }

  /**
   * Utilisé pour le formulaire de saisi d'un extrait de la page édition du document réponse
   *
   * Libellé par défaut: <Ville naissance>, <Région naissance> (<Pays naissance>)
   *
   *    - Si pas de ville : <Région> (<Pays>)
   *    - Si pas de région : <Ville> (<Pays>)
   *    - Si pas de pays, ne pas éditer les parenthèses : <Ville>, <Région>
   *    - Si pays seul : -- (<Pays>)
   *      Exemple : -- (Canada)
   */
  public static getLocalisationEtrangere(
    ville?: string,
    region?: string,
    pays?: string
  ): string {
    let libelleLocalisationEtrangere = "";
    const villeString = ville || "";
    const libelleRegion = getValeurOuVide(region);
    const libelleRegionAvecVirgule = region ? `, ${region}` : "";
    const libellePays = LieuxUtils.getLieuEntreParentheses(pays);

    if (ville) {
      libelleLocalisationEtrangere = `${villeString}${libelleRegionAvecVirgule}${libellePays}`;
    } else {
      if (region) {
        libelleLocalisationEtrangere = `${libelleRegion}${libellePays}`;
      } else if (pays) {
        libelleLocalisationEtrangere = `--${libellePays}`;
      }
    }

    return libelleLocalisationEtrangere;
  }

  /**
   * Utiliser pour le formulaire de saisi d'un extrait de la page édition du document réponse (cf. getLocalisationEtrangerOuFrance)
   *
   * Libellé par défaut: <Ville naissance> <Intitulé arrondissement naissance> (<Département naissance>)
   *    - Si ville = "Paris", ignorer le département,
   *    - Si pas d'arrondissement : <Ville> (<Département>)
   *    - Si pas de département : <Ville> <Intitulé arrondissement>
   *    - Si pas de département, ni d'arrondissement : <Ville>
   *    - Si département seul : -- (<Département>)
   *      Exemple : -- (Meuse)
   * */
  public static getLocalisationFrance(
    ville?: string,
    departement?: string,
    arrondissement?: string
  ): string {
    let libelleLocalisationFrance = "";
    const villeString = ville || "";
    const libelleDepartement = LieuxUtils.estVilleParis(ville)
      ? ""
      : LieuxUtils.getLieuEntreParentheses(departement);

    const libelleArrondissement =
      estRenseigne(arrondissement) &&
      LieuxUtils.estVilleAvecArrondissement(ville)
        ? LieuxUtils.formateArrondissement(arrondissement, true)
        : "";

    const libelleArrondissementAvecEspace =
      estRenseigne(arrondissement) &&
      LieuxUtils.estVilleAvecArrondissement(ville)
        ? ` ${libelleArrondissement}`
        : "";

    if (ville) {
      libelleLocalisationFrance = `${villeString}${libelleArrondissementAvecEspace}${libelleDepartement}`;
    } else {
      if (departement) {
        libelleLocalisationFrance = `--${libelleDepartement}`;
      }
    }

    return libelleLocalisationFrance;
  }

  public static estVilleJerusalem(ville?: string): boolean {
    return ville ? chainesEgalesIgnoreCasseEtAccent(ville, JERUSALEM) : false;
  }

  public static getEtrangerOuFrance(
    ville?: string,
    pays?: string,
    etrangerParDefaut = true
  ): EtrangerFrance {
    let etrangerOuFrance: EtrangerFrance;

    if (pays) {
      etrangerOuFrance = LieuxUtils.estPaysFrance(pays)
        ? EtrangerFrance.FRANCE
        : EtrangerFrance.ETRANGER;
    } else {
      if (LieuxUtils.estVilleJerusalem(ville) || etrangerParDefaut) {
        etrangerOuFrance = EtrangerFrance.ETRANGER;
      } else {
        etrangerOuFrance = EtrangerFrance.FRANCE;
      }
    }

    return etrangerOuFrance;
  }

  public static getEtrangerOuFranceEnMajuscule(
    ville?: string,
    pays?: string,
    etrangerParDefaut = true
  ): string {
    return EtrangerFrance.getKey(
      LieuxUtils.getEtrangerOuFrance(ville, pays, etrangerParDefaut)
    );
  }

  public static getEtrangerOuFranceOuInconnuEnMajuscule(
    evenement?: IEvenement,
    etrangerParDefaut = true
  ): string {
    return Evenement.aucuneDonneeDuLieuRenseignee(evenement)
      ? EtrangerFrance.getKey(EtrangerFrance.INCONNU)
      : LieuxUtils.getEtrangerOuFranceEnMajuscule(
          evenement?.ville,
          evenement?.pays,
          etrangerParDefaut
        );
  }

  public static estRenseigneEtPaysEtranger(pays?: string): boolean {
    return estRenseigne(pays) && !LieuxUtils.estPaysFrance(pays);
  }
}
