import { TypeDeclarationConjointe } from "../../../../model/etatcivil/enum/TypeDeclarationConjointe";
import { getDateFormatJasper } from "../../../../views/common/util/DateUtils";
import { getLibelle } from "../../../../views/common/util/Utils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import {
  CommunExtraitOuCopieActeTexteComposition,
  ITitulaireCompositionEC
} from "./CommunExtraitOuCopieActeTexteComposition";

export class ExtraitCopieActeTexteNaissanceComposition {
  public static creerExtraitCopieActeTexteNaissance(
    acte: IFicheActe,
    choixDelivrance: ChoixDelivrance,
    sousTypeRequete: SousTypeDelivrance,
    validation: Validation,
    avecFiliation = false,
    copie = false,
    archive = false
  ) {
    const natureActe = NatureActe.getKey(NatureActe.NAISSANCE);
    const getCorpsTexte =
      Validation.E !== validation
        ? ExtraitCopieActeTexteNaissanceComposition.getCorpsTexte(
            acte,
            avecFiliation
          )
        : undefined;
    const erreur =
      Validation.E === validation
        ? getLibelle(
            "L'absence d'informations ne permet pas de générer l'extrait."
          )
        : undefined;

    return CommunExtraitOuCopieActeTexteComposition.creerExtraitCopieActeTexte({
      acte,
      natureActe,
      choixDelivrance,
      sousTypeRequete,
      validation,
      avecFiliation,
      copie,
      archive,
      getCorpsTexte,
      erreur
    });
  }

  private static getCorpsTexte(
    acteNaissance: IFicheActe,
    avecFiliation: boolean
  ) {
    const { ecTitulaire1 } =
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

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement} ${evtActe.heureEvenement}
est ${neOuNeeTitulaire1} à ${evtActe.lieuEvenement}
  ${ecTitulaire1.prenoms}
  ${ecTitulaire1.nom} ${declarationConjointe}
${ecTitulaire1.partiesNom}
${duOuDeSexe} sexe ${ecTitulaire1.sexe.libelle}${parents}`;
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
          acte.analyseMarginales
        );
      if (
        titulaireAMCompositionEC1?.typeDeclarationConjointe &&
        titulaireAMCompositionEC1.typeDeclarationConjointe !==
          TypeDeclarationConjointe.ABSENCE_DECLARATION
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
