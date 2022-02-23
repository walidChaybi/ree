import { TypeDeclarationConjointe } from "../../../../model/etatcivil/enum/TypeDeclarationConjointe";
import { getDateFormatJasper } from "../../../../views/common/util/DateUtils";
import { getLibelle } from "../../../../views/common/util/Utils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
import { IFicheActe } from "../../../etatcivil/acte/IFicheActe";
import { NatureActe } from "../../../etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "../../../requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../requete/enum/SousTypeDelivrance";
import { Validation } from "../../../requete/enum/Validation";
import { CommunExtraitOuCopieActeTexteComposition } from "./CommunExtraitOuCopieActeTexteComposition";

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
    const {
      ecTitulaire1
    } = CommunExtraitOuCopieActeTexteComposition.getTitulaireCorpsText(
      acteNaissance
    );

    if (avecFiliation) {
      //TODO
    }

    // Création de l'événement pour le corps
    const evtActe = CommunExtraitOuCopieActeTexteComposition.getEvenementActeCompositionEC(
      acteNaissance
    );

    const duOuDeSexe = EtatCivilUtil.formatGenreDetermineOuNon(
      ecTitulaire1.sexe
    );

    const neOuNeeTitulaire1 = EtatCivilUtil.formatNeOuNee(ecTitulaire1.sexe); //né(e) [accord selon genre du titulaire]

    const declarationConjointe = ExtraitCopieActeTexteNaissanceComposition.getDeclarationConjointe(
      acteNaissance
    );

    return `${evtActe.leouEnEvenement} ${evtActe.dateEvenement} ${evtActe.heureEvenement}
est ${neOuNeeTitulaire1} à ${evtActe.lieuEvenement}
  ${ecTitulaire1.prenoms}
  ${ecTitulaire1.nom} ${declarationConjointe}
${ecTitulaire1.partiesNom}
${duOuDeSexe} sexe ${ecTitulaire1.sexe.libelle}`;
  }

  private static getDeclarationConjointe(acte: IFicheActe) {
    let declarationConjointe = "";
    if (acte.analyseMarginales) {
      const {
        titulaireAMCompositionEC1
      } = CommunExtraitOuCopieActeTexteComposition.getTitulairesAnalayseMarginaleCompositionEC(
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
