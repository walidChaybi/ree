import DateUtils from "@util/DateUtils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { IAutorite } from "../../etatcivil/commun/IAutorite";
import { ETypeAutorite } from "../../etatcivil/enum/TypeAutorite";
import { TypeJuridiction } from "../../etatcivil/enum/TypeJuridiction";
import { FichePacs } from "../../etatcivil/pacs/FichePacs";
import { IAnnulation } from "../../etatcivil/pacs/IAnnulation";
import { IDissolution } from "../../etatcivil/pacs/IDissolution";
import { IModification } from "../../etatcivil/pacs/IModification";
import { ICertificatPACSComposition } from "./ICertificatPACSComposition";

export const ParagrapheComposition = {
  ajoutParagrapheEnregistrementPACS(obj: ICertificatPACSComposition, fiche: FichePacs) {
    const dateEnregistrement = DateUtils.getDateFormatJasper(fiche.dateEnregistrementParAutorite);
    const dateInscription = DateUtils.getDateFormatJasper(fiche.dateInscription);

    obj.paragraphe_enregistrement = `Enregistrée ${ParagrapheComposition.getAutoriteEtLocalisation(
      fiche.autorite
    )}, le ${dateEnregistrement}.\nDate d'effet de la déclaration du PACS à l'égard des tiers : ${dateInscription}.\n`;
  },

  ajoutParagrapheModificationPACS(obj: ICertificatPACSComposition, modifications: IModification[]) {
    const dateConvention = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(modifications[0].date));
    const dateModif = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(modifications[0].dateEffet));
    obj.paragraphe_modification = `Modifiée ${ParagrapheComposition.getAutoriteEtLocalisation(
      modifications[0].autorite
    )}, le ${dateConvention}.\nDate d'effet de la modification du PACS à l'égard des tiers : ${dateModif}.\n`;
  },

  ajoutParagrapheDissolutionPACS(obj: ICertificatPACSComposition, dissolution: IDissolution) {
    const dateDissolution = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(dissolution.date));
    const dateEffet = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(dissolution.dateEffet));
    obj.paragraphe_dissolution = `Dissoute ${ParagrapheComposition.getAutoriteEtLocalisation(
      dissolution.autorite
    )}, le ${dateDissolution}.\nDate d'effet de la dissolution du PACS à l'égard des tiers : ${dateEffet}.\n`;
  },

  ajoutParagrapheAnnulationPACS(obj: ICertificatPACSComposition, annulation: IAnnulation) {
    const dateAnnulation = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(annulation.date));
    const dateEffet = DateUtils.getDateFormatJasper(DateUtils.getDateFromTimestamp(annulation.dateEffet));

    obj.paragraphe_annulation = `Annulée ${ParagrapheComposition.getAutoriteEtLocalisation(
      annulation.autorite,
      true
    )}, le ${dateAnnulation}.\nDate d'effet de l'annulation du PACS à l'égard des tiers : ${dateEffet}.\n`;
  },

  getAutorite(autorite: IAutorite): string {
    switch (autorite.typeAutorite) {
      case ETypeAutorite.COMMUNE:
        return "en la commune de";
      case ETypeAutorite.JURIDICTION:
        return `au ${autorite?.typeJuridiction?.toLocaleLowerCase()} de`;
      case ETypeAutorite.NOTAIRE:
        return `par Maître ${autorite.prenomNotaire} ${autorite.nomNotaire}, notaire à`;
      case ETypeAutorite.POSTE_ETRANGER:
        return `par ${autorite.typePoste} à`;
      default:
        return "";
    }
  },

  getLibelleJuridiction(typeJuridiction?: TypeJuridiction): string {
    if (typeJuridiction === TypeJuridiction.COURS_APPEL) {
      return "par arrêt de la cour d'appel de";
    } else {
      return "par jugement du tribunal judiciaire de";
    }
  },

  getAutoriteEtLocalisation(autorite: IAutorite, annulation = false) {
    let autoriteTexte = "";
    if (annulation) {
      autoriteTexte = ParagrapheComposition.getLibelleJuridiction(autorite?.typeJuridiction as TypeJuridiction);
    } else {
      autoriteTexte = ParagrapheComposition.getAutorite(autorite);
    }
    let localisation = LieuxUtils.getLocalisationAutorite(
      autorite.ville,
      autorite.libelleDepartement,
      autorite.region,
      autorite.pays,
      autorite.arrondissement
    );
    if (autorite.typeAutorite === ETypeAutorite.NOTAIRE) {
      localisation += `, office notarial n°${autorite.numeroCrpcen}`;
    }
    return `${autoriteTexte} ${localisation}`;
  }
};
