import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { getDateFormatJasper } from "@util/DateUtils";
import { getValeurOuVide } from "@util/Utils";
import { EtatCivilUtil } from "@utilMetier/EtatCivilUtil";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { Validation } from "../../../requete/enum/Validation";
import {
  CommunExtraitOuCopieActeTexteComposition,
  ICreerExtraitCopieActeTexteAvantCompositionParams,
  ITitulaireCompositionEC
} from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteNaissanceComposition {
  public static creerExtraitCopieActeTexteNaissance(
    params: ICreerExtraitCopieActeTexteAvantCompositionParams
  ) {
    const natureActe = NatureActe.NAISSANCE.libelle.toUpperCase();
    const corpsTexte =
      Validation.E !== params.validation
        ? ExtraitCopieActeTexteNaissanceComposition.getCorpsTexte(
            params.acte,
            ChoixDelivrance.estAvecFiliation(params.choixDelivrance)
          )
        : undefined;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte: params.acte,
      natureActe,
      choixDelivrance: params.choixDelivrance,
      sousTypeRequete: params.requete.sousType,
      validation: params.validation,
      mentionsRetirees: params.mentionsRetirees,
      ctv: params.ctv,
      corpsTexte
    });
  }

  private static getCorpsTexte(
    acteNaissance: IFicheActe,
    avecFiliation: boolean
  ) {
    const ecTitulaire1 =
      CommunExtraitOuCopieActeTexteComposition.getTitulaireCorpsText(
        acteNaissance
      );

    let parents = "";

    if (avecFiliation) {
      parents =
        ExtraitCopieActeTexteNaissanceComposition.getPhrasesParents(
          ecTitulaire1
        );
    }

    // Création de l'événement pour le corps
    const evtActe =
      CommunExtraitOuCopieActeTexteComposition.getEvenementActeCompositionEC(
        acteNaissance
      );

    const duOuDeSexe = EtatCivilUtil.formatGenreDetermineOuNon(
      ecTitulaire1.sexe
    );

    const neOuNeeTitulaire1 = EtatCivilUtil.formatNeOuNee(ecTitulaire1.sexe); //né(e) [accord selon genre du titulaire]

    const declarationConjointe =
      ExtraitCopieActeTexteNaissanceComposition.getDeclarationConjointe(
        acteNaissance
      );

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement} ${
      evtActe.heureEvenement
    }
est ${neOuNeeTitulaire1} à ${
      evtActe.lieuEvenement
    }${this.getLigneAvecRetourChariot(
      true,
      ecTitulaire1.prenoms
    )}${this.getLigneAvecRetourChariot(
      true,
      ecTitulaire1.nom,
      declarationConjointe
    )}${this.getLigneAvecRetourChariot(
      false,
      ecTitulaire1.partiesNom
    )}${this.getSexe(
      duOuDeSexe,
      ecTitulaire1.sexe.libelle.toLowerCase()
    )}${parents}`;
  }

  //Gestion du retour chariot
  private static getLigneAvecRetourChariot(
    tabulation: boolean,
    element1: string,
    element2?: string
  ) {
    let texte = "";
    const tab = tabulation ? "  " : "";
    if (element1 || element2) {
      texte = `
${tab}${element1}`;
    }
    if (element2) {
      texte += ` ${getValeurOuVide(element2)}`;
    }
    return texte;
  }

  //Gestion du retour chariot pour la ligne à propos du sexe
  private static getSexe(
    duOuDeSexe: string | undefined,
    sexeTitulaire: string | undefined
  ) {
    let sexe = "";
    if (sexeTitulaire) {
      sexe = `
${duOuDeSexe} sexe ${sexeTitulaire}`;
    }
    return sexe;
  }

  private static getPhrasesParents(ecTitulaire1: ITitulaireCompositionEC) {
    //Construction phrase parents
    const parents = ecTitulaire1.parentsTitulaire;

    let resultatPhraseParents = "";

    const parent1 = parents[0]
      ? `
${parents[0].filsOuFille} ${parents[0].prenoms} ${parents[0].nom} ${parents[0].dateNaissanceOuAgeParent}${parents[0].lieuNaissanceParent}`
      : "";

    const parent2 = parents[1]
      ? `${parents[1].prenoms} ${parents[1].nom} ${parents[1].dateNaissanceOuAgeParent}${parents[1].lieuNaissanceParent}`
      : "";

    resultatPhraseParents = parent1;

    if (parent2) {
      resultatPhraseParents += `
et de ${parent2}`;
    }

    return resultatPhraseParents;
  }

  private static getDeclarationConjointe(acte: IFicheActe) {
    let declarationConjointe = "";
    if (acte.analyseMarginales) {
      const { titulaireAMCompositionEC1 } =
        CommunExtraitOuCopieActeTexteComposition.getTitulairesAnalayseMarginaleCompositionEC(
          acte
        );
      if (
        titulaireAMCompositionEC1?.typeDeclarationConjointe &&
        !TypeDeclarationConjointe.estAbsenceDeclaration(
          titulaireAMCompositionEC1.typeDeclarationConjointe
        )
      ) {
        declarationConjointe = `suivant déclaration conjointe ${titulaireAMCompositionEC1?.typeDeclarationConjointe.libelle}`;

        if (titulaireAMCompositionEC1.dateDeclarationConjointe) {
          const dateFormatJJMoisAAAA = getDateFormatJasper(
            titulaireAMCompositionEC1.dateDeclarationConjointe
          );
          declarationConjointe = `${declarationConjointe} en date du ${dateFormatJJMoisAAAA}`;
        }
      }
    }
    return declarationConjointe;
  }
}
